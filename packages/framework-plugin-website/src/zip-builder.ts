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
import archiver from 'archiver';
import fs from 'fs';
import { Builder } from '@cloudbase/framework-core';
import { mkdirSync } from '@cloudbase/toolbox';

interface ZipBuilderBuildOptions {
  name: string;
  localPath: string;
  zipFileName: string;
  ignore: string[];
}

interface ZipBuilderOptions {
  /**
   * 项目根目录的绝对路径
   */
  projectPath: string;
}

export class ZipBuilder extends Builder {
  constructor(options: ZipBuilderOptions) {
    super({
      type: 'zip',
      ...options,
    });
  }

  async build(options: ZipBuilderBuildOptions[]) {
    const zipFiles = await Promise.all(options.map(async (option) => {
      const localZipPath = path.join(this.distDir, option.zipFileName);

      if (!fs.existsSync(this.distDir)) {
        mkdirSync(this.distDir);
      }

      if (!fs.existsSync(option.localPath)) {
        throw new Error(`目录或者文件 ${path.basename(option.localPath)} 不存在`);
      }

      const fileStats = fs.statSync(option.localPath);

      if (fileStats.isFile()) {
        this.logger.debug('option.localPath', option.localPath, localZipPath);
        await this.zipFile(option.localPath, localZipPath);
      } else if (fileStats.isDirectory()) {
        this.logger.debug('option.localPath', option.localPath, localZipPath);
        await this.zipDir(option.localPath, localZipPath, option.ignore);
      }

      return {
        name: option.name,
        options: {},
        source: localZipPath,
        entry: option.zipFileName,
      };
    }));

    return {
      zipFiles,
    };
  }

  async zipFile(src: string, dest: string) {
    return new Promise((resolve, reject) => {
      // create a file to stream archive data to.
      const output = fs.createWriteStream(dest);
      const archive = archiver('zip', {
        zlib: { level: 9 }, // Sets the compression level.
      });
      output.on('close', () => {
        resolve();
      });
      archive.on('error', reject);
      archive.file(src, {
        name: path.basename(src),
      });
      archive.pipe(output);
      archive.finalize();
    });
  }

  async zipDir(src: string, dest: string, ignore?: string[]) {
    return new Promise((resolve, reject) => {
      // create a file to stream archive data to.
      const output = fs.createWriteStream(dest);
      const archive = archiver('zip', {
        zlib: { level: 9 }, // Sets the compression level.
      });
      output.on('close', () => {
        resolve();
      });
      archive.on('error', reject);
      archive.glob(
        '**/*',
        {
          cwd: src,
          ignore: ignore || [],
          dot: true,
        },
        {}
      );
      archive.pipe(output);
      archive.finalize();
    });
  }
}
