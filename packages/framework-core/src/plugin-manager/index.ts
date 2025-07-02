/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2025 Tencent.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */

/* eslint-disable @typescript-eslint/no-require-imports */
import os from 'os';
import path from 'path';
import fs from 'fs';

const corePackageInfo = require('../../package');

import { npmInstallWithCheck } from './pkg-install';
import { emoji } from '../utils/emoji';
import { Config } from '../types';
import Context from '../context';
import Plugin from '../plugin';
import PluginServiceApi from '../plugin-service-api';
import { mkdirSync } from '@cloudbase/toolbox';

interface PluginData {
  id: string;
  name: string;
  version: string;
  scope: string;
  inputs: any;
  pluginInstance?: Plugin;
  api?: PluginServiceApi;
}

interface PluginHookOption {
  id?: string | undefined;
  params?: any;
  icon?: string;
}

type PluginHookName = 'init' | 'build' | 'deploy' | 'compile' | 'run';

/**
 * 插件管理器
 *
 * @description 管理插件的生命周期，为插件注入 api 和参数
 */
export default class PluginManager {
  context: Context;
  plugins: PluginData[];
  pluginRegistry: string;
  pluginInstallPromise: Promise<boolean>;

  constructor(context: Context) {
    this.context = context;
    this.plugins = this.resolvePlugins(this.context.appConfig);

    this.pluginRegistry = path.join(
      os.homedir(),
      'cloudbase-framework/registry'
    );
    this.initRegistry();
    this.pluginInstallPromise = this.installPlugins();
  }

  /**
   * 初始化检测
   *
   * @param id
   */
  async init(id?: string) {
    await this.pluginInstallPromise;

    return this.callPluginHook('init', {
      id,
    });
  }

  /**
   * 构建
   *
   * @param id
   */
  async build(id?: string) {
    return this.callPluginHook('build', {
      id,
      icon: emoji('🔨'),
    });
  }

  /**
   * 编译
   *
   * @param id
   */
  async compile(id?: string) {
    return this.callPluginHook('compile', {
      id,
      icon: emoji('🧬'),
    });
  }

  /**
   * 部署
   *
   * @param id
   */
  async deploy(id?: string) {
    return this.callPluginHook('deploy', {
      id,
      icon: emoji('🚀'),
    });
  }

  /**
   * 执行本地命令
   *
   * @param id
   */
  async run(id?: string, runCommandKey?: string) {
    return this.callPluginHook('run', {
      id,
      params: { runCommandKey },
      icon: emoji('🚢'),
    });
  }

  /**
   * 调用插件钩子
   * @param id
   */
  private callPluginHook(
    hook: PluginHookName,
    { id, params, icon }: PluginHookOption
  ) {
    return Promise.all(
      this.pickPlugins(id).map(async (pluginData) => {
        const pluginInstance = await this.loadPlugin(pluginData);

        if (typeof pluginInstance[hook] !== 'function') {
          return;
        }

        this.context.logger.info(
          `${icon || emoji('🔧')} ${hook}: ${pluginData.id}...`
        );

        return (pluginInstance[hook] as any)(params);
      })
    );
  }

  /**
   * 解析插件
   * @param config
   */
  private resolvePlugins(config: Config) {
    const pattern = /^(((@[^/]+)\/)?[^@]+)(@(.*))?$/;
    const allPlugins = Object.entries(config.plugins).map(
      ([id, pluginConfig]) => {
        const { use, inputs } = pluginConfig;

        const matches = pattern.exec(use);

        if (!matches) {
          throw new Error(`错误的插件名${use}`);
        }

        const [, pkgName, , scope, , version] = matches;

        return {
          id,
          name: pkgName,
          scope,
          inputs: inputs,
          version,
        };
      }
    );
    return allPlugins;
  }

  /**
   * 加载插件代码
   *
   * @param pluginData
   */
  private async loadPlugin(pluginData: PluginData): Promise<Plugin> {
    if (pluginData.pluginInstance) {
      return pluginData.pluginInstance;
    }

    let PluginCode: Plugin | undefined;

    await this.pluginInstallPromise;

    PluginCode = require(path.join(
      this.pluginRegistry,
      'node_modules',
      pluginData.name
    )).plugin;

    if (!PluginCode) {
      this.context.logger.error(
        `CloudBase Framework: plugin '${pluginData.name}' isn't a valid plugin`
      );
      throw new Error(
        `CloudBase Framework: plugin '${pluginData.name}' isn't a valid plugin`
      );
    }

    pluginData.pluginInstance = new (PluginCode as any)(
      pluginData.name,
      new PluginServiceApi(this),
      pluginData.inputs
    );
    return pluginData.pluginInstance as Plugin;
  }

  /**
   * 筛选插件
   * @param id
   */
  private pickPlugins(id?: string): PluginData[] {
    return id
      ? this.plugins.filter((plugin) => plugin.id === id)
      : this.plugins;
  }

  /**
   * @param packageName
   */
  private async installPackage(packageInfo: Record<string, string>) {
    this.context.logger.info(`${emoji('📦')} install plugins`);
    await npmInstallWithCheck(
      {
        ...packageInfo,
      },
      {
        cwd: this.pluginRegistry,
      }
    );
  }

  /**
   * 初始化插件仓库
   */
  private initRegistry() {
    if (!fs.existsSync(this.pluginRegistry)) {
      mkdirSync(this.pluginRegistry);
    }
    const packageJSON = path.join(this.pluginRegistry, 'package.json');
    if (!fs.existsSync(packageJSON)) {
      fs.writeFileSync(
        packageJSON,
        JSON.stringify({
          name: 'cloudbase-framework-registry',
        })
      );
    }
  }

  private async installPlugins() {
    if (process.env.CLOUDBASE_FX_ENV === 'dev') {
      this.context.logger.info(
        'CLOUDBASE_FX_ENV=dev时，进入本地开发模式，插件使用本地link版本'
      );
      return true;
    } else {
      const packageInfo = this.plugins.reduce((prev, curr) => {
        const pkgVersion = curr.version;
        let version;
        // 如指定版本，按照指定的版本
        if (pkgVersion) {
          version = pkgVersion;
          // 官方插件的版本，跟内核版本相同
        } else if (curr.scope === '@cloudbase') {
          version = (corePackageInfo as any).version;
        } else {
          // 其他插件，取最新版本
          version = 'latest';
        }
        (prev as any)[curr.name] = version;
        return prev;
      }, {});
      await this.installPackage(packageInfo);
      return true;
    }
  }
}
