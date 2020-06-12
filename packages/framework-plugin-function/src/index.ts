import path from "path";

import { Plugin, PluginServiceApi } from "@cloudbase/framework-core";

export interface IFunctionPluginInputs {
  functionRootPath: string;
  functions: any[];
  servicePaths?: Record<string, string>;
}

class FunctionPlugin extends Plugin {
  protected resolvedInputs: IFunctionPluginInputs;
  protected buildOutput: any;
  protected functions: any[];
  protected functionRootPath: string;

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
  }

  /**
   * 初始化
   */
  async init() {
    this.api.logger.debug("FunctionPlugin: init", this.resolvedInputs);
  }

  async compile() {
    this.api.logger.debug("FunctionPlugin: compile", this.resolvedInputs);
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

    const { outputPath, cloudPath, buildCommand } = this.resolvedInputs;
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
          this.api.logger.info(`🚀 [${func.name}] 云函数部署成功`);
        } catch (e) {
          this.api.logger.error(`🙅‍♂️ [${func.name}] 函数部署失败`);
          throw new Error(e.message);
        }
      })
    );

    // 批量处理云接入
    await Promise.all(
      Object.entries(this.resolvedInputs.servicePaths).map(
        async ([functionName, servicePath]) => {
          const res = await this.api.cloudbaseManager.commonService().call({
            Action: "CreateCloudBaseGWAPI",
            Param: {
              ServiceId: this.api.envId,
              Path: servicePath,
              Type: 1,
              Name: functionName,
            },
          });

          let url = `https://${this.api.envId}.service.tcloudbase.com${servicePath}`;
          if (url[url.length - 1] !== "/") {
            url = url + "/";
          }
          url = this.api.genClickableLink(url);
          this.api.logger.info(`🚀 服务发布成功，访问地址: ${url}`);
        }
      )
    );

    this.api.logger.info(`🚀 云函数部署成功`);
  }

  functionConfigToSAM(funcitonConfig: any) {
    return {
      Type: "CloudBase::Function",
      Properties: {
        Handler: funcitonConfig.handler || "index.main",
        Description: "",
        Runtime: funcitonConfig.runtime,
        FunctionName: funcitonConfig.name,
        MemorySize: funcitonConfig.memory || 128,
        Timeout: funcitonConfig.timeout || 3,
        Environment: funcitonConfig.envVariables,
        VpcConfig: funcitonConfig.vpc,
        HttpPath: this.resolvedInputs.servicePaths[funcitonConfig.name],
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

function wait(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export const plugin = FunctionPlugin;
