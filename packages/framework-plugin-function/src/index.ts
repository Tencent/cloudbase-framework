import path from "path";
import fs from "fs";
import { exec } from "child_process";
import { promisify } from "util";

import { Plugin, PluginServiceApi } from "@cloudbase/framework-core";

class FunctionPlugin extends Plugin {
  protected resolvedInputs: any;
  protected buildOutput: any;
  protected functions: any[];
  protected functionRootPath: string;

  constructor(
    public name: string,
    public api: PluginServiceApi,
    public inputs: any
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
    this.functionRootPath = path.join(
      this.api.projectPath,
      this.resolvedInputs.functionRootPath
    );
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
    const promises = this.functions.map(async (func: any) => {
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
    });

    const servicePromises = Object.entries(
      this.resolvedInputs.servicePaths
    ).map(([functionName, servicePath]) => {
      return this.api.cloudbaseManager.commonService().call({
        Action: "CreateCloudBaseGWAPI",
        Param: {
          ServiceId: this.api.envId,
          Path: servicePath,
          Type: 1,
          Name: functionName,
        },
      });
    });

    await Promise.all(promises);
    await Promise.all(servicePromises);

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
