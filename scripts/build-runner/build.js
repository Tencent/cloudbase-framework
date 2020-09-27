const spawnPromise = require('../spawn');
const path = require('path');
const glob = require('glob');
const { promisify } = require('util');
const { writeFileSync } = require('fs');

const coreVersion = require('../../lerna.json').version;
const tag = coreVersion;
const tagName = `binggg/cloudbase-framework-runner:${tag}`;

const promisifyGlob = promisify(glob);

(async () => {
  const builtInPlugins = await promisifyGlob('framework-plugin-*', {
    cwd: path.join(__dirname, '../../packages'),
  });
  const packages = {
    name: 'cloudbase-framework-registry',
    dependencies: builtInPlugins.reduce((prev, cur) => {
      prev[cur] = `^${coreVersion}`;
      return prev;
    }, {}),
  };

  console.log(packages);

  writeFileSync(
    path.join(__dirname, './src/package.json'),
    JSON.stringify(packages, null, 4)
  );

  await spawnPromise(`docker build . --no-cache -t ${tagName}`, {
    cwd: path.join(__dirname, './src'),
  });

  await spawnPromise(`docker push ${tagName}`, {});
})();
