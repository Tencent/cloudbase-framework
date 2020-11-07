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

/* eslint-disable @typescript-eslint/no-require-imports */

import { promisify } from 'util';
import figlet from 'figlet';
import chalk from 'chalk';
import merge from 'lodash.merge';

import { genClickableLink } from './utils/link';
import { emoji } from './utils/emoji';

const gradient = require('gradient-string');
chalk.level = 1;

import PluginManager from './plugin-manager';
import { CloudApi } from './api';
import resolveConfig from './config/resolve-config';
import Context from './context';
import { CloudBaseFrameworkConfig, Config } from './types';
import getLogger from './logger';
import { SamManager } from './sam';
import { genAddonSam } from './sam/addon';
import Hooks from './hooks';
import { fetchDomains } from './api/domain';
import { ISAM } from './sam/types';
import { createAndDeployCloudBaseProject } from './api/app';
import { loggers } from 'winston';

export { default as Plugin } from './plugin';
export { default as PluginServiceApi } from './plugin-service-api';
export { Builder } from './builder';
export { Deployer } from './deployer';
export { CloudApi } from './api';
export * from './types';

const packageInfo = require('../package');
const SUPPORT_COMMANDS = ['deploy', 'compile', 'run'];

interface CommandParams {
  runCommandKey?: string;
}

/**
 *
 * 提供 CLI 调用
 *
 * @param cloudBaseFrameworkConfig
 * @param command
 * @param module
 * @param params
 */
export async function run(
  cloudBaseFrameworkConfig: CloudBaseFrameworkConfig,
  command: 'deploy' = 'deploy',
  module?: string,
  params?: CommandParams
) {
  const frameworkCore = new CloudBaseFrameworkCore(cloudBaseFrameworkConfig);

  if (!SUPPORT_COMMANDS.includes(command)) {
    throw new Error(`CloudBase Framework: not support command '${command}'`);
  }
  await frameworkCore.init();
  await frameworkCore[command](module, params);

  const logger = getLogger();
  logger.info('✨ done');
}

/**
 * CloudBase Framework 核心实现类
 */
export class CloudBaseFrameworkCore {
  pluginManager!: PluginManager;
  samManager!: SamManager;
  appConfig!: Config;
  hooks!: Hooks;
  projectInfo!: Record<string, any> | undefined;

  constructor(public frameworkConfig: CloudBaseFrameworkConfig) {}

  async init() {
    const {
      projectPath,
      cloudbaseConfig,
      logLevel = 'info',
      config,
      resourceProviders,
      bumpVersion,
      versionRemark,
    } = this.frameworkConfig;

    const logger = getLogger(logLevel);

    await showBanner();
    logger.info(`Version ${chalk.green(`v${packageInfo.version}`)}`);
    logger.info(
      `Github: ${genClickableLink(
        'https://github.com/TencentCloudBase/cloudbase-framework'
      )}
`
    );

    logger.info(`EnvId ${chalk.green(cloudbaseConfig.envId)}`);

    if (
      !projectPath ||
      !cloudbaseConfig ||
      !cloudbaseConfig.secretId ||
      !cloudbaseConfig.secretKey
    ) {
      throw new Error('CloudBase Framework: config info missing');
    }
    CloudApi.init({
      secretId: cloudbaseConfig.secretId,
      secretKey: cloudbaseConfig.secretKey,
      token: cloudbaseConfig.token || '',
      envId: cloudbaseConfig.envId,
    });

    const { appConfig, originProjectInfo } = await resolveConfig(
      projectPath,
      config,
      cloudbaseConfig.envId
    );

    this.projectInfo = originProjectInfo;

    if (!appConfig) {
      logger.info('⚠️ 未识别到框架配置');
      return;
    }

    this.samManager = new SamManager({
      projectPath,
    });
    const context = new Context({
      appConfig,
      projectConfig: config,
      cloudbaseConfig,
      projectPath,
      logLevel,
      resourceProviders,
      samManager: this.samManager,
      bumpVersion: !!bumpVersion,
      versionRemark: versionRemark || '',
    });

    this.pluginManager = new PluginManager(context);
    this.appConfig = appConfig;
    this.hooks = new Hooks(appConfig.hooks || {}, projectPath);
  }

  /**
   * 调用命令
   *
   * @param module
   * @param params
   */
  async run(module?: string, params?: CommandParams) {
    await this.pluginManager.run(module, params?.runCommandKey);
  }

  /**
   * 编译应用
   *
   * @param module
   * @param params
   */
  async compile(module?: string, params?: CommandParams) {
    await this.hooks.callHook('preDeploy');
    await this._compile(module);
  }

  /**
   * 编译并部署应用
   * @param module
   * @param params
   */
  async deploy(module?: string, params?: CommandParams) {
    await this.hooks.callHook('preDeploy');
    await this._compile(module);
    await this.samManager.install(this.createProjectVersion.bind(this));
    await this.pluginManager.deploy(module);
    await this.hooks.callHook('postDeploy');

    const appEntry = await this.samManager.getAppEntry();
    if (appEntry.length) {
      const domains = await fetchDomains();

      const entryLogInfo = appEntry
        .map((entry: any) => {
          let url;
          let base;
          switch (entry.EntryType) {
            case 'StaitcStore':
              base = domains.static;
              break;
            case 'HttpService':
              base = domains.service;
              break;
          }
          url = `https://${base}${
            entry.HttpEntryPath
              ? entry.HttpEntryPath[0] === '/'
                ? entry.HttpEntryPath
                : `/${entry.HttpEntryPath}`
              : ''
          }`;
          return `${emoji('🔗')} ${entry.Label}: ${genClickableLink(url)}`;
        })
        .join('\n');
      getLogger().info(`${emoji('🌐')} 应用入口信息:
${entryLogInfo}`);
    }
  }

  generateSamMeta() {
    const appName = `${this.appConfig.name || 'fx-app'}`;

    return merge(
      {
        Name: appName,
        Version: this.appConfig.version || '1.0.0',
        DisplayName: appName,
        Description:
          this.appConfig.description || '基于 CloudBase Framework 构建',
        Tags: this.appConfig.tags || [],
        Globals: {
          // 全局环境变量
          Environment: {
            Variables: this.appConfig.environment || {},
          },
        },
        // repo 信息
        ...(this.appConfig.repo
          ? {
              SourceUrl: this.appConfig.repo.url,
              SourceDir: this.appConfig.repo.workDir || '.',
              SourceBranch: this.appConfig.repo.branch,
            }
          : {}),
      },
      this.appConfig.addons?.length ? genAddonSam(this.appConfig.addons) : {}
    );
  }

  async createProjectVersion(template: ISAM) {
    let isCloudBuild = !!process.env.CLOUDBASE_CIID;

    // 云端部署直接返回
    if (isCloudBuild) {
      return process.env.CLOUDBASE_CIID;
      // 本地部署也创建项目版本
    } else {
      const { Name, Globals } = template;

      const Parameters = this.transpileEnvironments(
        Globals?.Environment?.Variables
      );

      const Source = this.projectInfo?.Source || {
        Type: 'local',
        Url: '',
        Name: '',
        WorkDir: '',
        Headers: {},
      };

      // 旧的字段保持 JSON 格式，新字段使用字符串格式
      const data = await createAndDeployCloudBaseProject({
        Name,
        Parameters,
        Source,
        RcJson: JSON.stringify(this.appConfig),
        AddonConfig: JSON.stringify(this.appConfig.addons),
        NetworkConfig: JSON.stringify(this.appConfig.network),
      });

      return data?.RequestId;
    }
  }

  transpileEnvironments(environment: Record<string, string>) {
    return Object.entries(environment || {}).map(([Key, Value]) => {
      return {
        Key,
        Value,
      };
    });
  }

  /**
   * 编译 SAM
   * @param module
   */
  private async _compile(module?: string) {
    await this.pluginManager.init(module);
    await this.pluginManager.build(module);

    const compileResult = await this.pluginManager.compile(module);
    const isHasContainer = !!Object.values(
      merge({}, ...compileResult).Resources || {}
    ).filter((resource) => (resource as any).type === 'CloudBase::CloudBaseRun')
      .length;

    await this.hooks.callHook('postCompile');

    const samMeta = this.generateSamMeta();
    const hooksSAM = this.hooks.genSAM();
    const networkSections = this.genNetworkSAM(isHasContainer);
    const samSections = [...compileResult, hooksSAM, networkSections];
    this.samManager.generate(samMeta, JSON.parse(JSON.stringify(samSections)));
  }

  private genNetworkSAM(isHasContainer: boolean) {
    return {
      Resources: {
        // 网络 VPC 设置
        ...(this.appConfig.network
          ? {
              Network: {
                Type: 'CloudBase::VPC',
                Properties: {
                  UniqVpcId: this.appConfig.network?.uniqVpcId,
                  CloudBaseRun:
                    this.appConfig.network?.cloudBaseRun && isHasContainer,
                  // @todo temp disabled
                  Region: 'ap-guangzhou',
                  // Region: this.appConfig.network?.region || '${TcbEnvRegion}',
                },
              },
            }
          : {}),
      },
    };
  }
}
/**
 * 展示 CloudBase Framework 横幅
 */
async function showBanner() {
  try {
    const data = await promisify(figlet.text as any)(
      `CloudBase
Framework`,
      {
        font: 'Slant',
        horizontalLayout: 'fitted',
        verticalLayoutL: 'fitted',
      }
    );
    console.log(
      chalk.bold(
        gradient(['cyan', 'rgb(0, 111, 150)', 'rgb(0, 246,136)']).multiline(
          data + '\n'
        )
      )
    );
  } catch (e) {}
}
