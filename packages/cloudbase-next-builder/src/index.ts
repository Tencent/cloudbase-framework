/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2025 Tencent.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import path from 'path';
import fs from 'fs-extra';
import archiver from 'archiver';
import { Builder } from '@cloudbase/framework-core';

const launcher = fs.readFileSync(
  path.resolve(__dirname, '../asset/__launcher.js'),
  'utf-8'
);

interface NextBuilderOptions {
  /**
   * 项目根目录的绝对路径
   */
  projectPath: string;
}

interface NextBuilderBuildOptions {
  /**
   * 项目根目录的绝对路径
   */
  path: string;

  /**
   * 函数名或者服务名
   */
  name: string;
}

export class NextBuilder extends Builder {
  private dependencies: Object;
  constructor(options: NextBuilderOptions) {
    super({
      type: 'next',
      ...options,
    });
    this.dependencies = {
      koa: '^2.11.0',
      'serverless-http': '^2.3.2',
      esm: '^3.2.25',
    };
  }

  async build(entry: string, options: NextBuilderBuildOptions) {
    const { distDir } = this;
    const nextDistPath = path.resolve(entry, '.next');
    const nextPublicPath = path.resolve(entry, 'public');

    const serviceName = options.name;
    const serviceDir = path.join(distDir, serviceName);

    if (!(await fs.pathExists(nextDistPath))) {
      throw new Error('没有找到 .next 目录，请先执行构建');
    }

    fs.ensureDirSync(serviceDir);

    // 移动 .next
    await fs.copy(nextDistPath, path.resolve(serviceDir, '.next'));

    // 移动 public: static files
    if (await fs.pathExists(nextPublicPath)) {
      await fs.copy(nextPublicPath, path.resolve(serviceDir, 'public'));
    }

    // package.json
    const packageJson = await this.generatePackageJson(entry);
    await fs.writeFile(path.resolve(serviceDir, 'package.json'), packageJson);

    // next.config.js，需要babel转为es5
    await fs.copy(
      path.resolve(entry, 'next.config.js'),
      path.resolve(serviceDir, 'next.config.js')
    );

    // launcher
    await fs.writeFile(
      path.resolve(serviceDir, 'index.js'),
      launcher.replace(/\/\*path\*\//g, options.path)
    );

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
    if (!(await fs.pathExists(packageJsonPath))) {
      throw new Error('未找到Next项目的package.json');
    }
    return JSON.parse(await fs.readFile(packageJsonPath, 'utf-8'));
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
      var output = fs.createWriteStream(dest);
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
