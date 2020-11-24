/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import path from 'path';
import fs from 'fs-extra';
import { Builder } from '@cloudbase/framework-core';

interface BuilderOptions {
  /**
   * 项目根目录的绝对路径
   */
  projectPath: string;
}

interface BuilderBuildOptions {
  /**
   * 路径
   */
  path: string;

  /**
   * 服务名
   */
  name: string;
}

export class DartBuilder extends Builder {
  constructor(options: BuilderOptions) {
    super({
      type: 'dart',
      ...options,
    });
  }

  async build(localDir: string, options: BuilderBuildOptions) {
    const { distDir, projectDir } = this;
    const containerName = options?.name || 'dartapp';
    const appDir = path.join(distDir, containerName);

    fs.ensureDirSync(appDir);

    // 拷贝整个 dart 项目目录
    await fs.copy(path.join(projectDir, localDir), appDir);

    // 加入 Dockerfile
    await fs.copy(
      path.resolve(__dirname, '../assets/Dockerfile'),
      path.join(appDir, 'Dockerfile')
    );

    return {
      containers: [
        {
          name: containerName,
          options: {},
          source: appDir,
        },
      ],
      routes: [
        {
          path: options.path,
          targetType: 'container',
          target: containerName,
        },
      ],
    };
  }
}
