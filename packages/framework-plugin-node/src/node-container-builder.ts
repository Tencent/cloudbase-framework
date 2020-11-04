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
import path from 'path';
import fse from 'fs-extra';

import { Builder } from '@cloudbase/framework-core';

interface NodeContainerBuilderBuildOptions {
  dockerImage: string;
  entry: string;
  installDeps?: boolean;
  port?: number;
  hasPackage?: boolean;
}

interface NodeContainerBuilderOptions {
  /**
   * 项目根目录的绝对路径
   */
  projectPath: string;
}

export class NodeContainerBuilder extends Builder {
  constructor(options: NodeContainerBuilderOptions) {
    super({
      type: 'node-container',
      ...options,
    });
  }
  async build(options?: NodeContainerBuilderBuildOptions) {
    const { distDir } = this;

    await Promise.all([
      this.generator.generate(
        path.join(__dirname, '../assets'),
        distDir,
        options || {}
      ),
      fse.copy(path.join(this.projectDir), distDir),
    ]);

    return {
      container: [
        {
          name: 'node-container',
          options: {},
          source: distDir,
          entry: options?.entry || '',
        },
      ],
    };
  }
}
