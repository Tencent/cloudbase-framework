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

copyPlugins();
async function copyPlugins() {
  const dest = path.join(__dirname, '../../doc/plugins');
  const packagesDir = path.join(__dirname, '../../packages');
  let files = await promisify(fs.readdir)(packagesDir);

  files = files.filter((file) => /^framework-plugin/.test(file));

  return Promise.all(
    files.map((file) =>
      promisify(fs.copyFile)(
        path.join(packagesDir, file, 'README.md'),
        path.join(dest, `${file}.md`)
      )
    )
  );
}
