/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */

const path = require('path');
const os = require('os');
const https = require('https');

const spawnPromise = require('./spawn');
const link = require('./link');

const listUrl = 'https://tcli.service.tcloudbase.com/templates';
const cwd = os.homedir();

main().catch((e) => {
  console.log('执行失败', e);
  process.exit(1);
});

async function main() {
  await forkTemplate();
  await link();
  await login();
  const templates = await getTemplates();
  console.log(templates);

  await Promise.all(templates
    .filter(template => !['taro-starter', 'deno'].includes(template.path))
    .map(installTemplate));
}

async function forkTemplate() {
  await spawnPromise(`rm -rf ${path.join(cwd, 'cloudbase-templates')}`, {
    cwd,
  });

  await spawnPromise(
    'git clone https://github.com/TencentCloudBase/cloudbase-templates/',
    {
      cwd,
    },
  );
}

async function login() {
  await spawnPromise(
    `cloudbase login --apiKeyId  ${process.env.SecretId} --apiKey ${process.env.SecretKey}`,
    {
      cwd,
    },
  );
}

async function getTemplates() {
  return new Promise((resolve, reject) => {
    https.get(listUrl, (res) => {
      let data = '';

      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(JSON.parse(data));
      });
      res.on('error', reject);
    });
  });
}

async function installTemplate(template) {
  console.log(`install template ${template.path} ${template.name}`);
  await spawnPromise(
    `cloudbase framework deploy -e ${process.env.envId} --verbose`,
    {
      cwd: path.join(cwd, 'cloudbase-templates', template.path),
    },
  );
}
