import { resolve } from "path";
import fs from "fs-extra";
import getLogger, { Logger } from "../logger";

interface BuilderOptions {
  type: "node" | "static";
  projectPath: string;
}
export class Builder {
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

  async clean() {
    return fs.remove(this.distDir);
  }
}
