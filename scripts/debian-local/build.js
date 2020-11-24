/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */

const spawnPromise = require('../spawn');
const path = require('path');

const tagName = 'tencentcloudbase/debian:buster-slim';

(async () => {
  await spawnPromise(`docker build . --no-cache -t ${tagName}`, {
    cwd: path.join(__dirname, './src'),
  });

  await spawnPromise(`docker push ${tagName}`, {});
})();
