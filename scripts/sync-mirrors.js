/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2025 Tencent.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const got = require('got');

const allDeps = {};

main();

async function main() {
  let files = await promisify(fs.readdir)(path.join(process.cwd(), 'packages'));
  Promise.all(
    files
      .filter((file) => {
        return file.match(/^[^.]/);
      })
      .map(async (file) => {
        const packageJson = require(path.join(
          process.cwd(),
          'packages',
          file,
          'package.json'
        ));
        const name = packageJson.name;
        const url = `http://mirrors.tencent.com/npm/${name}`;

        const response = await got(url, { responseType: 'json' });
        const isUpdated = !!response.body.versions[packageJson.version];

        console.log(packageJson.name, isUpdated ? '已经更新' : '未更新');
      })
  );
}
