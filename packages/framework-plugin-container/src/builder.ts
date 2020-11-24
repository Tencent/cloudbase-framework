/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import path from 'path';
import fse from 'fs-extra';
import archiver from 'archiver';
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

export class ContainerBuilder extends Builder {
  constructor(options: BuilderOptions) {
    super({
      type: 'container',
      ...options,
    });
  }

  async build(localDir: string, options: BuilderBuildOptions) {
    const { distDir } = this;
    fse.ensureDirSync(distDir);
    const distFileName = path.join(
      distDir,
      `${options.name || 'container'}.zip`
    );

    await this.zipDir(localDir, distFileName);

    return {
      containers: [
        {
          name: options.name,
          options: {},
          source: distFileName,
        },
      ],
      routes: [
        {
          path: options.path,
          targetType: 'container',
          target: options.name,
        },
      ],
    };
  }

  async zipDir(src: string, dest: string) {
    return new Promise((resolve, reject) => {
      // create a file to stream archive data to.
      const output = fse.createWriteStream(dest);
      const archive = archiver('zip', {
        zlib: { level: 9 }, // Sets the compression level.
      });
      output.on('close', resolve);
      archive.on('error', reject);
      archive.directory(src, false);
      archive.pipe(output);
      archive.finalize();
    });
  }
}
