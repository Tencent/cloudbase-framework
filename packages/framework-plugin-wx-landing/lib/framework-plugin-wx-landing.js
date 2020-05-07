'use strict';
const WebsitePlugin = require('@cloudbase/framework-plugin-website');

class WxLandingPlugin extends WebsitePlugin {
  constructor(name) {
    super(name);
  }

  // 创建项目模板
  async create() {}

  async build(...args) {
    console.log('wxlanding build');
    return super.build(...args);
  }

  async deploy(...args) {
    console.log('wxlanding deploy');
    return super.deploy(...args);
  }
}

module.exports = WxLandingPlugin;
