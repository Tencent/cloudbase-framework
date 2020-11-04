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

async function frameworkTest() {
  const frameworkCore = require('../lib');
  const result = await frameworkCore.run({
    projectPath: path.join(__dirname, './'),
    cloudbaseConfig: {
      secretId: '',
      secretKey: '',
      envId: '',
    },
    config: {
      app: 'test-app',
      plugins: {
        website: {
          use: path.join(__dirname, '../../framework-plugin-wx-landing'),
          inputs: {
            outputPath: 'dist',
          },
        },
      },
    },
  });
}

frameworkTest()
  .then(console.log)
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
