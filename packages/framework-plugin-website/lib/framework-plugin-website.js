'use strict';
const Plugin = require('@cloudbase/framework-core').Plugin;

module.exports = class WebsitePlugin extends Plugin {
  async build(api, inputs) {
    console.log('build');
    console.log(api, inputs);
    return {
      test: 123,
    };
  }

  async deploy(api, inputs, buildOutput) {
    console.log('deploy');
    console.log(api, inputs, buildOutput);
  }
};
