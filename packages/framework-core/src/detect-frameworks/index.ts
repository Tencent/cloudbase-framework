/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import frameworksInfo from './frameworks';
import fs from 'fs';
import path, { resolve } from 'path';

import getLogger from '../logger';
import { ICloudBaseConfig } from '../types';

const logger = getLogger();

export async function detect(
  projectRootPath: string,
  projectConfig: ICloudBaseConfig | undefined
) {
  const frameworks: any = [];

  const finalFrameworksInfo = renderFrameworkConfig(frameworksInfo, {
    projectConfig,
    baseName: path.basename(projectRootPath),
  });

  for (const framework of finalFrameworksInfo) {
    for (const detect of framework.detect) {
      try {
        const { path, match, exists } = detect;

        let matchedFramework;

        if (typeof match !== 'undefined') {
          const content = await fs.promises.readFile(
            resolve(projectRootPath, path),
            'utf-8'
          );
          const matchResult = content.match(new RegExp(match));

          if (matchResult) {
            matchedFramework = matchResult;
          }
        } else if (typeof exists === 'boolean') {
          const fileExists = fs.existsSync(resolve(projectRootPath, path));
          matchedFramework = exists ? fileExists : !fileExists;
        }

        if (matchedFramework) {
          if (
            frameworks.findIndex(
              (item: any) => item.plugin === framework.plugin
            ) < 0
          ) {
            frameworks.push(framework);
          }
        }
      } catch (e) {
        logger.debug(e);
      }
    }
  }

  return frameworks;
}

function renderFrameworkConfig(frameworkConfig: any, data: any) {
  if (!frameworksInfo) return;

  return JSON.parse(
    JSON.stringify(frameworkConfig, (key: string, value) => {
      if (typeof value === 'string' && value.includes('`')) {
        return new Function('data', `return ${value}`)(data);
      }
      return value;
    })
  );
}
