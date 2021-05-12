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
  await logout();
  await login();
  await forkTemplate();
  await link();
  const templates = await getTemplates();
  console.log(templates);

  for (template of templates.filter(
    (template) => !['taro-starter', 'deno', 'dart', 'cms-microapp-vue', 'cms-microapp-react'].includes(template.path)
  )) {
    await installTemplate(template);
  }
}

async function forkTemplate() {
  await spawnPromise(`rm -rf ${path.join(cwd, 'cloudbase-templates')}`, {
    cwd,
  });

  await spawnPromise(
    'git clone https://github.com/TencentCloudBase/cloudbase-templates/',
    {
      cwd,
    }
  );
}

async function logout() {
  await spawnPromise(`cloudbase logout`, {
    cwd,
  });
}

async function login() {
  console.log(
    'login',
    process.env.SecretId.length,
    process.env.SecretKey.length
  );
  await spawnPromise(
    `cloudbase login --apiKeyId  ${process.env.SecretId} --apiKey ${process.env.SecretKey}`,
    {
      cwd,
    }
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
    }
  );
}
