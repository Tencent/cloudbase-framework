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
            frameworks.findIndex((item: any) => item.plugin === framework.plugin) < 0
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

  return JSON.parse(JSON.stringify(frameworkConfig, (key: string, value) => {
    if (typeof value === 'string' && value.includes('`')) {
      return new Function('data', `return ${value}`)(data);
    }
    return value;
  }));
}
