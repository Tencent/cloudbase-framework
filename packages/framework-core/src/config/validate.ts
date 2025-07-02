/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2025 Tencent.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import Ajv from 'ajv';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const localize = require('ajv-i18n');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const schema = require('../../assets/cloudbaserc-json-schema');
const ajv = new Ajv({ allErrors: false });

const validateUseAjv = ajv.compile(schema);

export function validate(data: any) {
  const result = validateUseAjv(data);

  localize.zh(validateUseAjv.errors);

  const errors = validateUseAjv.errors;
  const errorText = result
    ? ''
    : `具体错误信息如下:

${errors?.map((e) => `  ❌ cloudbaserc${e.dataPath} ${e.message}`).join('\n')}

请修复后重新执行部署

建议使用 VS Code 编辑 cloudbaserc.json 文件

可以根据 cloudbaserc 配置规范实时校验和高亮显示错误信息
`;

  return {
    result,
    errors,
    errorText,
  };
}
