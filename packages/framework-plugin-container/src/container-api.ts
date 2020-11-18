/**
 *
 * Copyright 2020 Tencent
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
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

    this.logger.debug('upload', data);

    const response = await this.cloudApi.fetchStream(
      UploadUrl,
      data,
      process.env.http_proxy
    );
    const text = await (await response.text()).trim();

    if (response.status !== 200) {
      console.error(response.url, response.statusText);
      throw new Error('部署云托管代码失败');
    }

    if (text !== 'success') {
      console.error(text);
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
    });
  }

  /**
   * 查询指定服务下版本列表
   */
  getServerVersions(serverName: string) {
    return this.cloudApi.tcbService.request('DescribeCloudBaseRunBuildServer', {
      Business: 'framework',
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
