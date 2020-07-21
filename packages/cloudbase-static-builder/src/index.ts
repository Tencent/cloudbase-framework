import cpy from "cpy";
import { Builder } from "@cloudbase/framework-core";

interface StaticBuilderBuildOptions {
  /**
   * 云接入路径
   */
  path?: string;
}

interface StaticBuilderOptions {
  /**
   * 项目根目录的绝对路径
   */
  projectPath: string;
  copyRoot?: string;
}

export class StaticBuilder extends Builder {
  private copyRoot: string;
  constructor(options: StaticBuilderOptions) {
    super({
      type: "static",
      ...options,
    });
    this.copyRoot = options.copyRoot || this.projectDir;
  }
  async build(includes: string[], options: StaticBuilderBuildOptions = {}) {
    await cpy(includes, this.distDir, {
      cwd: this.copyRoot,
      parents: true,
    });
    return {
      static: [
        {
          src: this.distDir,
          cloudPath: options.path || "/",
        },
      ],
      routes: [
        {
          path: options.path || "/",
          targetType: "static",
          target: options.path || "/",
        },
      ],
    };
  }
}
