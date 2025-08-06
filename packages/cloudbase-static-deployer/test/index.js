/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2025 Tencent.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
const { StaticDeployer } = require('../');
const path = require('path');

const options = require('./my-options');

async function main() {
  const deployer = new StaticDeployer({
    secretId: options.secretId,
    secretKey: options.secretKey,
    envId: options.envId,
  });

  const result = await deployer.deploy({
    localPath: path.resolve(__dirname, './static'),
    cloudPath: '/static',
  });

  console.log(result);
}

main();
