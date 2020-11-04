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
const assert = require('assert');
const { NodeBuilder } = require('../');
const path = require('path');

const builder = new NodeBuilder({
  projectPath: path.resolve(__dirname, '../'),
});

builder.build(path.resolve(__dirname, './project/entry.js')).then((result) => {
  const { source, name } = result.functions[0];
  const output = path.resolve(source, name, 'package.json');
  const input = './project/package.json';
  assert.equal(
    require(output).dependencies.axios,
    require(input).dependencies.axios,
    '继承了项目中的 axios 依赖',
  );
  console.log(result);
});
