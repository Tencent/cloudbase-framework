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
import archiver from 'archiver';
import fs from 'fs';
import { Plugin, PluginServiceApi, Builder } from '@cloudbase/framework-core';
import { mkdirSync } from '@cloudbase/toolbox';
/**
 * 导出接口用于生成 JSON Schema 来进行智能提示
 */
export interface IFrameworkPluginFunctionInputs {
  /**
   * 函数根目录
   * @default functions
   */
  functionRootPath?: string;
  /**
   * 函数配置数组
   */
  functions?: ICloudFunction[];
  /**
   *
   * 服务路径配置
   *
   * 如
   *
   * ```json
   * {
   *   "hello-world": "/helloworld"
   * }
   * ```
   */
  servicePaths?: Record<string, string>;
}

export interface IFunctionTriggerOptions {
  functionName: string;
  triggers?: ICloudFunctionTrigger[];
  triggerName?: string;
  envId: string;
}

export interface ICloudFunctionTrigger {
  name: string;
  type: string;
  config: string;
}

export interface ICloudFunction {
  /**
   * 云函数名称，即为函数部署后的名称
   */
  name: string;
  /**
   * 函数处理方法名称，名称格式支持“文件名称.函数名称”形式
   * @default index.main
   */
  handler?: string;
  /**
   * 函数超时时间（1 - 60S）
   */
  timeout?: number;
  /**
   * 包含环境变量的键值对
   */
  envVariables?: Record<string, string>;
  /**
   * 运行时环境配置，可选值： `Nodejs8.9, Nodejs10.15 Php7, Java8, Go1`
   * @default Nodejs10.15
   */
  runtime?: 'Nodejs10.15' | 'Nodejs8.9' | 'Php7' | 'Java8' | 'Go1';
  /**
   * 函数运行时内存配置
   * @default 128
   */
  memory?: 128 | 256 | 512 | 1024 | 2048;
  /**
   * VPC
   */
  vpc?: IFunctionVPC;
  /**
   * 是否云端安装依赖，目前仅支持 Node.js
   */
  installDependency?: boolean;
  isWaitInstall?: boolean;
  /**
   * 函数产物路径，相对于函数根目录 functionRootPath，例如 Go 语言可指定二进制文件路径，Java 可以指定 jar 包文件地址
   */
  functionDistPath?: string;
  /**
   * 忽略的文件
   */
  ignore?: string[];
  /**
   * 安全规则，配置前先阅读文档 https://docs.cloudbase.net/cloud-function/security-rules.html
   *
   * @example { invoke: true }
   */
  aclRule?: Record<string, any>;

  /**
   * 代码保护密钥，传入此参数将保护代码，在控制台/IDE中无法看到代码明文
   * 格式为 36 位大小字母和数字
   * @length 36
   * @pattern ^[a-zA-Z0-9]$
   */
  codeSecret?: string;
}

export interface IFunctionVPC {
  /**
   * vpc 的id
   */
  vpcId: string;
  /**
   * 子网id
   */
  subnetId: string;
}

type ResolveInputs = IFrameworkPluginFunctionInputs & {
  functionRootPath: string;
  functions: ICloudFunction[];
  servicePaths: {};
};

type AclTag = 'READONLY' | 'PRIVATE' | 'ADMINWRITE' | 'ADMINONLY' | 'CUSTOM';

class FunctionPlugin extends Plugin {
  protected resolvedInputs: ResolveInputs;
  protected buildOutput: any;
  protected functions: ICloudFunction[];
  protected functionRootPath: string;
  protected builder: FunctionBuilder;
  protected outputs: Record<string, any>;

  constructor(
    public name: string,
    public api: PluginServiceApi,
    public inputs: IFrameworkPluginFunctionInputs
  ) {
    super(name, api, inputs);

    const config = this.api.projectConfig;

    const DEFAULT_INPUTS = {
      functionRootPath: config?.functionRoot || 'cloudfunctions',
      functions: config?.functions,
      servicePaths: {},
    };

    this.resolvedInputs = resolveInputs(this.inputs, DEFAULT_INPUTS);

    this.resolvedInputs.functions = this.resolvedInputs.functions.map(
      (func: any) => {
        return Object.assign(
          {},
          {
            runtime: 'Nodejs10.15',
            installDependency: true,
            handler: 'index.main',
          },
          func
        );
      }
    );

    this.functions = this.resolvedInputs.functions;
    this.functionRootPath = path.isAbsolute(
      this.resolvedInputs.functionRootPath
    )
      ? this.resolvedInputs.functionRootPath
      : path.join(this.api.projectPath, this.resolvedInputs.functionRootPath);

    this.builder = new FunctionBuilder({
      projectPath: this.api.projectPath,
    });
    this.outputs = {};
  }

  /**
   * 初始化
   */
  async init() {
    this.api.logger.debug('FunctionPlugin: init', this.resolvedInputs);
  }

  async compile() {
    this.api.logger.debug('FunctionPlugin: compile', this.resolvedInputs);

    const builderOptions = this.functions.map((func) => {
      let fileName: string = func.name;
      let localFunctionPath: string;

      if (func.runtime?.includes('Java')) {
        fileName = func.name + '.jar';
      }

      if (func.functionDistPath) {
        localFunctionPath = path.join(
          this.functionRootPath,
          func.functionDistPath
        );
      } else {
        localFunctionPath = path.join(this.functionRootPath, fileName);
      }

      if (func.runtime?.includes('Node') && func.installDependency) {
        const packageJSONExists = fs.existsSync(
          path.join(localFunctionPath, 'package.json')
        );

        if (!packageJSONExists) {
          this.api.logger.warn(
            `函数 ${func.name} 设置了云端安装依赖，但函数代码根目录下未提供 package.json`
          );
          func.installDependency = false;
        }
      }

      const zipName = `${func.name + Date.now()}.zip`;
      return {
        name: func.name,
        localPath: localFunctionPath,
        zipFileName: zipName,
        ignore: func.installDependency
          ? ['node_modules/**/*', 'node_modules', ...(func.ignore || [])]
          : [...(func.ignore || [])],
      };
    });

    const buildResult = await this.builder.build(builderOptions);

    const codeUris = await this.api.samManager.uploadFile(
      buildResult.functions.map((func) => {
        return {
          fileType: 'FUNCTION',
          fileName: `${func.name}.zip`,
          filePath: func.source,
        };
      })
    );

    buildResult.functions.forEach((func, index) => {
      this.outputs[func.name] = codeUris[index];
    });

    let a: Record<string, any> = {};

    return {
      EntryPoint: Object.values(this.resolvedInputs.servicePaths).map(
        (servicePath) => {
          return {
            Label: '服务地址',
            EntryType: 'HttpService',
            HttpEntryPath: servicePath,
          };
        }
      ),
      Resources: this.functions.reduce((resources, func) => {
        resources[this.toConstantCase(func.name)] = this.functionConfigToSAM(
          func
        );
        return resources;
      }, a),
    };
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
    this.api.logger.debug('FunctionPlugin: build', this.resolvedInputs);
  }

  /**
   * 部署
   */
  async deploy() {
    this.api.logger.debug(
      'FunctionPlugin: deploy',
      this.resolvedInputs,
      this.buildOutput
    );

    // 批量部署云函数
    await Promise.all(
      this.functions.map(async (func: any) => {
        this.api.logger.info(
          `${this.api.emoji('🚀')} [${func.name}] 云函数部署成功`
        );
      })
    );

    this.api.logger.info(`${this.api.emoji('🚀')} 云函数部署成功`);
  }

  functionConfigToSAM(functionConfig: ICloudFunction) {
    const networkConfig = this.api.appConfig.network;

    return Object.assign({
      Type: 'CloudBase::Function',
      Properties: Object.assign(
        {
          Handler: functionConfig.handler || 'index.main',
          Description:
            '无服务器执行环境，帮助您在无需购买和管理服务器的情况下运行代码',
          Runtime: functionConfig.runtime,
          FunctionName: functionConfig.name,
          MemorySize: functionConfig.memory || 128,
          Timeout: functionConfig.timeout || 5,
          Environment: {
            Variables: functionConfig.envVariables,
          },
          VpcConfig: {
            VpcId:
              functionConfig.vpc?.vpcId || networkConfig?.uniqVpcId
                ? '${Outputs.Network.Properties.InstanceId}'
                : undefined,
            SubnetId: functionConfig.vpc?.subnetId,
          },
          HttpPath: this.resolvedInputs.servicePaths[functionConfig.name],
          InstallDependency:
            functionConfig.runtime?.includes('Node') &&
            'installDependency' in functionConfig
              ? functionConfig.installDependency
              : false,
          CodeUri: this.outputs[functionConfig.name]?.codeUri,
          CodeSecret: !!functionConfig.codeSecret,
          Role: 'TCB_QcsRole',
        },
        this.api.bumpVersion && {
          NewVersion: true,
        },
        this.api.versionRemark && {
          VersionRemark: this.api.versionRemark,
        },
        functionConfig.aclRule && {
          AclTag: 'CUSTOM' as AclTag,
          AclRule: this.genAclRule(functionConfig),
        }
      ),
    });
  }

  toConstantCase(name: string) {
    let result = '';
    let lastIsDivide = true;
    for (let letter of name) {
      if (letter === '-' || letter === '_') {
        lastIsDivide = true;
      } else if (lastIsDivide) {
        result += letter.toUpperCase();
        lastIsDivide = false;
      } else {
        result += letter.toLowerCase();
        lastIsDivide = false;
      }
    }

    return result;
  }

  genAclRule(functionConfig: ICloudFunction): string {
    const aclRule: Record<string, any> = {};
    aclRule[functionConfig.name] = functionConfig.aclRule;

    return JSON.stringify(aclRule);
  }
}

function resolveInputs(inputs: any, defaultInputs: any) {
  return Object.assign({}, defaultInputs, inputs);
}

interface FunctionBuilderBuildOptions {
  name: string;
  localPath: string;
  zipFileName: string;
  ignore: string[];
}

interface FunctionBuilderOptions {
  /**
   * 项目根目录的绝对路径
   */
  projectPath: string;
}

export class FunctionBuilder extends Builder {
  constructor(options: FunctionBuilderOptions) {
    super({
      type: 'function',
      ...options,
    });
  }

  async build(options: FunctionBuilderBuildOptions[]) {
    const functions = await Promise.all(
      options.map(async (option) => {
        const localZipPath = path.join(this.distDir, option.zipFileName);

        if (!fs.existsSync(this.distDir)) {
          mkdirSync(this.distDir);
        }

        if (!fs.existsSync(option.localPath)) {
          throw new Error(
            `函数目录或者文件 ${path.basename(option.localPath)} 不存在`
          );
        }

        const fileStats = fs.statSync(option.localPath);

        if (fileStats.isFile()) {
          this.logger.debug('option.localPath', option.localPath, localZipPath);
          await this.zipFile(option.localPath, localZipPath);
        } else if (fileStats.isDirectory()) {
          this.logger.debug('option.localPath', option.localPath, localZipPath);
          await this.zipDir(option.localPath, localZipPath, option.ignore);
        }

        return {
          name: option.name,
          options: {},
          source: localZipPath,
          entry: option.zipFileName,
        };
      })
    );

    return {
      functions,
    };
  }

  async zipFile(src: string, dest: string) {
    return new Promise((resolve, reject) => {
      // create a file to stream archive data to.
      var output = fs.createWriteStream(dest);
      var archive = archiver('zip', {
        zlib: { level: 9 }, // Sets the compression level.
      });
      output.on('close', () => {
        resolve();
      });
      archive.on('error', reject);
      archive.file(src, {
        name: path.basename(src),
      });
      archive.pipe(output);
      archive.finalize();
    });
  }

  async zipDir(src: string, dest: string, ignore?: string[]) {
    return new Promise((resolve, reject) => {
      // create a file to stream archive data to.
      var output = fs.createWriteStream(dest);
      var archive = archiver('zip', {
        zlib: { level: 9 }, // Sets the compression level.
      });
      output.on('close', () => {
        resolve();
      });
      archive.on('error', reject);
      archive.glob(
        '**/*',
        {
          cwd: src,
          ignore: ignore || [],
          dot: true,
        },
        {}
      );
      archive.pipe(output);
      archive.finalize();
    });
  }
}

export const plugin = FunctionPlugin;
