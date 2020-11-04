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
import { ICloudBaseConfig } from '../types';
import { isObject } from '../utils/type-check';
import { detect } from '../detect-frameworks';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { ConfigParser } from '@cloudbase/toolbox';

chalk.level = 1;

const FRAMEWORK_CONFIG_FILENAME = 'cloudbase-framework.json';

export default async function resolveConfig(
  projectPath: string,
  config: ICloudBaseConfig | undefined
) {
  const independentFrameworkConfig = await readFrameworkConfig(projectPath);

  let finalFrameworkConfig = independentFrameworkConfig || config?.framework;

  if (!finalFrameworkConfig) {
    const detectedFrameworks = await detect(projectPath, config);
    let plugins: any = {};

    if (detectedFrameworks.length) {
      for (let item of detectedFrameworks) {
        const answer = await promptModify(item);

        let inputs;

        if (answer.isModifyConfig) {
          inputs = await modifyFrameworkConfig(item.config);
        } else {
          inputs = {};
          if (isObject(item.config)) {
            inputs = Object.entries(item.config).reduce((prev: any, cur: any) => {
              prev[cur[0] as string] = cur[1].value;
              return prev;
            }, {} as any);
          }
        }
        plugins[item.key] = {
          use: item.plugin,
          inputs,
        };
      }
    }

    let name: string = path.basename(projectPath);

    const nameAnswer = await inquirer.prompt({
      type: 'input',
      name: 'name',
      message:
        '请输入应用唯一标识(支持大小写字母数字及连字符, 同一账号下不能相同)',
      default: name,
    });

    finalFrameworkConfig = {
      name: nameAnswer.name,
      plugins,
    };

    // 是否写入配置文件
    const answer = await promptWriteConfig();
    if (answer.isWriteConfig) {
      await writeConfig(projectPath, config, finalFrameworkConfig);
    }
  }

  return finalFrameworkConfig;
}

function promptModify(framework: any) {
  return inquirer.prompt({
    type: 'confirm',
    name: 'isModifyConfig',
    message: `检测到当前项目包含 ${framework.name} 项目

${formatFrameworkConfig(framework.config)}

  是否需要修改默认配置`,
    default: false,
  });
}

function promptWriteConfig() {
  return inquirer.prompt({
    type: 'confirm',
    name: 'isWriteConfig',
    message: '是否需要保存当前项目配置，保存配置之后下次不会再次询问',
  });
}

function formatFrameworkConfig(config: any) {
  if (!isObject(config)) {
    return '';
  }
  return Object.entries(config)
    .map(
      ([, config]) =>
        `  ${(config as any).desc} \`${chalk.green((config as any).value)}\``
    )
    .join('\n');
}

function modifyFrameworkConfig(frameworkConfig: any = {}) {
  return inquirer.prompt(
    Object.entries(frameworkConfig).map(([name, config]) => {
      return {
        type: 'input',
        name,
        message: (config as any).desc,
        default: (config as any).value,
      };
    })
  );
}

async function writeConfig(
  projectPath: string,
  config: any,
  frameworkConfig: any
) {
  const configJsonPath = path.join(projectPath, 'cloudbaserc.json');

  if (fs.existsSync(configJsonPath)) {
    const parser = new ConfigParser({
      configPath: configJsonPath,
    });
    parser.update('framework', frameworkConfig);
  } else {
    fs.writeFileSync(
      path.join(projectPath, FRAMEWORK_CONFIG_FILENAME),
      JSON.stringify(frameworkConfig, null, 4)
    );
  }
}

function readFrameworkConfig(projectPath: string) {
  let config;
  try {
    config = JSON.parse(
      fs.readFileSync(path.join(projectPath, FRAMEWORK_CONFIG_FILENAME), 'utf8')
    );
  } catch (e) {}
  return config;
}
