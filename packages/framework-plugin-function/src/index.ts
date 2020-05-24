import path from "path";
import fs from "fs";
import { exec } from "child_process";
import { promisify } from "util";

import { Plugin, PluginServiceApi } from "@cloudbase/framework-core";

const DEFAULT_INPUTS = {};

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

    this.resolvedInputs = resolveInputs(this.inputs);
    const config = this.api.projectConfig;

    this.functions = config?.functions || [];
    this.functionRootPath = path.join(
      process.cwd(),
      config?.functionRoot || "functions"
    );
  }

  /**
   * 初始化
   */
  async init() {
    this.api.logger.debug("FunctionPlugin: init", this.resolvedInputs);
  }

  async compile() {
    return {
      Resources: this.functions.reduce((resouces, func) => {
        resouces[this.toConstantCase(func.name)] = this.functionConfigToSAM(
          func
        );
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

    await Promise.all(promises);

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

function resolveInputs(inputs: any) {
  return Object.assign({}, DEFAULT_INPUTS, inputs);
}

function wait(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

module.exports = FunctionPlugin;
