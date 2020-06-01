'use strict';

const FrameworkPluginNode = require('../lib');

describe('@cloudbase/framework-plugin-node', () => {
  it('needs tests', () => {
    new FrameworkPluginNode(
      'test',
      {
        projectPath: process.cwd(),
      },
      { test: 1 }
    );
  });
});
