'use strict';
const path = require('path');

const { Plugin } = require('@cloudbase/framework-core');
const StaticBuilder = require('@cloudbase/static-builder');

const DEFAULT_INPUTS = {
  outputPath: 'dist',
  cloudPath: '/',
  buildCommand: 'npm run build',
  ignore: ['.git', '.github', 'node_modules'],
};

class WebsitePlugin extends Plugin {
  async build(api, inputs) {
    api.logger.info('WebsitePlugin: build', inputs);
    const resolvedInputs = resolveInputs(inputs);

    const { outputPath, cloudPath } = resolvedInputs;
    const staticBuilder = new StaticBuilder();

    return staticBuilder.build(path.join(api.projectPath, outputPath), {
      cloudPath,
    });
  }

  async deploy(api, inputs, buildOutput) {
    console.log('deploy');
    console.log(api, inputs, buildOutput);
  }
}

function resolveInputs(inputs) {
  return Object.assign({}, DEFAULT_INPUTS, inputs);
}

module.exports = WebsitePlugin;
