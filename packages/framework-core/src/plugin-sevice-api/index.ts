import PluginManager from "../plugin-manager";
import CloudbaseManager from "@cloudbase/manager-node";
import { Logger } from "../Logger";

/**
 * 插件服务注入为插件提供的 API
 */
export default class PluginServiceApi {
  private pluginManager: PluginManager;

  constructor(pluginManager: PluginManager) {
    this.pluginManager = pluginManager;
  }

  /**
   * 获取 manager 实例
   */
  get cloudbaseManager(): CloudbaseManager {
    return this.pluginManager.context.cloudbaseManager;
  }

  /**
   * 获取项目跟路径
   */
  get projectPath(): string {
    return this.pluginManager.context.projectPath;
  }

  /**
   * 获取 logger 实例
   */
  get logger(): Logger {
    return this.pluginManager.context.logger;
  }
}
