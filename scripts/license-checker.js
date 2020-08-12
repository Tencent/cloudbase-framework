const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const spawnPromise = require('./spawn');

async function main() {
  await licenseCheck('main', process.cwd());

  let files = await promisify(fs.readdir)(path.join(process.cwd(), 'packages'));

  files = files.filter((file) => !/^\./.test(file));

  for (let file of files) {
    await licenseCheck(file, path.join(process.cwd(), 'packages', file));
  }
}

main();

async function licenseCheck(file, cwd) {
  console.log('\n', 'Check Package Lisense', file, '\n');
  const licenseCommand = path.join(
    __dirname,
    '..',
    'node_modules/.bin/license-checker'
  );
  await spawnPromise(`${licenseCommand} --summary`, {
    cwd,
  });
}
