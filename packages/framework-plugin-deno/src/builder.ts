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
import fs from 'fs-extra';
import { Builder } from '@cloudbase/framework-core';

interface BuilderOptions {
  // 项目根目录的绝对路径
  projectPath: string;
}

export class DenoBuilder extends Builder {
  constructor(options: BuilderOptions) {
    super({
      type: 'deno',
      ...options,
    });
  }

  async build(localDir: string, options: object) {
    const { distDir, projectDir } = this;
    const spec: any = {
      runtime: 'latest',
      denonVersion: '',
      name: 'deno-app',
      path: '/deno-app',
      autoBuild: true,
      ...options,
    };

    const containerName = spec.name;
    const appDir = path.join(distDir, containerName);

    spec.denoVersion = '';
    if (spec.runtime && spec.runtime !== 'latest') {
      spec.denoVersion = `-s ${spec.runtime}`;
    }

    fs.ensureDirSync(appDir);

    await Promise.all([
      this.generator.generate(
        path.join(__dirname, '../assets'),
        appDir,
        spec
      ),
      fs.copy(path.join(projectDir, localDir), appDir),
    ]);

    return {
      containers: [
        {
          name: containerName,
          options: {},
          source: appDir,
        },
      ],
      routes: [
        {
          path: spec.path,
          targetType: 'container',
          target: containerName,
        },
      ],
    };
  }
}
