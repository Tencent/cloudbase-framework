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
const { resolve } = require('path');
const TJS = require('typescript-json-schema');

// optionally pass argument to schema generator
const settings = {
  required: true,
};

// optionally pass ts compiler options
const compilerOptions = {
  strictNullChecks: true,
  esModuleInterop: true,
};

// optionally pass a base path
const basePath = '.';

const program = TJS.getProgramFromFiles(
  [resolve(__dirname, '../types/index.ts')],
  compilerOptions,
  basePath,
);

module.exports = TJS.buildGenerator(program, settings);
