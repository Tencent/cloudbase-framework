import path from "path";
import fs from "fs";
import { exec } from "child_process";
import { promisify } from "util";

import { Plugin, PluginServiceApi } from "@cloudbase/framework-core";

const DEFAULT_INPUTS = {
  outputPath: "dist",
  cloudPath: "/",
  ignore: [".git", ".github", "node_modules", "cloudbaserc.js"],
};

class FunctionPlugin extends Plugin {
  protected resolvedInputs: any;
  protected buildOutput: any;
  // 静态托管信息
  protected website: any;

  constructor(
    public name: string,
    public api: PluginServiceApi,
    public inputs: any
  ) {
    super(name, api, inputs);

    this.resolvedInputs = resolveInputs(this.inputs);
  }

  /**
   * 初始化
   */
  async init() {
    this.api.logger.debug("FunctionPlugin: init", this.resolvedInputs);
  }

  /**
   * 编译为 SAM 模板
   */
  async compile() {}

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
    const config = this.api.projectConfig;
    const functions = config?.functions || [];
    const Function = this.api.resourceProviders?.function;
    const functionRootPath = path.join(
      process.cwd(),
      config?.functionRoot || "functions"
    );

    // 批量部署云函数
    const promises = functions.map(async (func: any) => {
      try {
        await Function.createFunction({
          func,
          envId: this.api.envId,
          force: true,
          functionRootPath,
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
