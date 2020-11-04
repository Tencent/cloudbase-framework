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
const { NuxtBuilder } = require('../');
const path = require('path');
async function main() {
  const builder = new NuxtBuilder({
    projectPath: path.resolve(__dirname, './project'),
  });

  const result = await builder.build(path.resolve(__dirname, './project'), {
    path: '/nuxt',
  });
  console.log(result);
}

main();
