import PluginManager from "../plugin-manager";
import CloudbaseManager from "@cloudbase/manager-node";
import { Logger } from "../Logger";
import { ResourceProviders } from "../types";
import { genClickableLink } from "../utils/link";
import { Generator } from "../generator";

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
   * 获取项目根路径
   */
  get projectPath(): string {
    return this.pluginManager.context.projectPath;
  }

  /**
   * 项目环境id
   */
  get envId(): string {
    return this.pluginManager.context.envId;
  }

  /**
   * secretId
   */
  get secretId(): string {
    return this.pluginManager.context.cloudbaseConfig.secretId || "";
  }

  /**
   * secretKey
   */
  get secretKey(): string {
    return this.pluginManager.context.cloudbaseConfig.secretKey || "";
  }

  /**
   * token
   */
  get token(): string {
    return this.pluginManager.context.cloudbaseConfig.token || "";
  }

  /**
   * 获取 logger 实例
   */
  get logger(): Logger {
    return this.pluginManager.context.logger;
  }

  /**
   * 获取资源操作 API
   */
  get resourceProviders(): ResourceProviders | undefined {
    return this.pluginManager.context.resourceProviders;
  }

  /**
   * 获取云开发 CLI 配置文件
   */
  get projectConfig() {
    return this.pluginManager.context.projectConfig;
  }

  /**
   * 获取generator实例
   */
  get generator() {
    return new Generator();
  }

  /**
   * 生成命令行链接
   */
  get genClickableLink() {
    return genClickableLink;
  }
}
