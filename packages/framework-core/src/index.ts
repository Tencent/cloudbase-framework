import { promisify } from "util";
import figlet from "figlet";
import chalk from "chalk";
import { genClickableLink } from "./utils/link";

const gradient = require("gradient-string");
chalk.level = 1;

import PluginManager from "./plugin-manager";
import { CloudApi } from "./api";
import resolveConfig from "./config/resolve-config";
import Context from "./context";
import { CloudbaseFrameworkConfig } from "./types";
import getLogger from "./logger";
import { SamManager } from "./sam";

export { default as Plugin } from "./plugin";
export { default as PluginServiceApi } from "./plugin-service-api";
export { Builder } from "./builder";
export { Deployer } from "./deployer";
export { CloudApi } from "./api";
export * from "./types";

const packageInfo = require("../package");
const SUPPORT_COMMANDS = ["deploy", "compile", "run"];

interface CommandParams {
  runCommand?: string;
}

export async function run(
  {
    projectPath,
    cloudbaseConfig,
    logLevel = "info",
    config,
    resourceProviders,
    bumpVerison,
    versionRemark,
  }: CloudbaseFrameworkConfig,
  command: "deploy" = "deploy",
  module?: string,
  params?: CommandParams
) {
  const logger = getLogger(logLevel);

  try {
    const data = await promisify(figlet.text as any)(
      `CloudBase
Framework`,
      {
        font: "Slant",
        horizontalLayout: "fitted",
        verticalLayoutL: "fitted",
      }
    );
    console.log(
      chalk.bold(
        gradient(["cyan", "rgb(0, 111, 150)", "rgb(0, 246,136)"]).multiline(
          data + "\n"
        )
      )
    );
  } catch (e) {}

  logger.info(`Version ${chalk.green(`v${packageInfo.version}`)}`);
  logger.info(
    `Github: ${genClickableLink(
      "https://github.com/TencentCloudBase/cloudbase-framework"
    )}
`
  );

  if (
    !projectPath ||
    !cloudbaseConfig ||
    !cloudbaseConfig.secretId ||
    !cloudbaseConfig.secretKey
  ) {
    throw new Error("CloudBase Framework: config info missing");
  }

  const appConfig = await resolveConfig(projectPath, config);

  if (!appConfig) {
    logger.info("⚠️ 未识别到框架配置");
    return;
  }

  CloudApi.init({
    secretId: cloudbaseConfig.secretId,
    secretKey: cloudbaseConfig.secretKey,
    token: cloudbaseConfig.token || "",
    envId: cloudbaseConfig.envId,
  });

  const samManager = new SamManager({
    projectPath,
  });
  const context = new Context({
    appConfig,
    projectConfig: config,
    cloudbaseConfig,
    projectPath,
    logLevel,
    resourceProviders,
    samManager,
    bumpVerison: !!bumpVerison,
    versionRemark: versionRemark || "",
  });

  const pluginManager = new PluginManager(context);

  const appName = `fx-${appConfig.name || "app"}`;
  const samMeta = {
    Name: appName,
    Version: appConfig.version || "1.0.0",
    DisplayName: appName,
    Description: appConfig.description || "基于 CloudBase Framework 构建",
  };

  if (!SUPPORT_COMMANDS.includes(command)) {
    throw new Error(`CloudBase Framework: not support command '${command}'`);
  }

  if (command === "deploy") {
    await pluginManager.init(module);
    await pluginManager.build(module);
    const compileResult = await pluginManager.compile(module);
    samManager.generate(samMeta, JSON.parse(JSON.stringify(compileResult)));
    await samManager.install();
    await pluginManager.deploy(module);
  } else if (command === "compile") {
    await pluginManager.init(module);
    await pluginManager.build(module);

    const compileResult = await pluginManager.compile(module);
    samManager.generate(samMeta, JSON.parse(JSON.stringify(compileResult)));
  } else if (command === "run") {
    await pluginManager.run(module, params?.runCommand);
  }

  logger.info("✨ done");
}

async function getAppId(cloudApi: typeof CloudApi) {
  const res = await cloudApi.tcbService.request("DescribeEnvs");

  if (!res.EnvList[0]) {
    throw new Error("请提供正确的环境id");
  }

  return res.EnvList[0].Storages[0].AppId;
}
