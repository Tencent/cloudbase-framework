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
];

for (let plugin of supportPluginsConfig) {
  let inputsSchema = typesSchemasGenerator.getSchemaForSymbol(
    plugin.inputsInterfaceName
  );
  let definitions = inputsSchema.definitions;

  delete inputsSchema.definitions;

  baseSchema.definitions.pluginConfig.anyOf.push({
    $ref: `#/definitions/${plugin.inputsInterfaceName}Config`,
  });
  baseSchema.definitions[plugin.inputsInterfaceName + 'Config'] = {
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
  JSON.stringify(baseSchema, null, 2)
);
