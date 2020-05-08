import PluginManager from "./plugin-manager";
import resolveConfig from "./config/resolve-config";
import Context from "./context";
import { CloudbaseFrameworkConfig } from "./types";
import getLogger from "./logger";

export { default as Plugin } from "./plugin";
export { Builder } from "./builder";
export * from "./types";

const packageInfo = require("../package");
const SUPPORT_COMMANDS = ["build", "deploy"];

export async function run(
  {
    projectPath,
    cloudbaseConfig,
    logLevel = "info",
    config,
  }: CloudbaseFrameworkConfig,
  command?: "build" | "deploy",
  module?: string
) {
  const logger = getLogger(logLevel);
  logger.info(`version v${packageInfo.version}`);
  if (!projectPath || !cloudbaseConfig) {
    throw new Error("CloudBase Framework: config info missing");
  }

  const appConfig = resolveConfig(config);
  const context = new Context({
    appConfig,
    cloudbaseConfig,
    projectPath,
    logLevel,
  });

  const pluginManager = new PluginManager(context);

  // run command
  if (command) {
    if (!SUPPORT_COMMANDS.includes(command)) {
      throw new Error(`CloudBase Framwork: not support command '${command}'`);
    }
    return await pluginManager[command](module);
  } else {
    // run all commands
    await pluginManager.build(module);
    return await pluginManager.deploy(module);
  }
}
