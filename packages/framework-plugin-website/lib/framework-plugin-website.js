'use strict';
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const { Plugin } = require('@cloudbase/framework-core');
const { StaticBuilder } = require('@cloudbase/static-builder');
const { StaticDeployer } = require('@cloudbase/static-deployer');

const DEFAULT_INPUTS = {
  outputPath: 'dist',
  cloudPath: '/',
  buildCommand: 'npm run build',
  ignore: ['.git', '.github', 'node_modules'],
};

class WebsitePlugin extends Plugin {
  constructor(...args) {
    super(...args);

    this.resolvedInputs = resolveInputs(this.inputs);
    this.builder = new StaticBuilder({
      projectPath: this.api.projectPath,
    });
    this.deployer = new StaticDeployer({
      cloudbaseManager: this.api.cloudbaseManager,
    });
  }

  async init() {
    this.api.logger.debug('WebsitePlugin: init', this.resolvedInputs);
  }

  async build() {
    this.api.logger.debug('WebsitePlugin: build', this.resolvedInputs);

    const { outputPath, cloudPath, buildCommand } = this.resolvedInputs;

    if (buildCommand) {
      await promisify(exec)(buildCommand);
    }

    this.buildOutput = await this.builder.build(
      path.join(this.api.projectPath, outputPath),
      {
        cloudPath,
      }
    );
  }

  async deploy() {
    this.api.logger.debug(
      'WebsitePlugin: deploy',
      this.resolvedInputs,
      this.buildOutput
    );

    const deployResult = await Promise.all(
      this.buildOutput.static.map((item) =>
        this.deployer.deploy({
          localPath: item.src,
          cloudPath: item.cloudPath,
        })
      )
    );

    await this.builder.clean();

    return deployResult;
  }
}

function resolveInputs(inputs) {
  return Object.assign({}, DEFAULT_INPUTS, inputs);
}

module.exports = WebsitePlugin;
