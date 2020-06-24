const path = require('path');
const os = require('os');
const https = require('https');

const spawnPromise = require('./spawn');

const listUrl = 'https://tcli.service.tcloudbase.com/templates';
const cwd = os.homedir();

main().catch((e) => {
  throw e;
});

async function main() {
  await forkTemplate();
  await linkPackages();
  await login();
  const templates = await getTemplates();
  console.log(templates);
  // return Promise.all(templates.map(installTemplate));
  for (let template of templates) {
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

async function linkPackages() {
  require('./link');
}

async function installTemplate(template) {
  console.log(`install template ${template.path} ${template.name}`);
  await spawnPromise(`cloudbase framework:deploy -e ${process.env.envId}`, {
    cwd: path.join(cwd, 'cloudbase-templates', template.path),
  });
}
