/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import { CloudApi } from '@cloudbase/framework-core';
import fs from 'fs';

export interface IApiOptions {
  secretId: string;
  secretKey: string;
  token: string;
  envId: string;
}

export class ContainerApi {
  protected cloudApi: typeof CloudApi;

  constructor(cloudApi: typeof CloudApi, public logger: any) {
    this.cloudApi = cloudApi;
  }

  /**
   *
   * 上传代码到 Coding
   * @param serviceName
   * @param filePath
   */
  async upload(
    serviceName: string,
    filePath: string
  ): Promise<Record<string, string>> {
    const res = await this.describeCloudBaseBuildService(serviceName);
    const { UploadHeaders = [], UploadUrl, PackageVersion, PackageName } = res;

    this.logger.debug(
      'describeCloudBaseBuildService',
      res,
      serviceName,
      filePath
    );

    const data = {
      method: 'PUT',
      body: fs.createReadStream(filePath),
      headers: {
        ...UploadHeaders.reduce(
          (
            prev: Record<string, string>,
            cur: { Key: string; Value: string }
          ) => {
            prev[cur.Key] = cur.Value;
            return prev;
          },
          {}
        ),
        ContentType: 'application/octet-stream',
      },
    };

    const response = await this.cloudApi.fetchStream(
      UploadUrl,
      data,
      process.env.http_proxy
    );

    if (response.status !== 200) {
      console.error(response.url, response.statusText);
      throw new Error('部署云托管代码失败');
    }

    return {
      PackageVersion,
      PackageName,
    };
  }

  /**
   * 查询 Coding 部署信息
   */
  describeCloudBaseBuildService(serviceName: string) {
    return this.cloudApi.tcbService.request('DescribeCloudBaseBuildService', {
      ServiceName: serviceName,
      CIBusiness: 'cloudbaserun',
    });
  }

  /**
   * 查询指定服务下版本列表
   */
  getServerVersions(serverName: string) {
    return this.cloudApi.tcbService.request('DescribeCloudBaseRunServer', {
      ServerName: serverName,
      Offset: 0,
      Limit: 20,
    });
  }

  /**
   * 查询指定版本详情
   */
  getVersionDetail(serverName: string, versionName: string) {
    return this.cloudApi.tcbService.request(
      'DescribeCloudBaseRunServerVersion',
      {
        ServerName: serverName,
        VersionName: versionName,
      }
    );
  }
}
