/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
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
