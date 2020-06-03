import { promisify } from "util";
import figlet from "figlet";
import chalk from "chalk";

chalk.level = 1;

import PluginManager from "./plugin-manager";
import resolveConfig from "./config/resolve-config";
import Context from "./context";
import { CloudbaseFrameworkConfig } from "./types";
import getLogger from "./logger";
import { genSAM } from "./sam";
export { default as Plugin } from "./plugin";
export { default as PluginServiceApi } from "./plugin-sevice-api";
export { Builder } from "./builder";
export { Deployer } from "./deployer";
export * from "./types";

const packageInfo = require("../package");
const SUPPORT_COMMANDS = ["deploy", "compile"];

export async function run(
  {
    projectPath,
    cloudbaseConfig,
    logLevel = "info",
    config,
    resourceProviders,
  }: CloudbaseFrameworkConfig,
  command: "deploy" = "deploy",
  module?: string
) {
  const logger = getLogger(logLevel);

  try {
    const data = await promisify(figlet.text as any)("CloudBase Framework", {
      font: "Slant",
    });
    console.log(chalk.bgBlack(chalk.cyan(data + "\n")));
  } catch (e) {}

  logger.info(`Version ${chalk.green(`v${packageInfo.version}`)}`);
  logger.info(
    `Github: ${chalk.green(
      "https://github.com/TencentCloudBase/cloudbase-framework"
    )}
`
  );

  if (!projectPath || !cloudbaseConfig) {
    throw new Error("CloudBase Framework: config info missing");
  }

  const appConfig = await resolveConfig(projectPath, config);

  if (!appConfig) {
    logger.info("⚠️ 未识别到框架配置");
    return;
  }

  const context = new Context({
    appConfig,
    projectConfig: config,
    cloudbaseConfig,
    projectPath,
    logLevel,
    resourceProviders,
  });

  const pluginManager = new PluginManager(context);

  if (!SUPPORT_COMMANDS.includes(command)) {
    throw new Error(`CloudBase Framwork: not support command '${command}'`);
  }

  if (command === "deploy") {
    await pluginManager.init(module);
    await pluginManager.build(module);
    await pluginManager.deploy(module);
  } else if (command === "compile") {
    await pluginManager.init(module);
    await pluginManager.build(module);
    const compileResult = await pluginManager.compile(module);
    genSAM(projectPath, ...JSON.parse(JSON.stringify(compileResult)));
  }

  logger.info("✨ done");
}
