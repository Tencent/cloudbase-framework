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
import fs from 'fs';
import path from 'path';

import { Plugin, PluginServiceApi } from '@cloudbase/framework-core';
import { plugin as ContainerPlugin } from '@cloudbase/framework-plugin-container';
import { IFrameworkPluginNodeInputs } from './types';
import { NodeContainerBuilder } from './node-container-builder';

class NodeContainerPlugin extends Plugin {
  protected resolvedInputs: IFrameworkPluginNodeInputs;
  protected buildOutput: any;
  protected nodeBuilder: NodeContainerBuilder;
  protected containerPlugin: any;

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
      installDeps: true,
    };

    this.resolvedInputs = resolveInputs(this.inputs, DEFAULT_INPUTS);

    this.nodeBuilder = new NodeContainerBuilder({
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
    return this.containerPlugin.compile();
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
    const res = await this.nodeBuilder.build({
      dockerImage: 'node:10',
      entry: this.resolvedInputs.entry || 'app.js',
      installDeps: this.resolvedInputs.installDeps,
      port: this.resolvedInputs.containerOptions?.containerPort,
      hasPackage: fs.existsSync(
        path.join(
          this.api.projectPath,
          this.resolvedInputs.projectPath || '',
          'package.json'
        )
      ),
    });

    this.containerPlugin = new ContainerPlugin(
      'NodeContainerPlugin',
      this.api,
      {
        serviceName: this.resolvedInputs.name || 'node',
        servicePath: this.resolvedInputs.path || '/node-app',
        ...(this.resolvedInputs.containerOptions || {}),
        localAbsolutePath: res.container[0].source,
      }
    );

    await this.containerPlugin.init();

    return this.containerPlugin.build();
  }

  /**
   * 部署
   */
  async deploy() {
    await this.containerPlugin.deploy();
    await this.nodeBuilder.clean();
  }
}

function resolveInputs(inputs: any, defaultInputs: any) {
  return Object.assign({}, defaultInputs, inputs);
}

export const plugin = NodeContainerPlugin;
