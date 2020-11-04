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

for (const plugin of supportPluginsConfig) {
  const inputsSchema = typesSchemasGenerator.getSchemaForSymbol(plugin.inputsInterfaceName);
  const { definitions } = inputsSchema;

  delete inputsSchema.definitions;

  baseSchema.definitions.pluginConfig.anyOf.push({
    $ref: `#/definitions/${plugin.inputsInterfaceName}Config`,
  });
  baseSchema.definitions[`${plugin.inputsInterfaceName}Config`] = {
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
}

fs.writeFileSync(
  path.join(__dirname, '../dist/cloudbaserc-json-schema.json'),
  JSON.stringify(baseSchema, null, 2),
);
