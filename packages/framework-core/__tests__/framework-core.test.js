'use strict';

const frameworkCore = require('../lib/index');
const path = require('path');

describe('@cloudbase/framework-core', () => {
  it('should has run method', async () => {
    const result = await frameworkCore.run({
      projectPath: path.join(__dirname, './test-project'),
      cloudbaseConfig: {
        secretId: '',
        secretKey: '',
        envId: '',
      },
    });
    console.log(result);
    expect(frameworkCore.run).toBeTruthy();
  });

  it('should support `build` command', async () => {
    const result = await frameworkCore.run(
      {
        projectPath: path.join(__dirname, './test-project'),
        cloudbaseConfig: {
          secretId: '',
          secretKey: '',
          envId: '',
        },
      },
      'build'
    );
    console.log(result);
    expect(frameworkCore.run).toBeTruthy();
  });
});
