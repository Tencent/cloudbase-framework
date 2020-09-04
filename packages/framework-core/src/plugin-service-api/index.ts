import PluginManager from "../plugin-manager";
import CloudbaseManager from "@cloudbase/manager-node";
import { Logger } from "../logger";
import { ResourceProviders } from "../types";
import { genClickableLink } from "../utils/link";
import { Generator } from "../generator";
import { CloudApi } from "../api";
import { emoji } from "../utils/emoji";
import { SamManager } from "../sam";

/**
 * 插件服务注入为插件提供的 API
 */
export default class PluginServiceApi {
  constructor(public pluginManager: PluginManager) {}

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
   * 是否产生新版本
   */
  get bumpVerison(): boolean {
    return this.pluginManager.context.bumpVerison;
  }

  /**
   * 是否产生新版本
   */
  get versionRemark(): string {
    return this.pluginManager.context.versionRemark;
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

  /** 云API */
  get cloudApi() {
    return CloudApi;
  }

  /**
   * 生成命令行链接
   */
  get genClickableLink() {
    return genClickableLink;
  }

  /**
   * 安全地使用emoji
   */
  get emoji() {
    return emoji;
  }

  /**
   * 获取 samManager API
   */
  /**
   * 获取资源操作 API
   */
  get samManager(): SamManager {
    return this.pluginManager.context.samManager;
  }
}
