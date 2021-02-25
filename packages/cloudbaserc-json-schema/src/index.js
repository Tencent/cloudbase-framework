/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
const baseSchema = require('./schema/cloudbaserc-base-schema.json');
const typesSchemasGenerator = require('./schema/types-schema-generator');
const fs = require('fs');
const path = require('path');

const supportPluginsConfig = [
  {
    name: '@cloudbase/framework-plugin-website',
    inputsInterfaceName: 'IFrameworkPluginWebsiteInputs',
  },
  {
    name: '@cloudbase/framework-plugin-node',
    inputsInterfaceName: 'IFrameworkPluginNodeInputs',
  },
  {
    name: '@cloudbase/framework-plugin-nuxt',
    inputsInterfaceName: 'IFrameworkPluginNuxtInputs',
  },
  {
    name: '@cloudbase/framework-plugin-function',
    inputsInterfaceName: 'IFrameworkPluginFunctionInputs',
  },
  {
    name: '@cloudbase/framework-plugin-container',
    inputsInterfaceName: 'IFrameworkPluginContainerInputs',
  },
  {
    name: '@cloudbase/framework-plugin-dart',
    inputsInterfaceName: 'IFrameworkPluginDartInputs',
  },
  {
    name: '@cloudbase/framework-plugin-database',
    inputsInterfaceName: 'IFrameworkPluginDatabaseInputs',
  },
  {
    name: '@cloudbase/framework-plugin-deno',
    inputsInterfaceName: 'IFrameworkPluginDenoInputs',
  },
  {
    name: '@cloudbase/framework-plugin-next',
    inputsInterfaceName: 'IFrameworkPluginNextInputs',
  },
  {
    name: '@cloudbase/framework-plugin-mp',
    inputsInterfaceName: 'IFrameworkPluginMiniProgramInputs',
  },
  {
    name: '@cloudbase/framework-plugin-auth',
    inputsInterfaceName: 'IFrameworkPluginAuthInputs',
  },
];

supportPluginsConfig.forEach((plugin) => {
  const inputsSchema = typesSchemasGenerator.getSchemaForSymbol(plugin.inputsInterfaceName);
  const { definitions } = inputsSchema;

  delete inputsSchema.definitions;

  const key = `${plugin.inputsInterfaceName}Config`;

  baseSchema.definitions.pluginConfig.anyOf.push({
    $ref: `#/definitions/${key}`,
  });
  baseSchema.definitions[key] = {
    $id: `#/definitions/${key}`,
    additionalProperties: false,
    type: 'object',
    properties: {
      use: {
        type: 'string',
        enum: [plugin.name],
      },
      inputs: inputsSchema,
    },
    required: ['use', 'inputs'],
  };

  Object.assign(baseSchema.definitions, definitions);
});

fs.writeFileSync(
  path.join(__dirname, '../dist/cloudbaserc-json-schema.json'),
  JSON.stringify(baseSchema, null, 2),
);
