/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2025 Tencent.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import path from 'path';
import fse from 'fs-extra';

import { Builder } from '@cloudbase/framework-core';

interface NodeContainerBuilderBuildOptions {
  dockerImage: string;
  entry: string;
  installDeps?: boolean;
  port?: number;
  hasPackage?: boolean;
}

interface NodeContainerBuilderOptions {
  /**
   * 项目根目录的绝对路径
   */
  projectPath: string;
}

export class NodeContainerBuilder extends Builder {
  constructor(options: NodeContainerBuilderOptions) {
    super({
      type: 'node-container',
      ...options,
    });
  }
  async build(options?: NodeContainerBuilderBuildOptions) {
    const { distDir } = this;

    await Promise.all([
      this.generator.generate(
        path.join(__dirname, '../assets'),
        distDir,
        options || {}
      ),
      fse.copy(path.join(this.projectDir), distDir),
    ]);

    return {
      container: [
        {
          name: 'node-container',
          options: {},
          source: distDir,
          entry: options?.entry || '',
        },
      ],
    };
  }
}
