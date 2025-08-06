/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2025 Tencent.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import path from 'path';
import fse from 'fs-extra';
import archiver from 'archiver';
import { Builder } from '@cloudbase/framework-core';
import { transform } from '@babel/core';

const launcher = fse.readFileSync(
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

async function transformToEs5(code: string) {
  return new Promise((resolve, reject) => {
    transform(code, {
        presets: [['@babel/preset-env', { targets: { node: '10.15' } }]]
      },
      (err, result) => {
        if (err) {
          reject(err);
        }
        if (result) {
          resolve(result.code);
        }
      });
  });
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
    const nuxtDistPath = path.join(entry, '.nuxt');
    const nuxtStaticPath = path.join(entry, 'static');

    const serviceName = options.name;
    const serviceDir = path.join(distDir, serviceName);

    if (!(await fse.pathExists(nuxtDistPath))) {
      throw new Error('没有找到 .nuxt 目录，请先执行构建');
    }

    fse.ensureDirSync(serviceDir);

    // 移动 .nuxt
    await fse.copy(nuxtDistPath, path.join(serviceDir, '.nuxt'));

    // package.json
    const packageJson = await this.generatePackageJson(entry);
    await fse.writeFile(path.join(serviceDir, 'package.json'), packageJson);

    // nuxt.config.js，需要babel转为es5
    const nuxtConfigJsContent = await fse.readFile(
      path.join(entry, 'nuxt.config.js'),
      'utf-8'
    );
    const es5NuxtConfigJsContent = await transformToEs5(nuxtConfigJsContent);
    await fse.writeFile(
      path.join(serviceDir, 'nuxt.config.js'),
      es5NuxtConfigJsContent
    );

    // launcher
    await fse.writeFile(
      path.join(serviceDir, 'index.js'),
      launcher.replace('/*path*/', options.path)
    );

    // static files
    try {
      await fse.copy(nuxtStaticPath, path.join(serviceDir, 'static'));
    } catch (e) {
      this.logger.debug('Nuxt Builder: copy static:', e);
    }

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

  async resolveOriginalPackageJson(entry: string) {
    const { projectDir } = this;
    const packageJsonPath = path.resolve(projectDir, entry, 'package.json');
    if (!(await fse.pathExists(packageJsonPath))) {
      throw new Error('未找到Nuxt项目的package.json');
    }
    return JSON.parse(await fse.readFile(packageJsonPath, 'utf-8'));
  }

  async generatePackageJson(entry: string) {
    const originalPackageJson = await this.resolveOriginalPackageJson(entry);
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
      var output = fse.createWriteStream(dest);
      var archive = archiver('zip', {
        zlib: { level: 9 }, // Sets the compression level.
      });
      output.on('close', resolve);
      archive.on('error', reject);
      archive.glob('**/*', {
        cwd: src,
        dot: true,
        follow: true,
      });
      archive.pipe(output);
      archive.finalize();
    });
  }
}
