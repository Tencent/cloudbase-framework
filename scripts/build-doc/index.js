/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

copyPlugins();
async function copyPlugins() {
  const dest = path.join(__dirname, '../../doc/plugins');
  const packagesDir = path.join(__dirname, '../../packages');
  let files = await promisify(fs.readdir)(packagesDir);

  files = files.filter((file) => /^framework-plugin/.test(file));

  return Promise.all(
    files.map((file) =>
      promisify(fs.copyFile)(
        path.join(packagesDir, file, 'README.md'),
        path.join(dest, `${file}.md`)
      )
    )
  );
}
