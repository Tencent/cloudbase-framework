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
import { plugin as NodeFunctionPlugin } from './node-function-impl';
import { plugin as NodeContainerPlugin } from './node-container-impl';
import { exec } from 'child_process';
import { promisify } from 'util';

import { IFrameworkPluginNodeInputs } from './types';
export { IFrameworkPluginNodeInputs } from './types';

const DEFAULT_INPUTS = {
  runtime: 'Nodejs10.15',
  entry: 'app.js',
  path: '/nodeapp',
  name: 'node',
  projectPath: '.',
  platform: 'function',
  wrapExpress: false,
};

type ResolvedInputs = typeof DEFAULT_INPUTS & IFrameworkPluginNodeInputs;

class NodePlugin extends Plugin {
  protected resolvedInputs: ResolvedInputs;
  protected buildOutput: any;
  protected pluginImpl: Plugin;

  constructor(
    public name: string,
    public api: PluginServiceApi,
    public inputs: IFrameworkPluginNodeInputs
  ) {
    super(name, api, inputs);

    this.resolvedInputs = resolveInputs(this.inputs, DEFAULT_INPUTS);

    if (this.resolvedInputs.platform === 'container') {
      this.pluginImpl = new NodeContainerPlugin(
        'NodeContainer',
        this.api,
        this.resolvedInputs
      );
    } else {
      this.pluginImpl = new NodeFunctionPlugin(
        'NodeFunction',
        this.api,
        this.resolvedInputs
      );
    }
  }

  /**
   * 初始化
   */
  async init(params: any) {
    this.api.logger.debug('NodePlugin: init', this.resolvedInputs);
    return this.pluginImpl.init(params);
  }

  /**
   * 编译成 SAM
   * @param params
   */
  async compile(params: any) {
    this.api.logger.debug('NodePlugin: compile', this.resolvedInputs);

    if (!this.pluginImpl.compile) {
      return null;
    }

    return this.pluginImpl.compile(params);
  }

  /**
   * 执行本地命令
   */
  async run() {}

  /**
   * 删除资源
   */
  async remove(params: any) {
    if (!this.pluginImpl.remove) {
      return null;
    }
    return this.pluginImpl.remove(params);
  }

  /**
   * 生成代码
   */
  async genCode(params: any) {
    if (!this.pluginImpl.genCode) {
      return null;
    }
    return this.pluginImpl.genCode(params);
  }

  /**
   * 构建
   */
  async build(params: any) {
    this.api.logger.debug('NodePlugin: build', this.resolvedInputs);

    const { buildCommand } = this.resolvedInputs;

    if (buildCommand) {
      await promisify(exec)(buildCommand);
    }

    return this.pluginImpl.build(params);
  }

  /**
   * 部署
   */
  async deploy(params: any) {
    this.api.logger.debug(
      'NodePlugin: deploy',
      this.resolvedInputs,
      this.buildOutput
    );

    await this.pluginImpl.deploy(params);

    this.api.logger.info(`${this.api.emoji('🚀')} Node 应用部署成功`);
  }
}

function resolveInputs(inputs: any, defaultInputs: any) {
  return Object.assign({}, defaultInputs, inputs);
}

export const plugin = NodePlugin;
