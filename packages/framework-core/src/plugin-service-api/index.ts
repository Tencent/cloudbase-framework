/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import PluginManager from '../plugin-manager';
import { checkAndGetCredential as getCredential } from '@cloudbase/toolbox';
import CloudbaseManager from '@cloudbase/manager-node';
import { Logger } from '../logger';
import { ResourceProviders } from '../types';
import { genClickableLink } from '../utils/link';
import { Generator } from '../generator';
import { CloudApi } from '../api';
import { emoji } from '../utils/emoji';
import { SamManager } from '../sam';
import { spawnPromise } from '../utils/spawn';

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
   * 项目地域信息
   */
  get region(): string | undefined {
    return this.pluginManager.context.cloudbaseConfig.region;
  }

  /**
   * 是否产生新版本
   */
  get bumpVersion(): boolean {
    return this.pluginManager.context.bumpVersion;
  }

  /**
   * 新版本的备注信息
   */
  get versionRemark(): string {
    return this.pluginManager.context.versionRemark;
  }

  /**
   * 获取当前账号 API 密钥信息
   */
  get getCredential(): typeof getCredential {
    return getCredential;
  }

  /**
   * secretId
   * @deprecated
   */
  get secretId(): string {
    return this.pluginManager.context.cloudbaseConfig.secretId || '';
  }

  /**
   * secretKey
   * @deprecated
   */
  get secretKey(): string {
    return this.pluginManager.context.cloudbaseConfig.secretKey || '';
  }

  /**
   * token
   * @deprecated
   */
  get token(): string {
    return this.pluginManager.context.cloudbaseConfig.token || '';
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
   * 云API
   */
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
   * 获取 cloudbase 配置
   */
  get appConfig() {
    return this.pluginManager.context.appConfig;
  }

  /**
   * 获取 samManager API
   */
  get samManager(): SamManager {
    return this.pluginManager.context.samManager;
  }

  /**
   * 获取构建的CIId
   */
  get ciId(): string {
    return this.pluginManager.context.ciId;
  }

  /**
   * 调用子进程
   */
  get spawnPromise() {
    return spawnPromise;
  }
}
