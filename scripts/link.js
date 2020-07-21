const os = require('os');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const { promisify } = require('util');
const { execSync } = require('child_process');
const creatSymlink = require('@lerna/create-symlink');

const globalNpmPath = execSync('npm root -g', {
  encoding: 'utf-8',
}).trim();

const pluginRegistry = path.join(os.homedir(), '.cloudbase-framework/registry');

module.exports = async function main() {
  await linkCore();
  initRegistry();
  await linkPlugins();
};

async function linkCore() {
  await link(
    path.join(process.cwd(), 'packages/framework-core'),
    path.join(globalNpmPath, '@cloudbase/cli'),
    '@cloudbase/framework-core'
  );
}

function initRegistry() {
  if (!fs.existsSync(pluginRegistry)) {
    fs.mkdirSync(pluginRegistry, { recursive: true });
  }
  const packageJSON = path.join(pluginRegistry, 'package.json');
  if (!fs.existsSync(packageJSON)) {
    fs.writeFileSync(
      packageJSON,
      JSON.stringify({
        name: 'cloudbase-framework-registry',
      })
    );
  }
}

async function linkPlugins() {
  const files = await promisify(fs.readdir)(
    path.join(process.cwd(), 'packages')
  );

  const plugins = files.filter((file) => file.includes('plugin'));
  // 插件列表
  console.log(plugins);

  for (let plugin of plugins) {
    console.log('\n', 'Link Plugin', plugin, '\n');
    // 创建软连接
    await link(
      path.join(process.cwd(), 'packages', plugin),
      pluginRegistry,
      `@cloudbase/${plugin}`
    );
  }
}

// 将 global tcb cli 工具中的 framework-core link 到 packages/framework-core
async function link(src, dest, packageName) {
  const prevCwd = process.cwd();
  const destPlugin = path.join(dest, 'node_modules', '@cloudbase');
  // 确保目录存在
  mkdirp.sync(destPlugin);
  // 切换 cwd
  process.chdir(destPlugin);
  console.log('创建软连接：', process.cwd());
  await creatSymlink(src, packageName.replace('@cloudbase/', ''), 'junction');
  // 切回源目录
  process.chdir(prevCwd);
}
