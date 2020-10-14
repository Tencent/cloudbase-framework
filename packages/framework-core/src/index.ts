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
import { CloudBaseFrameworkConfig } from "./types";
import getLogger from "./logger";
import { SamManager } from "./sam";
import Hooks from "./hooks";

export { default as Plugin } from "./plugin";
export { default as PluginServiceApi } from "./plugin-service-api";
export { Builder } from "./builder";
export { Deployer } from "./deployer";
export { CloudApi } from "./api";
export * from "./types";

const packageInfo = require("../package");
const SUPPORT_COMMANDS = ["deploy", "compile", "run"];

interface CommandParams {
  runCommandKey?: string;
}

/**
 *
 * 提供 CLI 调用
 *
 * @param cloudbaseFrameworkConfig
 * @param command
 * @param module
 * @param params
 */
export async function run(
  cloudbaseFrameworkConfig: CloudBaseFrameworkConfig,
  command: "deploy" = "deploy",
  module?: string,
  params?: CommandParams
) {
  const frameworkCore = new CloudBaseFrameworkCore(cloudbaseFrameworkConfig);

  if (!SUPPORT_COMMANDS.includes(command)) {
    throw new Error(`CloudBase Framework: not support command '${command}'`);
  }
  await frameworkCore.init();
  await frameworkCore[command](module, params);

  const logger = getLogger();
  logger.info("✨ done");
}

/**
 * CloudBase Framework 核心实现类
 */
export class CloudBaseFrameworkCore {
  pluginManager!: PluginManager;
  samManager!: SamManager;
  samMeta!: Record<string, any>;
  hooks!: Hooks;

  constructor(public frameworkConfig: CloudBaseFrameworkConfig) {}

  async init() {
    const {
      projectPath,
      cloudbaseConfig,
      logLevel = "info",
      config,
      resourceProviders,
      bumpVersion,
      versionRemark,
    } = this.frameworkConfig;

    const logger = getLogger(logLevel);

    await showBanner();
    logger.info(`Version ${chalk.green(`v${packageInfo.version}`)}`);
    logger.info(
      `Github: ${genClickableLink(
        "https://github.com/TencentCloudBase/cloudbase-framework"
      )}
`
    );

    logger.info(`EnvId ${chalk.green(cloudbaseConfig.envId)}`);

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

    this.samManager = new SamManager({
      projectPath,
    });
    const context = new Context({
      appConfig,
      projectConfig: config,
      cloudbaseConfig,
      projectPath,
      logLevel,
      resourceProviders,
      samManager: this.samManager,
      bumpVersion: !!bumpVersion,
      versionRemark: versionRemark || "",
    });

    this.pluginManager = new PluginManager(context);

    const appName = `fx-${appConfig.name || "app"}`;
    this.samMeta = {
      Name: appName,
      Version: appConfig.version || "1.0.0",
      DisplayName: appName,
      Description: appConfig.description || "基于 CloudBase Framework 构建",
    };

    this.hooks = new Hooks(appConfig.hooks || {}, projectPath, this.samMeta);
  }

  /**
   * 调用命令
   *
   * @param module
   * @param params
   */
  async run(module?: string, params?: CommandParams) {
    await this.pluginManager.run(module, params?.runCommandKey);
  }

  /**
   * 编译应用
   *
   * @param module
   * @param params
   */
  async compile(module?: string, params?: CommandParams) {
    await this.hooks.callHook("preDeploy");
    await this._compile(module);
  }

  /**
   * 编译并部署应用
   * @param module
   * @param params
   */
  async deploy(module?: string, params?: CommandParams) {
    await this.hooks.callHook("preDeploy");
    await this._compile(module);
    await this.samManager.install();
    await this.pluginManager.deploy(module);
    await this.hooks.callHook("postDeploy");
  }

  /**
   * 编译 SAM
   * @param module
   */
  private async _compile(module?: string) {
    await this.pluginManager.init(module);
    await this.pluginManager.build(module);

    const compileResult = await this.pluginManager.compile(module);

    await this.hooks.callHook("postCompile");
    const hooksSAM = this.hooks.genSAM();

    const samSections = [...compileResult, hooksSAM];

    this.samManager.generate(
      this.samMeta,
      JSON.parse(JSON.stringify(samSections))
    );
  }
}

/**
 * 展示 CloudBase Framework 横幅
 */
async function showBanner() {
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
}
