import path from 'path'
import fs from 'fs-extra'
import { Builder } from '@cloudbase/framework-core'

interface StaticBuilderBuildOptions {
    /**
     * 云接入路径
     */
    path: string
}

interface StaticBuilderOptions {
    /**
     * 项目根目录的绝对路径
     */
    projectPath: string
}

export class StaticBuilder extends Builder {
  constructor(options: StaticBuilderOptions) {
    super({
        type: 'static',
        ...options
    });
  }
  async build(entry: string, options?: StaticBuilderBuildOptions) {
    await fs.copy(entry, this.distDir);
    return {
      static: [
        {
          src: this.distDir,
          cloudPath: options ? options.path || '/' : '/',
        },
      ],
      routes: [
        {
          path: options ? options.path || '/' : '/',
          targetType: 'static',
        },
      ],
    };
  }
};
