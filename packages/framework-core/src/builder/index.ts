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
import { resolve } from 'path';
import fs from 'fs-extra';
import getLogger, { Logger } from '../logger';
import path from 'path';
import os from 'os';
import { Generator } from '../generator';
import { BuildResult, BuilderOptions } from '../types';

export abstract class Builder {
  protected distDir: string;
  protected projectDir: string;
  protected distDirName: string;
  protected logger: Logger;
  protected generator: Generator;
  constructor(options: BuilderOptions) {
    const { type, projectPath } = options;
    this.distDirName = `cloudbase-${type}-build-${new Date().getTime()}`;
    this.projectDir = projectPath;

    const buildsDir = path.join(os.homedir(), 'cloudbase-framework/builds');

    this.distDir = resolve(buildsDir, this.distDirName);
    this.logger = getLogger();
    this.generator = new Generator();
  }

  abstract async build(...args: any): Promise<BuildResult>;

  async clean() {
    return fs.remove(this.distDir);
  }
}
