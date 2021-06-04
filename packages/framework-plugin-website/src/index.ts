/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import path from 'path';
import fs from 'fs';
import os from 'os';
import merge from 'lodash.merge';

import { Plugin, PluginServiceApi } from '@cloudbase/framework-core';
import { BuildResult } from '@cloudbase/framework-core/src/types';
import { StaticBuilder } from '@cloudbase/static-builder';
import { ZipBuilder } from './zip-builder';
import { getRegion } from '@cloudbase/toolbox';

const DEFAULT_INPUTS = {
  outputPath: 'dist',
  cloudPath: '/',
  ignore: ['.git', '.github', 'node_modules', 'cloudbaserc.js'],
  commands: {
    install: 'npm install --prefer-offline --no-audit --progress=false',
  },
};

enum PAYMODE {
  POSTPAID = 'postpaid',
  PREPAYMENT = 'prepayment',
}

enum ENV_CHANNEL {
  LOWCODE = 'low_code',
}

/**
 * 导出接口用于生成 JSON Schema 来进行智能提示
 */
export interface IFrameworkPluginWebsiteInputs {
  /**
   * 安装命令，如`npm install`，没有可不传
   *
   * @default npm install --prefer-offline --no-audit --progress=false
   * @deprecated 此配置将被废弃，请使用新的配置 commands.install 代替
   */
  installCommand?: string;
  /**
   * 构建命令，如`npm run build`，没有可不传
   *
   * @deprecated 此配置将被废弃，请使用新的配置 commands.build 代替
   */
  buildCommand?: string;
  /**
   * 网站静态文件的路径
   *
   * @default dist
   */
  outputPath?: string;
  /**
   * 静态资源部署到云开发环境的路径，默认为根目录。
   *
   * @default /
   */
  cloudPath?: string;
  /**
   * 静态资源部署时忽略的文件路径，支持通配符
   *
   * @default [".git", ".github", "node_modules", "cloudbaserc.js"]
   */
  ignore?: string[];
  /**
   * 环境变量键值对，会被注入到静态网站根目录下的 `/cloudbaseenv.json`
   *
   */
  envVariables?: Record<string, string>;
  /**
   * 自定义命令
   *
   * @default { build: "npm run build" }
   */
  commands?: Record<string, string>;
  /**
   * Http 访问服务触发路径，没有可不填
   */
  httpPath?: string
}

type ResolvedInputs = typeof DEFAULT_INPUTS & IFrameworkPluginWebsiteInputs;

class WebsitePlugin extends Plugin {
  protected builder: StaticBuilder;
  protected zipBuilder: ZipBuilder;
  protected resolvedInputs: ResolvedInputs;
  protected buildOutput: BuildResult;
  protected env?: {
    PayMode: PAYMODE;
    EnvChannel: string;
  };
  // 静态托管信息
  protected website: any;

  constructor(
    public name: string,
    public api: PluginServiceApi,
    public inputs: IFrameworkPluginWebsiteInputs
  ) {
    super(name, api, inputs);

    this.resolvedInputs = resolveInputs(this.inputs);

    this.builder = new StaticBuilder({
      projectPath: this.api.projectPath,
      copyRoot: path.join(this.api.projectPath, this.resolvedInputs.outputPath),
    });
    this.zipBuilder = new ZipBuilder({
      projectPath: this.api.projectPath,
    });
    this.buildOutput = {};
  }

  /**
   * 初始化
   */
  async init() {
    this.api.logger.debug('WebsitePlugin: init', this.resolvedInputs);
    this.api.logger.info(
      'Website 插件会自动开启静态网页托管能力，需要当前环境为 [按量计费] 模式'
    );
    this.api.logger.info(
      `Website 插件会部署应用资源到当前静态托管的 ${this.resolvedInputs.cloudPath} 目录下`
    );
    if (this.resolvedInputs.httpPath) {
      this.api.logger.info(
        `Website 插件会配置触发路径为 ${this.resolvedInputs.httpPath} 的HTTP访问服务到静态托管`
      );
    }
    await Promise.all([this.ensurePostPay(), this.fetchHostingInfo()]);
  }

  /**
   * 编译为 SAM 模板
   */
  async compile() {
    const uploadResults = await this.upload();
    this.api.logger.debug('website uploadResults', uploadResults);
    const [website, staticConfig] = uploadResults as any;

    return {
      EnvType: this.env?.PayMode === PAYMODE.PREPAYMENT ? 'PrePay' : 'PostPay',
      Resources: Object.assign(
        {},
        this.getStaticResourceSam(
          'Website',
          '为开发者提供静态网页托管的能力，包括HTML、CSS、JavaScript、字体等常见资源。',
          website.codeUri,
          website.cloudPath
        ),
        this.getStaticResourceSam(
          'ConfigEnv',
          '配置文件',
          staticConfig.codeUri,
          staticConfig.cloudPath
        ),
      ),
      EntryPoint: [
        {
          Label: '网站入口',
          EntryType: 'StaticStore',
          HttpEntryPath: this.resolvedInputs.cloudPath,
        },
      ],
    };
  }

  getStaticResourceSam(
    name: string,
    description: string,
    codeUri: string,
    deployPath: string
  ) {
    const httpPathConfig = this.resolvedInputs.httpPath && name === 'Website' ? { HttpPath: this.resolvedInputs.httpPath } : {}
    return {
      [name]: {
        Type: 'CloudBase::StaticStore',
        Properties: {
          Description:
            description ||
            '为开发者提供静态网页托管的能力，静态资源（HTML、CSS、JavaScript、字体等）的分发由对象存储 COS 和拥有多个边缘网点的 CDN 提供支持',
          CodeUri: codeUri,
          DeployPath: deployPath,
          ...httpPathConfig
        },
      },
    };
  }

  async upload() {
    const deployContent = [
      ...(this.buildOutput.static || []),
      ...(this.buildOutput.staticConfig || []),
    ];

    let zipFiles = (
      await this.zipBuilder.build(
        deployContent.map((item: any, index: any) => {
          return {
            name: item.name,
            localPath: item.src,
            zipFileName: `static-${index}.zip`,
            ignore: this.resolvedInputs.ignore,
          };
        })
      )
    ).zipFiles;

    this.api.logger.debug('website zipFiles', zipFiles);

    return Promise.all(
      deployContent.map(async (item, index) => {
        let zipFile = zipFiles[index];
        let codeUris = (await this.api.samManager.uploadFile([
          {
            fileType: 'STATIC',
            fileName: zipFile.entry,
            filePath: zipFile.source,
          },
        ])) as any;

        return Object.assign({}, item, {
          codeUri: codeUris[0].codeUri,
        });
      })
    );
  }

  /**
   * 删除资源
   */
  async remove() {}

  /**
   * 生成代码
   */
  async genCode() {}

  /**
   * 构建
   */
  async build() {
    // cloudPath 会影响 publicPath 和 baseRoute 等配置，需要处理
    this.api.logger.debug('WebsitePlugin: build', this.resolvedInputs);

    this.resolvedInputs.envVariables = Object.assign(
      {
        TCB_SERVICE_DOMAIN: await this.fetchServiceDomain(),
        TCB_ENV_ID: this.api.envId,
        TCB_REGION:
          process.env.CLOUDBASE_TCB_CLOUDAPI_REGION || (await getRegion()),
      },
      this.resolvedInputs.envVariables
    );

    await this.installPackage();

    const {
      cloudPath,
      buildCommand,
      envVariables,
      commands,
    } = this.resolvedInputs;

    const command = buildCommand || commands?.build;
    if (command) {
      this.api.logger.info('running', command);
      await this.api.spawnPromise(command, [], {
        env: Object.assign({}, process.env, envVariables),
      });
    }

    const includes = [
      '**',
      ...this.resolvedInputs.ignore.map((ignore) => `!${ignore}`),
    ];
    this.buildOutput = await this.builder.build(includes, {
      path: cloudPath,
      domain: this?.website?.cdnDomain,
      config: envVariables,
    });
  }

  /**
   * 部署
   */
  async deploy() {
    this.api.logger.debug(
      'WebsitePlugin: deploy',
      this.resolvedInputs,
      this.buildOutput
    );
    this.api.logger.info(`${this.api.emoji('🚀')} 网站部署成功`);
    await this.zipBuilder.clean();
    await this.builder.clean();
  }

  /**
   * 执行本地命令
   */
  async run(params: { runCommandKey: string }) {
    this.api.logger.debug(`WebsitePlugin: run ${params?.runCommandKey}`);

    const { commands, envVariables } = this.resolvedInputs;
    const command = commands[params?.runCommandKey];

    if (!command) return;

    this.api.logger.info('running', command);

    return this.api.spawnPromise(command, [], {
      env: Object.assign({}, process.env, envVariables),
    });
  }

  /**
   * 安装依赖
   */
  async installPackage() {
    const { installCommand, commands, envVariables } = this.resolvedInputs;
    const command = installCommand || commands?.install;
    try {
      if (fs.statSync('package.json')) {
        this.api.logger.info('running', command);
        return this.api.spawnPromise(command, [], {
          env: Object.assign({}, process.env, envVariables),
        });
      }
    } catch (e) {}
  }

  /**
   * 确保开启了按量付费
   */
  async ensurePostPay() {
    const res = await this.api.cloudApi.tcbService.request('DescribeEnvs');

    let env = res?.EnvList?.[0];

    if (!env) {
      throw new Error(`当前账号下不存在 ${this.api.envId} 环境`);
    }

    if (
      env.PayMode !== PAYMODE.POSTPAID &&
      env.EnvChannel !== ENV_CHANNEL.LOWCODE
    ) {
      throw new Error(
        '网站托管当前只能部署到按量付费的环境下，请先在控制台切换计费方式'
      );
    }
    this.env = env;
  }

  /**
   * 查询静态托管信息
   */
  async fetchHostingInfo(): Promise<any> {
    const Hosting = this.api.resourceProviders?.hosting;
    const envId = this.api.envId;

    if (!Hosting) {
      return;
    }

    let website;

    try {
      const hostingRes = await Hosting.getHostingInfo({ envId });

      if (hostingRes.data.length) {
        website = hostingRes.data[0];
      }
    } catch (e) {
      this.api.logger.debug(e);
    }

    this.website = website;

    return website;
  }

  async fetchServiceDomain() {
    const serviceInfo = await this.api.cloudApi.tcbUinService.request(
      'DescribeCloudBaseGWService',
      {
        ServiceId: this.api.envId,
        EnableRegion: true,
      }
    );
    return serviceInfo.DefaultDomain;
  }
}

function resolveInputs(inputs: any) {
  return merge({}, DEFAULT_INPUTS, inputs);
}

export const plugin = WebsitePlugin;
