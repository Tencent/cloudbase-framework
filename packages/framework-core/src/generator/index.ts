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
import ejs from 'ejs';
import fse from 'fs-extra';
import fs from 'fs';
import { promisify } from 'util';

const renderFile = promisify(ejs.renderFile);

export class Generator {
  // 复制文件
  async generate(
    templates: string,
    distDir: string,
    data: Record<string, any>
  ) {
    fse.ensureDirSync(distDir);

    const destFiles: string[] = [];
    await fse.copy(templates, distDir, {
      filter(src, dest) {
        destFiles.push(dest);
        return true;
      },
    });

    return Promise.all(
      destFiles
        .filter((file) => fs.lstatSync(file).isFile())
        .map((file) =>
          (renderFile as any)(file, data).then((content: string) =>
            fse.writeFile(file, content)
          )
        )
    );
  }
}
