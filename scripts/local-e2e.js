/**
 *
 * Copyright 2020 Tencent
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
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

  for (const template of templates) {
    if (template.path !== 'taro-starter') {
      await installTemplate(template);
    }
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

async function login() {
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
