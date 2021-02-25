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
const namespaceDockerHub = 'tencentcloudbase';
const namespaceCcr = 'cloudbaseframework';
const image = 'cloudbase-framework-runner';
const imageName = `${namespaceDockerHub}/${image}`;
const ccrImageName = `${namespaceCcr}/${image}`;
const tagNameWithVersion = `${imageName}:${coreVersion}`;
const tagName = `${imageName}:${tag}`;

const promisifyGlob = promisify(glob);

(async () => {
  const builtInPlugins = await promisifyGlob('framework-plugin-*', {
    cwd: path.join(__dirname, '../../packages'),
  });
  const packages = {
    name: 'cloudbase-framework-registry',
    dependencies: builtInPlugins.reduce(
      (prev, cur) => {
        prev[`@cloudbase/${cur}`] = `^${coreVersion}`;
        return prev;
      },
      {
        '@cloudbase/framework-plugin-low-code': '0.2.5',
      }
    ),
  };

  console.log(packages);

  writeFileSync(
    path.join(__dirname, './src/package.json'),
    JSON.stringify(packages, null, 4)
  );

  await spawnPromise(
    `docker build --build-arg tag=${tag} --no-cache -t ${tagNameWithVersion} .`,
    {
      cwd: path.join(__dirname, './src'),
    }
  );

  await spawnPromise(`docker tag ${tagNameWithVersion} ${tagName}`, {
    cwd: path.join(__dirname, './src'),
  });
  await spawnPromise(
    `docker tag ${tagNameWithVersion} ccr.ccs.tencentyun.com/${ccrImageName}:${coreVersion}`,
    {
      cwd: path.join(__dirname, './src'),
    }
  );

  await // 推送镜像
  await spawnPromise(`docker push ${tagNameWithVersion}`, {});
  await spawnPromise(`docker push ${tagName}`, {});
  await spawnPromise(
    `docker push ccr.ccs.tencentyun.com/${ccrImageName}:${coreVersion}`,
    {}
  );
})();
