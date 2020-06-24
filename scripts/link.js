const spawnPromise = require('./spawn');
const path = require('path');
const os = require('os');
const { execSync, exec } = require('child_process');
const fs = require('fs');
const { promisify } = require('util');

const globalNpmPath = execSync('npm root -g', {
  encoding: 'utf-8',
}).trim();

main();

async function main() {
  await linkCore();
  await linkPlugins();
}

async function linkCore() {
  await link(
    path.join(process.cwd(), 'packages/framework-core'),
    path.join(globalNpmPath, '@cloudbase/cli'),
    '@cloudbase/framework-core'
  );
}

async function linkPlugins() {
  const files = await promisify(fs.readdir)(
    path.join(process.cwd(), 'packages')
  );

  const plugins = files.filter((file) => file.includes('plugin'));
  console.log(plugins);

  for (let plugin of plugins) {
    await link(
      path.join(process.cwd(), 'packages', plugin),
      path.join(os.homedir(), '.cloudbase-framework/registry'),
      `@cloudbase/${plugin}`
    );
  }
}

async function link(src, dest, packageName) {
  await spawnPromise('npm link', {
    cwd: src,
  });
  await spawnPromise(`npm link ${packageName}`, {
    cwd: dest,
  });
}
