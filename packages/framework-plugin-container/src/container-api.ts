import { CloudApiService, fetchStream } from "@cloudbase/cloud-api";
import fs from "fs";

export interface IApiOptions {
  secretId: string;
  secretKey: string;
  token: string;
  envId: string;
}

export class ContainerApi {
  protected tcbService: CloudApiService;

  constructor({ secretId, secretKey, token, envId }: IApiOptions) {
    this.tcbService = new CloudApiService({
      service: "tcb",
      credential: {
        secretId,
        secretKey,
        token,
      },
      baseParams: { EnvId: envId },
      ...(process.env.http_proxy ? { proxy: process.env.http_proxy } : ""),
    });
  }

  /**
   *
   * 上传代码到 Coding
   * @param packageName
   * @param version
   * @param filePath
   */
  async upload(packageName: string, version: string, filePath: string) {
    const res = await this.describeCloudBaseRunBuildServer();
    const {
      TeamGlobalKey,
      ProjectName,
      PackageRepositoryName,
      ProjectGlobalKey,
      ProjectToken,
    } = res;

    const url = `https://${TeamGlobalKey}-generic.pkg.coding.net/${ProjectName}/${PackageRepositoryName}/${packageName}?version=${version}`;
    const authorization = Buffer.from(
      `${ProjectGlobalKey}:${ProjectToken}`
    ).toString("base64");

    const response = await fetchStream(
      url,
      {
        method: "PUT",
        body: fs.createReadStream(filePath),
        headers: {
          Authorization: `Basic ${authorization}`,
          ContentType: "application/octet-stream",
        },
      },
      process.env.http_proxy
    );

    if ((await response.text()) !== "success") {
      throw new Error("部署云应用代码失败");
    }
  }

  /**
   * 查询 Coding 部署信息
   */
  describeCloudBaseRunBuildServer() {
    return this.tcbService.request("DescribeCloudBaseRunBuildServer");
  }
}
