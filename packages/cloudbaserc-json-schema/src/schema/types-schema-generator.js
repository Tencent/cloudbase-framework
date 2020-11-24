/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
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
  basePath
);

module.exports = TJS.buildGenerator(program, settings);
