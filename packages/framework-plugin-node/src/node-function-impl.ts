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
import path from 'path';

import { Plugin, PluginServiceApi } from '@cloudbase/framework-core';
import { plugin as FunctionPlugin } from '@cloudbase/framework-plugin-function';
import { NodeBuilder } from '@cloudbase/node-builder';

import { IFrameworkPluginNodeInputs } from './types';

class NodeFunctionPlugin extends Plugin {
  protected resolvedInputs: Record<string, any>;
  protected buildOutput: any;
  protected nodeBuilder: NodeBuilder;
  protected functionPlugin: any;

  constructor(
    public name: string,
    public api: PluginServiceApi,
    public inputs: IFrameworkPluginNodeInputs
  ) {
    super(name, api, inputs);

    const DEFAULT_INPUTS = {
      runtime: 'Nodejs10.15',
      entry: 'app.js',
      path: '/nodeapp',
      name: 'node',
    };

    this.resolvedInputs = resolveInputs(this.inputs, DEFAULT_INPUTS);

    this.nodeBuilder = new NodeBuilder({
      projectPath: path.join(
        this.api.projectPath,
        this.resolvedInputs.projectPath || ''
      ),
    });
  }

  /**
   * 初始化
   */
  async init() {}

  async compile() {
    return this.functionPlugin.compile();
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
  async build() {
    this.buildOutput = await this.nodeBuilder.build(this.resolvedInputs.entry, {
      path: this.resolvedInputs.path,
      name: this.resolvedInputs.name,
      wrapExpress: this.resolvedInputs.wrapExpress,
    });

    const srcFunction = this.buildOutput.functions[0];

    this.functionPlugin = new FunctionPlugin('function', this.api, {
      functionRootPath: srcFunction.source,
      functions: [
        {
          name: srcFunction.name,
          handler: srcFunction.entry,
          runtime: this.resolvedInputs.runtime,
          installDependency: true,
          ...(this.resolvedInputs.functionOptions || {}),
        },
      ],
      servicePaths: {
        [this.resolvedInputs.name]: this.resolvedInputs.path,
      },
    });
  }

  /**
   * 部署
   */
  async deploy() {
    await this.functionPlugin.deploy();
    await this.nodeBuilder.clean();
  }
}

function resolveInputs(inputs: any, defaultInputs: any) {
  return Object.assign({}, defaultInputs, inputs);
}

export const plugin = NodeFunctionPlugin;
