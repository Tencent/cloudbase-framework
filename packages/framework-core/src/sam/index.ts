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

    // this.samObj.Resources = this.samObj.Resources.filter(
    //   (resource: Record<string, any>) => (SUPPORTS_TYPE as any)[resource.Type]
    // );
    const samYaml = JSYaml.safeDump(this.samObj);
    fs.writeFileSync(path.join(this.projectPath, "TCBSAM.yaml"), samYaml);
  }

  /**
   * 安装
   */
  async install() {
    const template = this.readSam();
    // @todo
    // progress
    const res = await this.samApi.createAndInstall(JSON.stringify(template));
    const extensionId = res.ExtensionId;

    this.waitUntil(async () => {
      const statusRes = await this.samApi.fetchExtensionTaskStatus([
        extensionId,
      ]);
      console.log(statusRes);
      const taskInfos = statusRes.ExtensionTaskInfo;

      return (
        taskInfos.filter((item: any) =>
          ["installing", "uninstalling", "running"].includes(item.Status)
        ).length === 0
      );
    });
  }

  async waitUntil(fn: () => Promise<boolean>, interval?: 5000) {
    return new Promise((resolve, reject) => {
      const timer = setInterval(async () => {
        try {
          const result = await fn();
          if (result) {
            resolve();
            clearInterval(timer);
          }
        } catch (e) {
          clearInterval(timer);
          reject(e);
        }
      }, interval || 5000);
    });
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
