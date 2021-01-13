/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
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
import getLogger, { getLogFilePath } from './logger';
import { SamManager } from './sam';
import { genAddonSam } from './sam/addon';
import Hooks from './hooks';
import { fetchDomains } from './api/domain';
import { createAndDeployCloudBaseProject } from './api/app';
import LifeCycleManager from './lifecycle';
import { ERRORS, CloudBaseFrameworkError, USER_ERRORS_MAP } from './error';

export { default as Plugin } from './plugin';
export { default as PluginServiceApi } from './plugin-service-api';
export { Builder } from './builder';
export { Deployer } from './deployer';
export { CloudApi } from './api';
export * from './types';

const packageInfo = require('../package');
const SUPPORT_COMMANDS = ['deploy', 'compile', 'run'];
let globalErrorHandler = async (e: Error) => {
  console.error(e.message);
};

interface CommandParams {
  runCommandKey?: string;
}

let isReported = false;

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
  try {
    const frameworkCore = new CloudBaseFrameworkCore(cloudBaseFrameworkConfig);

    if (!SUPPORT_COMMANDS.includes(command)) {
      throw new Error(`CloudBase Framework: not support command '${command}'`);
    }
    const isDeploy = command === 'deploy';
    await frameworkCore.init(isDeploy);
    await frameworkCore[command](module, params);

    const logger = getLogger();
    logger.info('✨ done');
  } catch (e) {
    await globalErrorHandler(e);
    process.exit(1);
  }
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
  ciId!: string;
  context!: Context;
  lifeCycleManager!: LifeCycleManager;
  isDeploy!: boolean;

  constructor(public frameworkConfig: CloudBaseFrameworkConfig) {}

  async init(isDeploy: boolean) {
    this.isDeploy = isDeploy;
    const {
      projectPath,
      cloudbaseConfig,
      logLevel = 'info',
      config,
      resourceProviders,
      bumpVersion,
      versionRemark,
    } = this.frameworkConfig;

    // 初始化 logger
    const logger = getLogger(logLevel);

    await showBanner();
    logger.info(`Version ${chalk.green(`v${packageInfo.version}`)}`);
    logger.info(
      `Github: ${genClickableLink(
        'https://github.com/Tencent/cloudbase-framework'
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

    await CloudApi.init({
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
    logger.info(`AppName ${chalk.green(appConfig.name)}`);

    this.projectInfo = originProjectInfo;

    if (!appConfig) {
      logger.info('⚠️ 未识别到框架配置');
      return;
    }

    logger.debug('appConfig', appConfig);

    this.samManager = new SamManager({
      projectPath,
    });
    this.appConfig = appConfig;

    this.ciId = this.isDeploy ? await this.createProjectVersion() : undefined;

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
      ciId: this.ciId,
    });
    this.context = context;
    this.lifeCycleManager = new LifeCycleManager(context);

    async function processSignalHandle(signal: string) {
      await globalErrorHandler(
        new CloudBaseFrameworkError(`用户取消构建 ${signal}`, ERRORS.CANCEL_JOB)
      );
      process.exit(1);
    }

    process.on('SIGTERM', processSignalHandle);
    // ctrl+c
    process.on('SIGINT', processSignalHandle);
    // console window
    process.on('SIGHUP', processSignalHandle);

    globalErrorHandler = async (e: Error) => {
      const code = e instanceof CloudBaseFrameworkError && e.code;
      const message = `${code ? `[${code}] ` : ''} ${e.message}`;
      const failType =
        (code as string) in USER_ERRORS_MAP ? 'UserError' : 'SystemError';

      logger.error(message);
      logger.info('部署日志:', getLogFilePath());
      if (!this.isDeploy) {
        // 非部署情况不上报
        return;
      } else if (
        e instanceof CloudBaseFrameworkError &&
        e.code == ERRORS.DEPLOY_ERROR
      ) {
        // 部署失败不上报构建失败
        return;
      } else if (isReported) {
        // 避免多次上报
        return;
      } else {
        isReported = true;
        return this.lifeCycleManager.reportBuildResult(1, message, failType);
      }
    };
    this.pluginManager = new PluginManager(context);
    this.hooks = new Hooks(appConfig.hooks || {}, projectPath);
  }

  /**
   * 调用命令
   *
   * @param module
   * @param params
   */
  async run(module?: string, params?: CommandParams) {
    const logger = getLogger();
    logger.debug('run', module, params);
    await this.pluginManager.run(module, params?.runCommandKey);
  }

  /**
   * 编译应用
   *
   * @param module
   * @param params
   */
  async compile(module?: string, params?: any) {
    const logger = getLogger();
    logger.debug('compile', module, params);
    await this.hooks.callHook('preDeploy');
    await this._compile(module);
  }

  /**
   * 编译并部署应用
   * @param module
   * @param params
   */
  async deploy(module?: string, params?: any) {
    const logger = getLogger();
    logger.debug('deploy', module, params);
    await this.hooks.callHook('preDeploy');
    await this._compile(module);
    await this.samManager.install(this.ciId, async (extensionId) => {
      this.context.extensionId = extensionId;
      return this.lifeCycleManager.reportBuildResult(0);
    });
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
            case 'StaticStore':
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

  async createProjectVersion() {
    let isCloudBuild = !!process.env.CLOUDBASE_CIID;

    // 云端部署直接返回
    if (isCloudBuild) {
      return process.env.CLOUDBASE_CIID;
      // 本地部署也创建项目版本
    } else {
      const Parameters = this.transpileEnvironments(
        this.projectInfo?.environment
      );

      const Source = this.projectInfo?.Source || {
        Type: 'local',
        Url: '',
        Name: '',
        WorkDir: '',
      };

      // 兼容类型错误
      delete Source.Headers;

      // 旧的字段保持 JSON 格式，新字段使用字符串格式
      const data = await createAndDeployCloudBaseProject({
        Name: this.appConfig.name || '',
        Parameters,
        Source,
        RcJson: JSON.stringify(
          Object.assign({}, this.frameworkConfig.config, {
            framework: this.appConfig,
          })
        ),
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
    ).filter((resource) => (resource as any).Type === 'CloudBase::CloudBaseRun')
      .length;

    await this.hooks.callHook('postCompile');

    const samMeta = this.generateSamMeta();
    const hooksSAM = this.hooks.genSAM();
    const networkSections = this.genNetworkSAM(isHasContainer);
    const samSections = [...compileResult, hooksSAM, networkSections];
    this.samManager.generate(samMeta, JSON.parse(JSON.stringify(samSections)));
  }

  private genNetworkSAM(isHasContainer: boolean) {
    // 没有网络配置
    if (
      !this.appConfig.network ||
      !Object.keys(this.appConfig.network).length
    ) {
      return {};
    }
    // 没有vpcId，也没有容器
    if (!this.appConfig.network.uniqVpcId && !isHasContainer) {
      return {};
    }

    return {
      Resources: {
        Network: {
          Type: 'CloudBase::VPC',
          Properties: {
            Description: 'VPC 网络配置',
            UniqVpcId: this.appConfig.network.uniqVpcId,
            CloudBaseRun: this.appConfig.network.cloudBaseRun,
            Region: this.appConfig.network.region || '${TcbEnvRegion}',
          },
        },
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
