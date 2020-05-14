import path from 'path'
import fs from 'fs-extra'
import { Builder } from '@cloudbase/framework-core'
import cpy from 'cpy'
import anymatch from 'anymatch'

interface StaticBuilderBuildOptions {
  /**
   * 云接入路径
   */
  path?: string,
  exclude?: string[]
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
  async build(entry: string, options: StaticBuilderBuildOptions = {}) {
    const fileList = await fs.readdir(entry)
    const exclude = options.exclude || []
    for (const file of fileList) {
      await cpy(
        [path.resolve(entry, file)],
        this.distDir,
        {
          filter: () => {
            const matchers = [...exclude]
            return !anymatch(matchers, file);
          }
        }
      )
    }
    return {
      static: [
        {
          src: this.distDir,
          cloudPath: options.path || '/'
        },
      ],
      routes: [
        {
          path: options.path || '/',
          targetType: 'static',
          target: options.path || '/'
        },
      ]
    };
  }
};
