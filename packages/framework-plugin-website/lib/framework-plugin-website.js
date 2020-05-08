'use strict';
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const { Plugin } = require('@cloudbase/framework-core');
const { StaticBuilder } = require('@cloudbase/static-builder');

const DEFAULT_INPUTS = {
  outputPath: 'dist',
  cloudPath: '/',
  buildCommand: 'npm run build',
  ignore: ['.git', '.github', 'node_modules'],
};

class WebsitePlugin extends Plugin {
  async build(api, inputs) {
    api.logger.debug('WebsitePlugin: build', inputs);
    const resolvedInputs = resolveInputs(inputs);

    const { outputPath, cloudPath, buildCommand } = resolvedInputs;

    if (buildCommand) {
      await promisify(exec)(buildCommand);
    }

    const staticBuilder = new StaticBuilder({
      projectPath: api.projectPath,
    });

    return staticBuilder.build(path.join(api.projectPath, outputPath), {
      cloudPath,
    });
  }

  async deploy(api, inputs, buildOutput) {
    api.logger.debug('WebsitePlugin: deploy', inputs, buildOutput);
  }
}

function resolveInputs(inputs) {
  return Object.assign({}, DEFAULT_INPUTS, inputs);
}

module.exports = WebsitePlugin;
