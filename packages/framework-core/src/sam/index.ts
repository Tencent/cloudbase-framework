import fs from "fs";
import path from "path";

import merge from "lodash.merge";
import JSYaml from "js-yaml";

import { DEFAULT_SAM } from "./default-sam";
import { SUPPORTS_TYPE } from "./sam-supports";
import { SamApi } from "./api";

export interface ISamManagerOptions {
  projectPath: string;
}

export class SamManager {
  protected samObj: Record<string, any> = {};
  protected projectPath: string;
  protected samApi: SamApi;

  constructor({ projectPath }: ISamManagerOptions) {
    this.projectPath = projectPath;
    this.samApi = new SamApi();
  }

  /**
   * 生成 SAM 文件
   *
   */
  generate(meta: Record<string, any>, samSections: Record<string, any>[]) {
    // @todo sam support check
    this.samObj = merge(DEFAULT_SAM, meta, ...samSections);
    const samYaml = JSYaml.safeDump(this.samObj);
    fs.writeFileSync(path.join(this.projectPath, "TCBSAM.yaml"), samYaml);
  }

  /**
   * 安装
   */
  install() {
    const template = this.readSam();
    // @todo
    // progress
    return this.samApi.createAndInstall(template);
  }

  /**
   * 读取本地SAM
   */
  readSam() {
    const samFile = fs.readFileSync(
      path.join(this.projectPath, "TCBSAM.yaml"),
      "utf-8"
    );
    return JSYaml.safeLoad(samFile);
  }
}
