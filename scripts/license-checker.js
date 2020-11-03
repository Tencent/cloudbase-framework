const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

let allDeps = {};

main();

async function main() {
  await licenseCheck('main', process.cwd());

  let files = await promisify(fs.readdir)(path.join(process.cwd(), 'packages'));

  files = files.filter((file) => !/^\./.test(file));

  for (let file of files) {
    await licenseCheck(file, path.join(process.cwd(), 'packages', file));
  }

  let report = `开源软件名称,开源软件版本号,开源软件的下载链接地址,是否对开源软件做出修改？,是否对开源软件进行了分发？
`;
  report += Object.entries(allDeps)
    .filter(([packageName]) => {
      return !/^(@cloudbase|@types|typescript)/.exec(packageName);
    })
    .map(([packageName, verison]) => {
      let v = verison.replace('^', '');
      return `${packageName},${v},https://www.npmjs.com/package/${packageName}/v/${v},否,是`;
    })
    .join('\n');

  fs.writeFileSync('license-report.csv', report);
}

// 开源软件名称	开源软件版本号	开源软件的下载链接地址	是否对开源软件做出修改？	是否对开源软件进行了分发？
async function licenseCheck(file, cwd) {
  console.log('\n', 'Check Package Lisense', file, '\n');
  const packageJSON = JSON.parse(
    fs.readFileSync(path.join(cwd, 'package.json'))
  );
  const directDeps = packageJSON.dependencies;

  Object.assign(allDeps, directDeps);
}
