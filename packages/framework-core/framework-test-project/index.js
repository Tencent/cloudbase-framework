/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2025 Tencent.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
const path = require('path');

async function frameworkTest() {
  const frameworkCore = require('../lib');
  await frameworkCore.run({
    projectPath: path.join(__dirname, './'),
    cloudbaseConfig: {
      secretId: '',
      secretKey: '',
      envId: '',
    },
    config: {
      app: 'test-app',
      plugins: {
        website: {
          use: path.join(__dirname, '../../framework-plugin-wx-landing'),
          inputs: {
            outputPath: 'dist',
          },
        },
      },
    },
  });
}

frameworkTest()
  .then(console.log)
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
