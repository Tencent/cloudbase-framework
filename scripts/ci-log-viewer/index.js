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
