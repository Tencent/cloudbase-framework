/**
 *
 * Copyright 2020 Tencent
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { Plugin, PluginServiceApi } from '@cloudbase/framework-core';

/**
 * 导出接口用于生成 JSON Schema 来进行智能提示
 */
export interface IFrameworkPluginAuthInputs {
  configs: IAuthConfig[]
}

export interface IAuthConfig {
  /**
   * 登录平台
   */
  platform: 'NONLOGIN' | 'ANONYMOUS'
  /**
   * 开通状态
   */
  status: 'ENABLE' | 'DISABLE'
  /**
   * 登录平台的 AppID，选填
   */
  platformId: string
  /**
   * 登录平台的 AppSecret，选填
   */
  platformSecret: string
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

    const DEFAULT_INPUTS = {
      
    };
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
    this.api.logger.debug('AuthPlugin: compile', this.resolvedInputs, this.buildOutput);

    return {
      Config: {
        Login: this.resolvedInputs.configs.map((config: IAuthConfig) => {
          const { platform, status, platformId, platformSecret } = config;
          return {
            Platform: platform,
            PlatformId: platformId,
            PlatformSecret: platformSecret,
            Status: status
          };
        })
      }
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
