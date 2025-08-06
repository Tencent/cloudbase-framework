/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2025 Tencent.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
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
