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

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const spawnPromise = require('./spawn');

async function main() {
  await licenseCheck('main', process.cwd());

  let files = await promisify(fs.readdir)(path.join(process.cwd(), 'packages'));

  files = files.filter(file => !/^\./.test(file));

  for (const file of files) {
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
