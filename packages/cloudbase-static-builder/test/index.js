/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
const { StaticBuilder } = require('../');
const path = require('path');

const builder = new StaticBuilder({
  projectPath: path.resolve(__dirname),
  copyRoot: path.resolve(__dirname, './static'),
});

async function main() {
  const result = await builder.build(['**', '!**/node_modules/**'], {
    path: '/',
  });
  console.log(result);
}

main();
