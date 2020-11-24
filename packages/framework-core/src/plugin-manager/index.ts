/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */

/* eslint-disable @typescript-eslint/no-require-imports */
import os from 'os';
import path from 'path';
import fs from 'fs';

const corePackageInfo = require('../../package');

import { install } from './pkg-install';
import { emoji } from '../utils/emoji';
import { Config } from '../types';
import Context from '../context';
import Plugin from '../plugin';
import PluginServiceApi from '../plugin-service-api';
import { mkdirSync } from '@cloudbase/toolbox';
import { spawnPromise } from '../utils/spawn';

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
  pluginInstallState = false;

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
    try {
      await this.pluginInstallPromise;
      this.context.logger.debug(
        '插件版本信息',
        JSON.parse(
          (await spawnPromise('npm ls', ['--depth=0', '--json'], {
            cwd: this.pluginRegistry,
            stdio: 'pipe',
          })) as string
        )
      );
    } catch (e) {
      this.context.logger.debug(e);
    }

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

    try {
      await this.pluginInstallPromise;
    } catch (e) {
      this.context.logger.error(e);
      throw new Error(
        `CloudBase Framework: can't install plugin npm package '${pluginData.name}'`
      );
    }

    try {
      PluginCode = require(path.join(
        this.pluginRegistry,
        'node_modules',
        pluginData.name
      )).plugin;
    } catch (e) {
      this.context.logger.error(e);
      throw new Error(
        `CloudBase Framework: can't find plugin '${pluginData.name}'`
      );
    }

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
    await install(
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
    if (this.pluginInstallState || process.env.CLOUDBASE_FX_ENV === 'dev') {
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
