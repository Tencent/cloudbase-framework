/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
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
