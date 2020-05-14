import path from "path";
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

  async init() {
    this.api.logger.debug("WebsitePlugin: init", this.resolvedInputs);
  }

  async compile() {}
  async remove() {}
  async genCode() {}

  async build() {
    this.api.logger.debug("WebsitePlugin: build", this.resolvedInputs);

    const { outputPath, cloudPath, buildCommand } = this.resolvedInputs;

    if (buildCommand) {
      await promisify(exec)(buildCommand);
    }

    this.buildOutput = await this.builder.build(
      [
        path.join(this.api.projectPath, outputPath),
        '!**/node_modules/**'
      ],
      {
        path: cloudPath,
      }
    );
  }

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
}

function resolveInputs(inputs: any) {
  return Object.assign({}, DEFAULT_INPUTS, inputs);
}

module.exports = WebsitePlugin;
