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
  // 项目根目录的绝对路径
  projectPath: string;
}

export class DenoBuilder extends Builder {
  constructor(options: BuilderOptions) {
    super({
      type: 'deno',
      ...options,
    });
  }

  async build(localDir: string, options: object) {
    const { distDir, projectDir } = this;
    const spec: any = {
      runtime: 'latest',
      denonVersion: '',
      name: 'deno-app',
      path: '/deno-app',
      autoBuild: true,
      ...options,
    };

    const containerName = spec.name;
    const appDir = path.join(distDir, containerName);

    spec.denoVersion = '';
    if (spec.runtime && spec.runtime !== 'latest') {
      spec.denoVersion = `-s ${spec.runtime}`;
    }

    fs.ensureDirSync(appDir);

    await Promise.all([
      this.generator.generate(path.join(__dirname, '../assets'), appDir, spec),
      fs.copy(path.join(projectDir, localDir), appDir),
    ]);

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
          path: spec.path,
          targetType: 'container',
          target: containerName,
        },
      ],
    };
  }
}
