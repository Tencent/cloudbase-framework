import path from 'path';
import fs from 'fs-extra';
import { Builder } from '@cloudbase/framework-core';

interface BuilderOptions {
  /**
   * 项目根目录的绝对路径
   */
  projectPath: string;
}

interface BuilderBuildOptions {
  /**
   * 路径
   */
  path: string;

  /**
   * 服务名
   */
  name: string;
}

export class DenoBuilder extends Builder {
  constructor(options: BuilderOptions) {
    super({
      type: 'deno',
      ...options,
    });
  }

  async build(localDir: string, options: BuilderBuildOptions) {
    const { distDir, projectDir } = this;
    const containerName = options?.name || 'deno-app';
    const appDir = path.join(distDir, containerName);

    fs.ensureDirSync(appDir);

    await Promise.all([
      this.generator.generate(
        path.join(__dirname, "../assets"),
        appDir,
        options || {}
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
          path: options.path,
          targetType: 'container',
          target: containerName,
        },
      ],
    };
  }
}
