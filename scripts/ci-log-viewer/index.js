/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
const { CloudApiService } = require('@cloudbase/cloud-api');

const tcb = new CloudApiService({
  service: 'tcb',
  credential: {
    secretId: process.env.SecretId,
    secretKey: process.env.SecretKey,
  },
  ...(process.env.http_proxy ? { proxy: process.env.http_proxy } : {}),
});

(async () => {
  const result = await tcb.request('DescribeCloudBaseCILog', {
    CIId: process.env.CIId,
  });
  console.log(result);
})();
