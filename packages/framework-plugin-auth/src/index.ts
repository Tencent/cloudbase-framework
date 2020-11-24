/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import { Plugin, PluginServiceApi } from '@cloudbase/framework-core';

/**
 * 导出接口用于生成 JSON Schema 来进行智能提示
 */
export interface IFrameworkPluginAuthInputs {
  configs: IAuthConfig[];
}

export interface IAuthConfig {
  /**
   * 登录平台
   */
  platform: 'NONLOGIN' | 'ANONYMOUS';
  /**
   * 开通状态
   */
  status: 'ENABLE' | 'DISABLE';
  /**
   * 登录平台的 AppID，选填
   */
  platformId: string;
  /**
   * 登录平台的 AppSecret，选填
   */
  platformSecret: string;
}

class AuthPlugin extends Plugin {
  protected resolvedInputs: IFrameworkPluginAuthInputs;
  protected buildOutput: any;

  constructor(
    public name: string,
    public api: PluginServiceApi,
    public inputs: IFrameworkPluginAuthInputs
  ) {
    super(name, api, inputs);

    const DEFAULT_INPUTS = {};
    this.resolvedInputs = resolveInputs(this.inputs, DEFAULT_INPUTS);
  }

  /**
   * 初始化
   */
  async init() {
    this.api.logger.debug('AuthPlugin: init', this.resolvedInputs);
  }

  /**
   * 执行本地命令
   */
  async run() {}

  /**
   * 删除资源
   */
  async remove() {}

  /**
   * 生成代码
   */
  async genCode() {}

  /**
   * 构建
   */
  async build() {}

  /**
   * 生成SAM文件
   */
  async compile() {
    this.api.logger.debug(
      'AuthPlugin: compile',
      this.resolvedInputs,
      this.buildOutput
    );

    return {
      Config: {
        Login: this.resolvedInputs.configs.map((config: IAuthConfig) => {
          const { platform, status, platformId, platformSecret } = config;
          return {
            Platform: platform,
            PlatformId: platformId,
            PlatformSecret: platformSecret,
            Status: status,
          };
        }),
      },
    };
  }

  /**
   * 部署
   */
  async deploy() {}
}

function resolveInputs(inputs: any, defaultInputs: any) {
  return Object.assign({}, defaultInputs, inputs);
}

export const plugin = AuthPlugin;
