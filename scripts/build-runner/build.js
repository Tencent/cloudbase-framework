/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */

const spawnPromise = require('../spawn');
const path = require('path');
const glob = require('glob');
const { promisify } = require('util');
const { writeFileSync } = require('fs');

const coreVersion = require('../../lerna.json').version;
const tag = process.env.BUILD_TAG || 'latest';
const tagName = `binggg/cloudbase-framework-runner:${tag}`;

const promisifyGlob = promisify(glob);

(async () => {
  const builtInPlugins = await promisifyGlob('framework-plugin-*', {
    cwd: path.join(__dirname, '../../packages'),
  });
  const packages = {
    name: 'cloudbase-framework-registry',
    dependencies: builtInPlugins.reduce((prev, cur) => {
      prev[`@cloudbase/${cur}`] = `^${coreVersion}`;
      return prev;
    }, {}),
  };

  console.log(packages);

  writeFileSync(
    path.join(__dirname, './src/package.json'),
    JSON.stringify(packages, null, 4)
  );

  await spawnPromise(
    `docker build --build-arg tag=${tag} --no-cache -t ${tagName} .`,
    {
      cwd: path.join(__dirname, './src'),
    }
  );

  // 推送镜像
  await spawnPromise(`docker push ${tagName}`, {});
})();
