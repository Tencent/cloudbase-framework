import fs from "fs";
import path from "path";

import merge from "lodash.merge";
import JSYaml from "js-yaml";
import ProgressBar from "progress";

import { DEFAULT_SAM } from "./default-sam";
import { SUPPORTS_TYPE } from "./sam-supports";
import { SamApi } from "./api";
import getLogger from "../logger";

const logger = getLogger();

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
    this.samObj = merge(DEFAULT_SAM, meta, ...samSections);

    this.samObj.Resources = Object.entries(this.samObj.Resources)
      .filter(([, resource]: any) => (SUPPORTS_TYPE as any)[resource.Type])
      .reduce((prev: Record<string, any>, cur) => {
        const [name, resource] = cur;
        prev[name] = resource;
        return prev;
      }, {});
    const samYaml = JSYaml.safeDump(this.samObj);
    fs.writeFileSync(path.join(this.projectPath, "TCBSAM.yaml"), samYaml);
  }

  /**
   * 安装
   */
  async install() {
    const template = this.readSam();
    let extensionId: string;

    try {
      const res = await this.samApi.createAndInstall(JSON.stringify(template));
      extensionId = res.ExtensionId;
    } catch (e) {
      if (e.code === "ResourceInUse") {
        extensionId = e.original.Message;
      } else {
        throw e;
      }
    }

    const bar = new ProgressBar("正在部署[:bar] :percent :elapsed s", {
      complete: "░",
      incomplete: " ",
      width: 40,
      total: 100,
    });
    let percent = 0;

    await this.waitUntil(async () => {
      const statusRes = await this.samApi.fetchExtensionTaskStatus([
        extensionId,
      ]);

      const taskInfos = statusRes.ExtensionTaskInfo;

      const taskInfo = taskInfos[0];

      if (taskInfo) {
        const delta = (taskInfo.Percent || 0) - percent;
        percent = taskInfo.Percent || 0;
        bar.tick(delta);

        if (taskInfo.Status === "running") {
          return true;
        } else if (taskInfo.Detail) {
          logger.error(statusRes);
          throw new Error(
            `部署失败，错误信息：${taskInfo.Detail}， 请求RequestId：${statusRes.RequestId}`
          );
        }
      }

      return taskInfos.filter((item: any) => ["running"].includes(item.Status))
        .length;
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
