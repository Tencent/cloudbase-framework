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
