import path from "path";
import archiver from "archiver";
import fs from "fs";
import { Plugin, PluginServiceApi, Builder } from "@cloudbase/framework-core";

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
  envVariables?: Record<string, string | number | boolean>;
  /**
   * 运行时环境配置，可选值： `Nodejs8.9, Nodejs10.15 Php7, Java8`
   * @default Nodejs10.15
   */
  runtime?: string;
  /**
   * VPC
   */
  vpc?: IFunctionVPC;
  /**
   * 是否云端安装依赖，目前仅支持 Node.js
   */
  installDependency?: boolean;
  isWaitInstall?: boolean;
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
      functionRootPath: config?.functionRoot || "cloudfunctions",
      functions: config?.functions,
      servicePaths: {},
    };

    this.resolvedInputs = resolveInputs(this.inputs, DEFAULT_INPUTS);

    this.resolvedInputs.functions = this.resolvedInputs.functions.map(
      (func: any) => {
        return Object.assign(
          {},
          {
            runtime: "Nodejs10.15",
            installDependency: true,
            handler: "index.main",
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
    this.api.logger.debug("FunctionPlugin: init", this.resolvedInputs);
  }

  async compile() {
    this.api.logger.debug("FunctionPlugin: compile", this.resolvedInputs);

    const builderOptions = this.functions.map((func) => {
      const localFunctionPath = path.join(this.functionRootPath, func.name);
      const zipName = `${func.name + Date.now()}.zip`;
      return {
        name: func.name,
        localPath: localFunctionPath,
        zipfileName: zipName,
      };
    });

    const buildResult = await this.builder.build(builderOptions);

    const codeUris = await this.api.samManager.uploadFile(
      buildResult.functions.map((func) => {
        return {
          fileType: "FUNCTION",
          fileName: `${func.name}.zip`,
          filePath: func.source,
        };
      })
    );

    buildResult.functions.forEach((func, index) => {
      this.outputs[func.name] = codeUris[index];
    });

    return {
      EntryPoint: Object.values(this.resolvedInputs.servicePaths).map(
        (servicePath) => {
          return {
            Label: "服务地址",
            EntryType: "HttpService",
            HttpEntryPath: servicePath,
          };
        }
      ),
      Resources: this.functions.reduce((resources, func) => {
        resources[this.toConstantCase(func.name)] = this.functionConfigToSAM(
          func
        );
        return resources;
      }, {} as Record<string, any>),
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
    this.api.logger.debug("FunctionPlugin: build", this.resolvedInputs);
  }

  /**
   * 部署
   */
  async deploy() {
    this.api.logger.debug(
      "FunctionPlugin: deploy",
      this.resolvedInputs,
      this.buildOutput
    );

    // 批量部署云函数
    await Promise.all(
      this.functions.map(async (func: any) => {
        this.api.logger.info(
          `${this.api.emoji("🚀")} [${func.name}] 云函数部署成功`
        );
      })
    );

    // 批量处理云接入
    await Promise.all(
      Object.entries(this.resolvedInputs.servicePaths).map(
        async ([, servicePath]) => {
          let url = `https://${this.api.envId}.service.tcloudbase.com${servicePath}`;
          if (url[url.length - 1] !== "/") {
            url = url + "/";
          }
          url = this.api.genClickableLink(url);
          this.api.logger.info(
            `${this.api.emoji("🚀")} 云接入服务发布成功，访问地址: ${url}`
          );
        }
      )
    );

    this.api.logger.info(`${this.api.emoji("🚀")} 云函数部署成功`);
  }

  functionConfigToSAM(functionConfig: any) {
    return {
      Type: "CloudBase::Function",
      Properties: {
        Handler: functionConfig.handler || "index.main",
        Description: "CloudBase Framework 部署的云函数",
        Runtime: functionConfig.runtime,
        FunctionName: functionConfig.name,
        MemorySize: functionConfig.memory || 128,
        Timeout: functionConfig.timeout || 5,
        Environment: functionConfig.envVariables,
        VpcConfig: functionConfig.vpc,
        HttpPath: this.resolvedInputs.servicePaths[functionConfig.name],
        InstallDependency:
          "installDependency" in functionConfig
            ? functionConfig.installDependency
            : true,
        CodeUri:
          this.outputs[functionConfig.name] &&
          this.outputs[functionConfig.name].codeUri,
        Role: "TCB_QcsRole",
      },
    };
  }

  toConstantCase(name: string) {
    let result = "";
    let lastIsDivide = true;
    for (let i = 0; i < name.length; i++) {
      let letter = name[i];
      if (letter === "-" || letter === "_") {
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
}

function resolveInputs(inputs: any, defaultInputs: any) {
  return Object.assign({}, defaultInputs, inputs);
}

interface FunctionBuilderBuildOptions {
  name: string;
  localPath: string;
  zipfileName: string;
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
      type: "function",
      ...options,
    });
  }
  async build(options: FunctionBuilderBuildOptions[]) {
    return {
      functions: options.map((option) => {
        const localZipPath = path.join(this.distDir, option.zipfileName);

        if (!fs.existsSync(this.distDir)) {
          fs.mkdirSync(this.distDir, { recursive: true });
        }

        this.zipDir(option.localPath, localZipPath);

        return {
          name: option.name,
          options: {},
          source: localZipPath,
          entry: option.zipfileName,
        };
      }),
    };
  }

  async zipDir(src: string, dest: string) {
    return new Promise((resolve, reject) => {
      // create a file to stream archive data to.
      var output = fs.createWriteStream(dest);
      var archive = archiver("zip", {
        zlib: { level: 9 }, // Sets the compression level.
      });
      output.on("close", resolve);
      archive.on("error", reject);
      archive.directory(src, false);
      archive.pipe(output);
      archive.finalize();
    });
  }
}

export const plugin = FunctionPlugin;
