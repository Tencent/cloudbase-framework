/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2025 Tencent.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import path from 'path';
import fs from 'fs';
import cpy from 'cpy';
import { Builder } from '@cloudbase/framework-core';
import { fetchStream, mkdirSync, getProxy } from '@cloudbase/toolbox';

interface StaticBuilderBuildOptions {
  /**
   * 云接入路径
   */
  path?: string;
  /**
   * 静态网站域名
   */
  domain?: string;
  /**
   * 环境变量
   */
  config?: any;
}

interface StaticBuilderOptions {
  /**
   * 项目根目录的绝对路径
   */
  projectPath: string;
  copyRoot?: string;
}

const CONFIG_FILE_NAME = 'cloudbaseenv.json';
const CONFIG_SCRIPT_FILE_NAME = '_init_tcb-env.js';

export class StaticBuilder extends Builder {
  private copyRoot: string;
  constructor(options: StaticBuilderOptions) {
    super({
      type: 'static',
      ...options,
    });
    this.copyRoot = options.copyRoot || this.projectDir;
  }
  async build(includes: string[], options: StaticBuilderBuildOptions = {}) {
    const contentDistPath = path.join(this.distDir, 'content');
    const configDistPath = path.join(this.distDir, 'config');

    // build content
    await cpy(includes, contentDistPath, {
      cwd: this.copyRoot,
      parents: true,
    });
    // build config
    await this.buildConfig(configDistPath, options);

    return {
      static: [
        {
          src: contentDistPath,
          cloudPath: options.path || '/',
        },
      ],
      staticConfig: [
        {
          src: configDistPath,
          cloudPath: '/',
        },
      ],
      routes: [
        {
          path: options.path || '/',
          targetType: 'static',
          target: options.path || '/',
        },
      ],
    };
  }

  async buildConfig(
    configDistPath: string,
    options: StaticBuilderBuildOptions
  ) {
    // 1. 读取旧配置
    let originConfig;
    if (options.domain && options.config) {
      const url = `https://${options.domain}/${CONFIG_FILE_NAME}`;
      const streamRes = await fetchStream(url, undefined, getProxy());
      if (streamRes?.status == 200) {
        originConfig = await streamRes.json().catch(() => {
          return {};
        });
      } else {
        originConfig = {};
      }
    } else {
      // 域名为空, 则静态托管还未开通
      originConfig = {};
    }

    // 2. 整合配置
    const resolvedConfig = Object.assign({}, originConfig, options.config);

    // 3. 写入新配置
    if (!fs.existsSync(configDistPath)) {
      mkdirSync(configDistPath);
    }
    fs.writeFileSync(
      path.join(configDistPath, CONFIG_FILE_NAME),
      JSON.stringify(resolvedConfig)
    );
    fs.writeFileSync(
      path.join(configDistPath, CONFIG_SCRIPT_FILE_NAME),
      `window._tcbEnv = ${JSON.stringify(resolvedConfig)};`
    );
  }
}
