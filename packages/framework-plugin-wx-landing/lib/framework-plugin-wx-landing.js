'use strict';
const WebsitePlugin = require('@cloudbase/framework-plugin-website');

class WxLandingPlugin extends WebsitePlugin {
  constructor(name) {
    super(name);
  }
  async build(...args) {
    console.log('wxlanding build');
    return await super.build(...args);
  }

  async deploy(...args) {
    console.log('wxlanding deploy');
    return await super.deploy(...args);
  }
}

module.exports = WxLandingPlugin;
