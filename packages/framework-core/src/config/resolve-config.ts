/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import merge from 'lodash.merge';

import { ICloudBaseConfig } from '../types';
import { isObject } from '../utils/type-check';
import { detect } from '../detect-frameworks';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';
import { ConfigParser } from '@cloudbase/toolbox';
import { describeCloudBaseProjectLatestVersionList } from '../api/app';
import getLogger from '../logger';
import { genClickableLink } from '../utils/link';
import { validate } from './validate';
import { ERRORS, CloudBaseFrameworkError } from '../error';

chalk.level = 1;

const FRAMEWORK_CONFIG_FILENAME = 'cloudbase-framework.json';
const DEFAULT_CONFIG = {
  envId: '',
  version: '2.0',
  $schema: 'https://framework-1258016615.tcloudbaseapp.com/schema/latest.json',
};

export default async function resolveConfig(
  projectPath: string,
  config: ICloudBaseConfig | undefined,
  envId: string
) {
  const logger = getLogger();
  const isCloudBuild = !!process.env.CLOUDBASE_CIID;

  // 解析配置文件
  const { rcConfig, extraData, projectName, originProjectInfo } =
    await resolveRcConfig(projectPath, config, envId);

  // 针对 cloudbaserc.js 等脚本文件，会创建一份单独的 json 配置文件
  const independentFrameworkConfig = await readFrameworkConfig(projectPath);

  let originFrameworkConfig = independentFrameworkConfig || rcConfig?.framework;
  let finalFrameworkConfig = originFrameworkConfig;

  if (!Object.keys(originFrameworkConfig?.plugins || {}).length) {
    logger.debug('检测项目框架');
    const detectedFrameworks = await detect(projectPath, rcConfig);
    let plugins: any = {};
    let projectName = originFrameworkConfig?.name;

    if (detectedFrameworks.length) {
      for (let item of detectedFrameworks) {
        const answer = await promptModify(item);

        let inputs;

        if (answer.isModifyConfig) {
          inputs = await modifyFrameworkConfig(item.config);
        } else {
          inputs = {};
          if (isObject(item.config)) {
            inputs = Object.entries(item.config).reduce(
              (prev: any, cur: any) => {
                prev[cur[0] as string] = cur[1].value;
                return prev;
              },
              {} as any
            );
          }
        }
        plugins[item.key] = {
          use: item.plugin,
          inputs,
        };
      }
    } else {
      logger.warn('未检测到项目 plugins 设置，请手动填写配置文件');
    }

    if (!projectName) {
      const nameAnswer = await collectAppName(projectPath);

      projectName = nameAnswer;
    }

    finalFrameworkConfig = Object.assign({}, originFrameworkConfig, {
      name: projectName,
      plugins,
    });
  }

  if (projectName !== originFrameworkConfig?.name) {
    finalFrameworkConfig = Object.assign(
      {},
      originFrameworkConfig,
      finalFrameworkConfig,
      {
        name: projectName,
      }
    );
  }

  // 检查是否要写入配置文件
  //  是否写入配置文件
  const isRcConfigChanged = rcConfig !== config;
  const isFrameworkConfigChanged =
    finalFrameworkConfig !== originFrameworkConfig;

  logger.debug('RC 配置文件变更', isRcConfigChanged, rcConfig);
  logger.debug(
    'Framework 配置文件变更',
    isFrameworkConfigChanged,
    finalFrameworkConfig
  );

  if (!isCloudBuild && (isRcConfigChanged || isFrameworkConfigChanged)) {
    const answer = await promptWriteConfig();

    if (answer.isWriteConfig) {
      await writeConfig(
        projectPath,
        isRcConfigChanged && rcConfig,
        isFrameworkConfigChanged && finalFrameworkConfig
      );
    }
  }

  if (!Object.keys(finalFrameworkConfig.plugins || {}).length) {
    process.exit();
  }

  const validateRes = validate(
    Object.assign({}, rcConfig, {
      envId: envId,
      framework: finalFrameworkConfig,
    })
  );

  if (!validateRes.result) {
    throw new CloudBaseFrameworkError(
      `cloudbaserc.json 文件校验失败 ${validateRes.errorText}`,
      ERRORS.CONFIG_VALIDATE_ERROR
    );
  }
  logger.info('Validate config file success.');

  return {
    // 合并配置
    appConfig: merge({}, finalFrameworkConfig, extraData),
    originProjectInfo,
  };
}

async function getCloudProjectInfo(projectName: string | undefined) {
  let projectData;
  // 如果远程存在配置
  if (projectName) {
    const projectList = (
      await describeCloudBaseProjectLatestVersionList({
        ProjectName: projectName,
      })
    ).ProjectList;

    if (projectList?.length) {
      const projectInfo = projectList[0];
      projectData = getProjectDataFromProjectInfo(projectInfo);
    }

    return projectData;
  }
}

function getProjectDataFromProjectInfo(projectInfo: any) {
  const { Tags, Parameters, Source, AddonConfig, NetworkConfig, Name, RcJson } =
    projectInfo;

  return {
    rcConfig: jsonParse(RcJson),
    extraData: {
      repo: Source,
      tags: Tags,
      environment: Parameters.reduce((prev: any, cur: any) => {
        const { Value, Key } = cur;
        prev[Key] = Value;
        return prev;
      }, {}),
      network: jsonParse(NetworkConfig),
      addons: jsonParse(AddonConfig),
    },
    projectName: Name,
    originProjectInfo: projectInfo,
  };
}

async function resolveRcConfig(
  projectPath: string,
  config: ICloudBaseConfig | undefined,
  envId: string
) {
  const logger = getLogger();

  let rcConfig = config;
  let extraData = {};
  let projectName = config?.framework?.name;
  let originProjectInfo;

  // 如果是云端构建，addon 等信息环境变量中读取，配置优先读取本地，再读取环境变量中的信息
  if (process.env.CLOUDBASE_CIID) {
    logger.debug('云端构建场景');
    logger.debug('process.env', process.env);
    const cloudRcJSON = jsonParse(process.env.TCB_RC_JSON);

    extraData = getCIProjectInfo();
    // CLI 在 RC 文件不存在的情况下也会生成一份默认配置，需要确定有配置 framework 字段的情况下才取用本地配置
    rcConfig = rcConfig?.framework
      ? rcConfig
      : cloudRcJSON &&
        ((await ConfigParser.parseRawConfig(cloudRcJSON)) as ICloudBaseConfig);
    projectName = rcConfig?.framework?.name;
    // 如果是本地构建，且本地存在配置文件
  } else if (config?.framework) {
    logger.debug('本地构建，本地存在配置文件', config);
    if (!projectName) {
      projectName = await collectAppName(projectPath);
    }

    let cloudProjectInfo = await getCloudProjectInfo(projectName);

    // 如果远程存在同名项目，使用远程data配置和项目名
    if (cloudProjectInfo) {
      logger.debug('远程存在同名项目', cloudProjectInfo.projectName);
      extraData = cloudProjectInfo.extraData;
      originProjectInfo = cloudProjectInfo.originProjectInfo;
      // 远程没有同名项目，新建项目
    } else {
      logger.debug('远程不存在同名项目，新建项目');
      if (config.framework?.requirement?.addons?.length) {
        throw new Error(
          `本地 CLI 暂不支持创建 cloudbaserc.json 中包含 Addon 配置的项目，请通过云端一键部署来创建项目
  参考文档地址： ${genClickableLink(
    'https://docs.cloudbase.net/framework/deploy-button.html'
  )}`
        );
      }
      extraData = {};
    }
    // 如果本地构建，且没有配置文件
  } else {
    logger.debug('本地构建，本地不存在配置文件', config);
    // 没有选择项目，新建项目, 配置使用模板
    projectName = await collectAppName(projectPath);
    extraData = {};
    rcConfig = Object.assign({}, DEFAULT_CONFIG, config, {
      envId,
      framework: {
        name: projectName,
        plugins: {},
      },
    });
  }

  logger.debug(
    '项目配置信息',
    'rcConfig',
    rcConfig,
    'extraData',
    extraData,
    'projectName',
    projectName
  );

  return {
    rcConfig,
    extraData,
    projectName,
    originProjectInfo,
  };
}

async function collectAppName(projectPath: string): Promise<string> {
  const logger = getLogger();
  let name: string = path.basename(projectPath);

  let nameAnswer = await inquirer.prompt({
    type: 'input',
    name: 'name',
    message: '请输入应用唯一标识(支持 A-Z a-z 0-9 及 -, 同一环境下不能相同)',
    default: name,
  });
  let pattern = /^[A-Za-z0-9-]*$/;
  if (!pattern.exec(nameAnswer.name) || nameAnswer.name.length > 16) {
    logger.info(
      '请输入正确的应用名称，支持 A-Z a-z 0-9 及 -, 只能用字母开头，最长 16 位'
    );
    return await collectAppName(projectPath);
  }

  return nameAnswer.name;
}

function jsonParse(str: string | undefined) {
  let json;
  try {
    json = str ? JSON.parse(str) : undefined;
  } catch (e) {
    throw new Error(`JSON 格式错误: ${str}`);
  }
  return json;
}

function getCIProjectInfo() {
  return {
    repo: jsonParse(process.env.TCB_CODE_REPO),
    tags: jsonParse(process.env.TCB_TAGS),
    environment: jsonParse(process.env.TCB_ENVIRONMENT), // 环境变量
    network: jsonParse(process.env.TCB_NETWORK_CONFIG), // 网络配置
    addons: jsonParse(process.env.TCB_ADDON_CONFIG), // 云上关联的资源
  };
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
    message: '是否需要保存当前项目配置到项目中',
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
  rcConfig: any,
  frameworkConfig: any
) {
  const configJsonPath = path.join(projectPath, 'cloudbaserc.json');

  if (rcConfig) {
    fs.writeFileSync(configJsonPath, JSON.stringify(rcConfig, null, 4));
  }

  if (fs.existsSync(configJsonPath) && frameworkConfig) {
    const parser = new ConfigParser({
      configPath: configJsonPath,
    });
    await parser.update('framework', frameworkConfig);
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
