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
'use strict';

const frameworkCore = require('../lib/index');
const path = require('path');

describe('@cloudbase/framework-core', () => {
  it('should has run method', async () => {
    const result = await frameworkCore.run({
      projectPath: path.join(__dirname, './test-project'),
      cloudbaseConfig: {
        secretId: '',
        secretKey: '',
        envId: '',
      },
    });
    console.log(result);
    expect(frameworkCore.run).toBeTruthy();
  });

  it('should support `build` command', async () => {
    const result = await frameworkCore.run(
      {
        projectPath: path.join(__dirname, './test-project'),
        cloudbaseConfig: {
          secretId: '',
          secretKey: '',
          envId: '',
        },
      },
      'build',
    );
    console.log(result);
    expect(frameworkCore.run).toBeTruthy();
  });
});
