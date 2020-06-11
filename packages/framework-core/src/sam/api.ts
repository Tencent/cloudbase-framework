import { CloudApiService } from "@cloudbase/cloud-api";

export interface ISamApiOptions {
  secretId: string;
  secretKey: string;
  token: string;
  envId: string;
}

export class SamApi {
  protected tcbService: CloudApiService;

  constructor({ secretId, secretKey, token, envId }: ISamApiOptions) {
    this.tcbService = new CloudApiService({
      service: "tcb",
      credential: {
        secretId,
        secretKey,
        token,
      },
      baseParams: { EnvId: envId },
      ...(process.env.http_proxy ? { proxy: process.env.http_proxy } : {}),
    });
  }

  /**
   *
   * 创建私有版本并部署
   * @param template
   * 返回
   * ExtensionId	String	扩展ID
   * RequestId	String	唯一请求 ID，每次请求都会返回。定位问题时需要提供该次请求的 RequestId。
   */

  createAndInstall(template: string) {
    return this.tcbService.request("CreatePrivateExtensionAndInstall", {
      Template: template,
    });
  }

  /**
   * 查询扩展任务的状态
   */
  fetchExtensionTaskStatus(ids: string[]) {
    return this.tcbService.request("DescribeExtensionTaskStatus", {
      ExtensionIds: ids,
    });
  }
}
