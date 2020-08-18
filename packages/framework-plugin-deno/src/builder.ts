import path from 'path';
import fs from 'fs-extra';
import { Builder } from '@cloudbase/framework-core';

interface BuilderOptions {
  // 项目根目录的绝对路径
  projectPath: string;
}

interface BuilderBuildOptions {
  // 使用镜像
  dockerImage?: string;
  // 运行时环境
  runtime?: string;
  // 启动入口文件
  entry?: string;
  // 启动参数
  runOptions?: Array<string>;
  // 路径
  path: string;
  // 服务名
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
    const spec:any = {
      ...options,
    };

    spec.denoVersion = '';
    if (spec.runtime && spec.runtime !== 'latest') {
      spec.denoVersion = `-s ${spec.runtime}`
    }

    spec.denoRunOptions = '';
    if (!spec.runOptions || spec.runOptions.length <= 0) {
      spec.denoRunOptions = '"--allow-env",'
    } else {
      spec.denoRunOptions = spec.runOptions.map((option:string) => {
        return `"${option}"`;
      }).join(',')
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
          path: options.path,
          targetType: 'container',
          target: containerName,
        },
      ],
    };
  }
}
