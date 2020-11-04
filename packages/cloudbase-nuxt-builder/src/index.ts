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
import fs from 'fs-extra';
import archiver from 'archiver';
import { Builder } from '@cloudbase/framework-core';

const launcher = fs.readFileSync(
  path.resolve(__dirname, '../asset/__launcher.js'),
  'utf-8'
);

interface NuxtBuilderOptions {
  /**
   * 项目根目录的绝对路径
   */
  projectPath: string;
}

interface NuxtBuilderBuildOptions {
  /**
   * 项目根目录的绝对路径
   */
  path: string;

  /**
   * 函数名或者服务名
   */
  name: string;
}

export class NuxtBuilder extends Builder {
  private dependencies: Object;
  constructor(options: NuxtBuilderOptions) {
    super({
      type: 'nuxt',
      ...options,
    });
    this.dependencies = {
      koa: '^2.11.0',
      'serverless-http': '^2.3.2',
      esm: '^3.2.25',
    };
  }

  async build(entry: string, options: NuxtBuilderBuildOptions) {
    const { distDir } = this;
    const nuxtDistPath = path.resolve(entry, '.nuxt');

    const serviceName = options.name;
    const serviceDir = path.join(distDir, serviceName);

    if (!(await fs.pathExists(nuxtDistPath))) {
      throw new Error('没有找到 .nuxt 目录，请先执行构建');
    }

    fs.ensureDirSync(serviceDir);

    // 移动 .nuxt
    await fs.copy(nuxtDistPath, path.resolve(serviceDir, '.nuxt'));

    // package.json
    const packageJson = await this.generatePackageJson();
    await fs.writeFile(path.resolve(serviceDir, 'package.json'), packageJson);

    // nuxt.config.js，需要babel转为es5
    await fs.copy(
      path.resolve(entry, 'nuxt.config.js'),
      path.resolve(serviceDir, 'nuxt.config.js')
    );

    // launcher
    await fs.writeFile(
      path.resolve(serviceDir, 'index.js'),
      launcher.replace('/*path*/', options.path)
    );

    // TODO: static files

    return {
      functions: [
        {
          name: serviceName,
          options: {},
          source: distDir,
          entry: 'index.main',
        },
      ],
      routes: [
        {
          path: options.path,
          targetType: 'function',
          target: serviceName,
        },
      ],
    };
  }

  async resolveOriginalPackageJson() {
    const { projectDir } = this;
    const packageJsonPath = path.resolve(projectDir, 'package.json');
    if (!(await fs.pathExists(packageJsonPath))) {
      throw new Error('未找到Nuxt项目的package.json');
    }
    return JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
  }

  async generatePackageJson() {
    const originalPackageJson = await this.resolveOriginalPackageJson();
    const json = {
      name: originalPackageJson.name,
      dependencies: {
        ...this.dependencies,
        ...originalPackageJson.dependencies,
      },
    };
    return JSON.stringify(json, null, 4);
  }

  async zipDir(src: string, dest: string) {
    return new Promise((resolve, reject) => {
      // create a file to stream archive data to.
      var output = fs.createWriteStream(dest);
      var archive = archiver('zip', {
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
