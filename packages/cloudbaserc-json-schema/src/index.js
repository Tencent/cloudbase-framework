const baseSchema = require('./schema/cloudbaserc-base-schema.json');
const typesSchemasGenerator = require('./schema/types-schema-generator');
const fs = require('fs');

const supportPluginsConfig = [
  {
    name: '@cloudbase/framework-plugin-website',
    inputsInterfaceName: 'IFrameworkPluginWebsiteInput',
  },
];

for (let plugin of supportPluginsConfig) {
  let inputsSchema = typesSchemasGenerator.getSchemaForSymbol(
    'IFrameworkPluginWebsiteInputs'
  );
  let definitions = inputsSchema.definitions;

  delete inputsSchema.definitions;

  baseSchema.definitions.pluginConfig.anyOf.push({
    $ref: `#/definitions/${plugin.inputsInterfaceName}`,
  });
  baseSchema.definitions[plugin.inputsInterfaceName] = {
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
  '../lib/cloudbaserc-json-schema.json',
  JSON.stringify(baseSchema, null, 2)
);
