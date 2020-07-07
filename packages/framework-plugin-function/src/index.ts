import path from "path";
import archiver from "archiver";
import fs from "fs";
import { Plugin, PluginServiceApi, Builder } from "@cloudbase/framework-core";

const useSAMDeploy = false;

export interface IFunctionPluginInputs {
  functionRootPath: string;
  functions: any[];
  servicePaths?: Record<string, string>;
}

class FunctionPlugin extends Plugin {
  protected resolvedInputs: any;
  protected buildOutput: any;
  protected functions: any[];
  protected functionRootPath: string;
  protected builder: FunctionBuilder;
  protected outputs: Record<string, any>;

  constructor(
    public name: string,
    public api: PluginServiceApi,
    public inputs: IFunctionPluginInputs
  ) {
    super(name, api, inputs);

    const config = this.api.projectConfig;

    const DEFAULT_INPUTS = {
      functionRootPath: config?.functionRoot || "cloudfunctions",
      functions: config?.functions,
      servicePaths: {},
    };

    this.resolvedInputs = resolveInputs(this.inputs, DEFAULT_INPUTS);

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

    if (useSAMDeploy) {
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

      await Promise.all(
        buildResult.functions.map(async (func) => {
          const cloudPath = `framework-upload/${func.name}.zip`;
          const url = await this.uploadToCos(func.source, cloudPath);
          this.outputs[func.name] = {
            codeUrl: url,
          };
        })
      );
    }

    return {
      Resources: this.functions.reduce((resouces, func) => {
        resouces[this.toConstantCase(func.name)] = this.functionConfigToSAM(
          func
        );
        return resouces;
      }, {}),
    };
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

    const Function = this.api.resourceProviders?.function;

    // 批量部署云函数
    await Promise.all(
      this.functions.map(async (func: any) => {
        try {
          await Function.createFunction({
            func,
            envId: this.api.envId,
            force: true,
            functionRootPath: this.functionRootPath,
          });
          this.api.logger.info(
            `${this.api.emoji("🚀")} [${func.name}] 云函数部署成功`
          );
        } catch (e) {
          this.api.logger.error(
            `${this.api.emoji("🙅‍♂")} [${func.name}] 函数部署失败`
          );
          throw new Error(e.message);
        }
      })
    );

    // 批量处理云接入
    await Promise.all(
      Object.entries(this.resolvedInputs.servicePaths).map(
        async ([functionName, servicePath]) => {
          try {
            await this.api.cloudbaseManager.commonService().call({
              Action: "CreateCloudBaseGWAPI",
              Param: {
                ServiceId: this.api.envId,
                Path: servicePath,
                Type: 1,
                Name: functionName,
              },
            });
          } catch (e) {
            if (!e.message.includes("api created")) {
              throw e;
            }
          }
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

  functionConfigToSAM(funcitonConfig: any) {
    return {
      Type: "CloudBase::Function",
      Properties: {
        Handler: funcitonConfig.handler || "index.main",
        Description: "CloudBase Framework 部署的云函数",
        Runtime: funcitonConfig.runtime,
        FunctionName: funcitonConfig.name,
        MemorySize: funcitonConfig.memory || 128,
        Timeout: funcitonConfig.timeout || 5,
        Environment: funcitonConfig.envVariables,
        VpcConfig: funcitonConfig.vpc,
        HttpPath: this.resolvedInputs.servicePaths[funcitonConfig.name],
        InstallDependency:
          "installDependency" in funcitonConfig
            ? funcitonConfig.installDependency
            : true,
        CodeUri:
          this.outputs[funcitonConfig.name] &&
          this.outputs[funcitonConfig.name].codeUrl,
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

  async uploadToCos(localPath: string, cloudPath: string) {
    // @todo use cloudId
    const uploadResult = await this.api.cloudbaseManager.storage.uploadFile({
      localPath,
      cloudPath,
    });

    const result = await this.api.cloudbaseManager.storage.getTemporaryUrl([
      {
        cloudPath,
        maxAge: 86400,
      },
    ]);

    return result[0].url;
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
