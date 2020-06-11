import path from "path";
import fse from "fs-extra";

import { Builder } from "@cloudbase/framework-core";

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
      type: "node",
      ...options,
    });
  }
  async build(options?: NodeContainerBuilderBuildOptions) {
    const { distDir } = this;

    await Promise.all([
      this.generator.generate(
        path.join(__dirname, "../assets/Dockerfile"),
        distDir,
        options || {}
      ),
      this.generator.generate(
        path.join(__dirname, "../assets/__launcher.js"),
        distDir,
        options || {}
      ),
      fse.copy(path.join(this.projectDir), distDir),
    ]);

    return {
      container: [
        {
          name: "node-container",
          options: {},
          source: distDir,
          entry: options?.entry || "",
        },
      ],
    };
  }
}
