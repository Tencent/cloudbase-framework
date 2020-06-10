import { resolve } from "path";
import fs from "fs-extra";
import getLogger, { Logger } from "../logger";

interface BuilderOptions {
  type: string;
  projectPath: string;
}
interface BuildResult {
  functions?: {
    name: string;
    options: any;
    source: string;
    entry: string;
  }[];
  routes?: {
    path: string;
    targetType: string;
    target: string;
  }[];
  static?: {
    src: string;
    cloudPath: string;
  }[];
}

export abstract class Builder {
  protected distDir: string;
  protected projectDir: string;
  protected distDirName: string;
  protected logger: Logger;
  constructor(options: BuilderOptions) {
    const { type, projectPath } = options;
    this.distDirName = `cloudbase-${type}-build-${new Date().getTime()}`;
    this.projectDir = projectPath;
    this.distDir = resolve(projectPath, this.distDirName);
    this.logger = getLogger();
  }

  abstract async build(...args: any): Promise<BuildResult>;

  async clean() {
    return fs.remove(this.distDir);
  }
}
