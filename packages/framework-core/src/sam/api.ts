import { CloudApi } from "../api";

export class SamApi {
  constructor() {}

  /**
   *
   * 创建私有版本并部署
   * @param template
   * 返回
   * ExtensionId	String	扩展ID
   * RequestId	String	唯一请求 ID，每次请求都会返回。定位问题时需要提供该次请求的 RequestId。
   */

  createAndInstall(template: string) {
    return CloudApi.tcbService.request("CreatePrivateExtensionAndInstall", {
      Template: template,
    });
  }

  /**
   * 查询扩展任务的状态
   */
  fetchExtensionTaskStatus(ids: string[]) {
    return CloudApi.tcbService.request("DescribeExtensionTaskStatus", {
      ExtensionIds: ids,
    });
  }

  /**
   * 上报部署状态
   */
  reportCloudBaseCIResultCallback(
    ciId: string,
    traceId: string,
    extensionId: string
  ) {
    return CloudApi.tcbService.request("CloudBaseCIResultCallback", {
      CIID: ciId,
      TraceId: traceId,
      ExtensionID: extensionId,
    });
  }
}
