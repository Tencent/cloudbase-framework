import { resolve } from "path";
import fs from "fs-extra";
import getLogger, { Logger } from "../logger";
import path from "path";
import os from "os";
import { Generator } from "../generator";

interface BuilderOptions {
  type: string;
  projectPath: string;
}
interface BuildResult {
  container?: {
    name: string;
    options: any;
    source: string;
    entry: string;
  }[];
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
  protected generator: Generator;
  constructor(options: BuilderOptions) {
    const { type, projectPath } = options;
    this.distDirName = `cloudbase-${type}-build-${new Date().getTime()}`;
    this.projectDir = projectPath;

    const buildsDir = path.join(os.homedir(), "cloudbase-framework/builds");

    this.distDir = resolve(buildsDir, this.distDirName);
    this.logger = getLogger();
    this.generator = new Generator();
  }

  abstract async build(...args: any): Promise<BuildResult>;

  async clean() {
    return fs.remove(this.distDir);
  }
}
