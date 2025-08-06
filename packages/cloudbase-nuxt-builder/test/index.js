/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2025 Tencent.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
const { NuxtBuilder } = require('../');
const path = require('path');
async function main() {
  const builder = new NuxtBuilder({
    projectPath: path.resolve(__dirname, './project'),
  });

  const result = await builder.build(path.resolve(__dirname, './project'), {
    path: '/nuxt',
  });
  console.log(result);
}

main();
