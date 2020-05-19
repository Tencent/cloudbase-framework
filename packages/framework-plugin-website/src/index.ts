import path from "path";
import fs from "fs";
import { exec } from "child_process";
import { promisify } from "util";

import { Plugin, PluginServiceApi } from "@cloudbase/framework-core";
import { StaticBuilder } from "@cloudbase/static-builder";
import { StaticDeployer } from "@cloudbase/static-deployer";

const DEFAULT_INPUTS = {
  outputPath: "dist",
  cloudPath: "/",
  ignore: [".git", ".github", "node_modules", "cloudbaserc.js"],
};

class WebsitePlugin extends Plugin {
  protected builder: StaticBuilder;
  protected deployer: StaticDeployer;
  protected resolvedInputs: any;
  protected buildOutput: any;

  constructor(
    public name: string,
    public api: PluginServiceApi,
    public inputs: any
  ) {
    super(name, api, inputs);

    this.resolvedInputs = resolveInputs(this.inputs);
    this.builder = new StaticBuilder({
      projectPath: this.api.projectPath,
    });
    this.deployer = new StaticDeployer({
      cloudbaseManager: this.api.cloudbaseManager,
    });
  }

  /**
   * 初始化
   */
  async init() {
    this.api.logger.debug("WebsitePlugin: init", this.resolvedInputs);
    await this.installPackage();
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
    this.api.logger.debug("WebsitePlugin: build", this.resolvedInputs);

    const { outputPath, cloudPath, buildCommand } = this.resolvedInputs;

    if (buildCommand) {
      await promisify(exec)(buildCommand);
    }

    this.buildOutput = await this.builder.build(
      [outputPath, "!**/node_modules/**"],
      {
        path: cloudPath,
      }
    );
  }

  /**
   * 部署
   */
  async deploy() {
    this.api.logger.debug(
      "WebsitePlugin: deploy",
      this.resolvedInputs,
      this.buildOutput
    );

    const deployResult = await Promise.all(
      this.buildOutput.static.map((item: any) =>
        this.deployer.deploy({
          localPath: item.src,
          cloudPath: item.cloudPath,
          ignore: item.ignore,
        })
      )
    );

    await this.builder.clean();

    return deployResult;
  }

  /**
   * 安装依赖
   */
  installPackage() {
    if (fs.statSync("package.json")) {
      this.api.logger.info("npm install");
      return promisify(exec)("npm install");
    }
  }
}

function resolveInputs(inputs: any) {
  return Object.assign({}, DEFAULT_INPUTS, inputs);
}

module.exports = WebsitePlugin;
