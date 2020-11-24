/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */

module.exports = {
  overrides: [
    {
      files: ['**/*.js'],
      extends: ['@tencent/eslint-config-tencent'],
      rules: {
        'header/header': [2, 'resources/license-header.js'],
      },
    },
    {
      files: ['**/*.ts'],
      extends: ['@tencent/eslint-config-tencent/ts'],
      rules: {
        'header/header': [2, 'resources/license-header.js'],
      },
    },
  ],
  plugins: ['header'],
};
