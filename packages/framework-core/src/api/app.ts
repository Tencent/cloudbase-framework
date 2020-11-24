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
import { CloudApi } from '.';

/**
 * 查询项目列表
 */
export async function describeCloudBaseProjectLatestVersionList({
  PageSize = 100,
  ProjectName,
  Offset = 0,
}: {
  PageSize?: number;
  ProjectName?: string;
  Offset?: number;
}) {
  return CloudApi.tcbService.request(
    'DescribeCloudBaseProjectLatestVersionList',
    {
      PageSize,
      ProjectName,
      Offset,
    }
  );
}

/**
 * 创建一次部署
 */
export async function createAndDeployCloudBaseProject({
  Name,
  Parameters,
  RcJson,
  Source,
  AddonConfig,
  NetworkConfig,
}: {
  Name: string;
  Parameters: Record<string, string>[];
  RcJson: string;
  Source: Record<string, any>;
  AddonConfig: string;
  NetworkConfig: string;
}) {
  return CloudApi.tcbService.request('CreateAndDeployCloudBaseProject', {
    Name,
    Parameters,
    RcJson,
    Source,
    AddonConfig,
    NetworkConfig,
    Type: 'framework-oneclick-local',
  });
}
