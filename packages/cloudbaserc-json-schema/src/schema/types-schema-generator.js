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
