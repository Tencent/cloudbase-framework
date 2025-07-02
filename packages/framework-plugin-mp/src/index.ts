/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2025 Tencent.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import fs from 'fs';
import path from 'path';
import url from 'url';

import { exec } from 'child_process';
import { promisify } from 'util';
import { Plugin, PluginServiceApi } from '@cloudbase/framework-core';
import * as CI from 'miniprogram-ci';

/**
 * 导出接口用于生成 JSON Schema 来进行智能提示
 */
interface IFrameworkPluginMiniProgramInputs {
  /**
   * 小程序应用的 appid
   */
  appid: string;
  /**
   * 小程序应用的部署私钥的本地相对路径
   *
   * @default "./private.key"
   */
  privateKeyPath?: string;
  /**
   * 小程序应用的部署私钥（需要经过base64编码）
   */
  privateKey?: string;
  /**
   * 小程序项目的本地相对路径
   *
   * @default "./"
   */
  localPath: string;
  /**
   * 小程序应用部署时忽略的文件路径，支持通配符
   *
   * @default ["node_modules\/**\/*"]
   */
  ignores?: string[];
  /**
   * 小程序应用的部署模式
   *
   * @default "preview"
   */
  deployMode?: 'preview' | 'upload';
  /**
   * 预览代码的选项
   */
  previewOptions?: IMiniProgramPreviewOptions;
  /**
   * 上传代码的选项
   */
  uploadOptions?: IMiniProgramUploadOptions;
  /**
   * 自定义命令
   *
   * @default { build: "cd ./miniprogram && npm install" }
   */
  commands?: Record<string, string>;
}

interface IMiniProgramUploadOptions {
  /**
   * 小程序应用上传的版本号
   */
  version?: string;
  /**
   * 小程序应用的版本描述
   *
   * @default "CloudBase Framework 一键上传"
   */
  desc?: string;
  /**
   * 小程序应用的编译设置
   */
  setting?: IMiniProgramBuildSetting;
}

interface IMiniProgramPreviewOptions {
  /**
   * 小程序的版本描述
   *
   * @default "CloudBase Framework 一键预览"
   */
  desc?: string;
  /**
   * 小程序应用的编译设置
   */
  setting?: IMiniProgramBuildSetting;
  /**
   * 生成的预览二维码保存在本地的路径
   */
  qrcodeOutputPath?: string;
  /**
   * 小程序应用的预览页面地址
   *
   * @default pages/index/index
   */
  pagePath?: string;
  /**
   * 小程序应用的预览页面参数
   *
   * @default
   */
  searchQuery?: string;
  /**
   * 小程序应用的预览页面场景值
   *
   * @default 1011
   */
  scene?: number;
}

interface IMiniProgramBuildSetting {
  /**
   * 编译设置 - es6 转 es5
   *
   * @default true
   */
  es6?: boolean;
  /**
   * 编译设置 - 压缩代码
   *
   * @default true
   */
  minify?: boolean;
  /**
   * 编译设置 - 开启代码保护
   *
   * @default true
   */
  codeProtect?: boolean;
}

interface IMiniProgramBuildOutput {
  /**
   * 预览版二维码链接
   */
  link?: string;
  /**
   * 体验版小程序版本号
   */
  version?: string;
}

const SUPPORT_DEPLOY_MODE = ['upload', 'preview'];
const MP_CONFIG_FILENAME = 'project.config.json';
const NOT_NPM_ERROR = '__NO_NODE_MODULES__ NPM packages not found';

class MiniProgramsPlugin extends Plugin {
  protected resolvedInputs: IFrameworkPluginMiniProgramInputs;
  protected buildOutput: IMiniProgramBuildOutput;

  constructor(
    public name: string,
    public api: PluginServiceApi,
    public inputs: IFrameworkPluginMiniProgramInputs
  ) {
    super(name, api, inputs);

    const DEFAULT_INPUTS = {
      localPath: './',
      deployMode: 'preview',
      ignores: ['node_modules/**/*'],
      commands: {
      }
    };
    this.resolvedInputs = resolveInputs(this.inputs, DEFAULT_INPUTS);
    this.buildOutput = {};
  }

  /**
   * 初始化
   */
  async init() {
    this.api.logger.debug('MiniProgramPlugin: init', this.resolvedInputs);
  }

  _initCI() {
    const { projectPath } = this.api;
    const {
      appid,
      privateKeyPath,
      privateKey,
      localPath,
      deployMode,
    } = this.resolvedInputs;

    if (!appid) {
      throw new Error(
        '小程序 appid 不能为空，请在 cloudbaserc.json 中指明 appid. 小程序 appid 一般可以在 project.config.json 中找到'
      );
    }

    // 存在私钥则直接用私钥
    // 不存在私钥就尝试从私有路径中获取
    if (!privateKey) {
      if (
        !privateKeyPath ||
        !fs.existsSync(path.resolve(projectPath, privateKeyPath))
      ) {
        throw new Error(
          '找不到小程序的部署私钥，请在 cloudbaserc.json 指明私钥文件路径 privateKeyPath. 小程序的部署私钥可在微信公众平台上登录后获取'
        );
      }
    } else {
      const keyPath = path.resolve(projectPath, './private.key');
      const key = Buffer.from(privateKey, 'base64');
      fs.writeFileSync(keyPath, key.toString());
      this.resolvedInputs.privateKeyPath = keyPath;
    }

    if (deployMode && !SUPPORT_DEPLOY_MODE.includes(deployMode)) {
      throw new Error(
        `CloudBase Framework: 不支持的小程序部署模式 '${deployMode}'`
      );
    }

    if (
      !fs.existsSync(path.resolve(projectPath, localPath, MP_CONFIG_FILENAME))
    ) {
      throw new Error(
        '项目内找不到小程序配置文件 project.config.json，请在 cloudbaserc.json 中指明小程序应用的项目路径 localPath.'
      );
    }
  }

  /**
   * 执行本地命令
   */
  async run() {}

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
    this.api.logger.debug('MiniProgramPlugin: build', this.resolvedInputs);
    const { projectPath } = this.api;
    const {
      localPath,
    } = this.resolvedInputs;

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const projectConfig = require(path.join(projectPath, localPath, MP_CONFIG_FILENAME));

    const miniprogramRoot = projectConfig.miniprogramRoot || 'miniprogram'

    const { build: buildCommand, install: installCommand } =
      this.resolvedInputs?.commands || {};

    /**
     * 安装依赖
     */
    if (installCommand) {
      this.api.logger.info(installCommand);
      await promisify(exec)(installCommand);
    } else {
      try {
        if (fs.statSync(path.join(projectPath, localPath, miniprogramRoot, 'package.json'))) {
          this.api.logger.info('use default npm install commands');
          await promisify(exec)('npm install --prefer-offline --no-audit --progress=false', {
            cwd: path.join(path.join(projectPath, localPath, miniprogramRoot))
          });
        }
      } catch (e) {}

    }
    /**
     * 构建
     */
    if (buildCommand) {
      this.api.logger.info(buildCommand);
      await promisify(exec)(buildCommand);
    }

    return;
  }

  /**
   * 生成SAM文件
   */
  async compile() {
    /**
     * todo: 小程序部署应该迁移到SAM平台
     */

    /**
     * 初始化CI
     */
    this._initCI();

    /**
     * 编译小程序NPM
     */
    await this._ciPackNpm();

    /**
     * 部署小程序
     */
    switch (this.resolvedInputs?.deployMode) {
      case 'upload': {
        this.buildOutput = await this._ciUpload();
        break;
      }
      case 'preview': {
        this.buildOutput = await this._ciPreview();
        break;
      }
      default: {
        break;
      }
    }

    return {};
  }

  /**
   * 部署
   */
  async deploy() {
    this.api.logger.debug(
      'MiniProgramPlugin: deploy',
      this.resolvedInputs,
      this.buildOutput
    );

    const { link, version } = this.buildOutput || {};

    if (link) {
      this.api.logger.info(
        `${this.api.emoji(
          '🚀'
        )} 小程序（预览版）部署成功，预览二维码地址：${link}`
      );
    } else if (version) {
      this.api.logger.info(
        `${this.api.emoji(
          '🚀'
        )} 小程序（体验版v${version}）上传成功，请在小程序管理后台将其设置为体验版本`
      );
    } else {
      throw new Error(`invalid buildOutput: ${this.buildOutput}`);
    }
  }

  /**
   * 小程序-上传
   */
  async _ciUpload(): Promise<IMiniProgramBuildOutput> {
    // 需要暂时关掉 stdout, 避免 miniprogram-ci 的内容打印到控制台
    !process.env.CLOUDBASE_CIID && pauseConsoleOutput();
    const {
      version = '1.0.0',
      desc = 'CloudBase Framework 一键上传',
      setting,
    } = this.resolvedInputs.uploadOptions || {};
    const result = await CI.upload({
      project: this._ciProject,
      version,
      desc,
      setting,
    }).catch((err) => {
      return err;
    });
    // this.api.runtime.isLocal() && this.api.console.resume();
    !process.env.CLOUDBASE_CIID && resumeConsoleOutput();

    if (result?.subPackageInfo) {
      return {
        version,
      };
    } else {
      throw new Error(`小程序（体验版）部署失败 ${result}`);
    }
  }

  /**
   * 小程序-预览
   */
  async _ciPreview(): Promise<IMiniProgramBuildOutput> {
    // 需要暂时关掉 stdout, 避免 miniprogram-ci 的内容打印到控制台
    !process.env.CLOUDBASE_CIID && pauseConsoleOutput();
    const {
      desc = 'CloudBase Framework 一键预览',
      setting,
      qrcodeOutputPath = './qrcode.jpg',
      pagePath = 'pages/index/index',
      searchQuery = '',
      scene = 1011,
    } = this.resolvedInputs.previewOptions || {};
    const result = await CI.preview({
      project: this._ciProject,
      version: '0.0.1',
      desc,
      setting,
      qrcodeFormat: 'image',
      qrcodeOutputDest: path.resolve(this.api.projectPath, qrcodeOutputPath),
      pagePath,
      searchQuery,
      scene,
    }).catch((err) => {
      return err;
    });
    !process.env.CLOUDBASE_CIID && resumeConsoleOutput();

    if (result?.subPackageInfo) {
      const link = this.api.genClickableLink(
        url.format({
          protocol: 'file:',
          host: path.resolve(this.api.projectPath, qrcodeOutputPath),
        })
      );
      return {
        link,
      };
    } else {
      throw new Error(`小程序（预览版）部署失败 ${result}`);
    }
  }

  /**
   * 小程序-编译NPM
   */
  async _ciPackNpm() {
    // 需要暂时关掉 stdout, 避免 miniprogram-ci 的内容打印到控制台
    !process.env.CLOUDBASE_CIID && pauseConsoleOutput();
    const result = await CI.packNpm(this._ciProject, {
      reporter: (infos) => {
        console.log(infos);
      },
    }).catch((err) => {
      return err;
    });
    !process.env.CLOUDBASE_CIID && resumeConsoleOutput();

    if (result instanceof Error && !result.message.startsWith(NOT_NPM_ERROR)) {
      throw new Error(`小程序 NPM 构建失败 ${result}`);
    }
  }

  get _ciProject() {
    const { projectPath } = this.api;
    const { appid, localPath, privateKeyPath, ignores } = this.resolvedInputs;

    return new CI.Project({
      appid,
      type: 'miniProgram',
      projectPath: path.resolve(projectPath, localPath),
      privateKeyPath: path.resolve(projectPath, privateKeyPath || ''),
      ignores,
    });
  }
}

function resolveInputs(inputs: any, defaultInputs: any) {
  return Object.assign({}, defaultInputs, inputs);
}

const originalStdoutWrite = process.stdout.write.bind(process.stdout);
const originalStderrWrite = process.stderr.write.bind(process.stderr);
let previousStdoutWrite = process.stdout.write.bind(process.stdout);
let previousStderrWrite = process.stderr.write.bind(process.stderr);
// 暂停控制台输出
function pauseConsoleOutput() {
  previousStdoutWrite = process.stdout.write.bind(process.stdout);
  process.stdout.write = () => {
    return true;
  };
  previousStderrWrite = process.stderr.write.bind(process.stderr);
  process.stderr.write = () => {
    return true;
  };
}
// 恢复控制台输出
function resumeConsoleOutput(original = false) {
  if (original) {
    process.stdout.write = originalStdoutWrite;
    process.stderr.write = originalStderrWrite;
  } else {
    process.stdout.write = previousStdoutWrite;
    process.stderr.write = previousStderrWrite;
  }
}

export const plugin = MiniProgramsPlugin;
