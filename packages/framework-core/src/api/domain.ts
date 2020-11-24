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

export async function describeStaticRes() {
  return CloudApi.tcbService.request('DescribeStaticStore', {});
}

export async function describeCloudBaseGWService() {
  return CloudApi.tcbUinService.request('DescribeCloudBaseGWService', {
    ServiceId: CloudApi.envId,
  });
}

export async function fetchDomains() {
  const gwServiceInfo = await describeCloudBaseGWService();
  const staticResInfo = await describeStaticRes();
  return {
    static: staticResInfo?.Data?.[0]?.CdnDomain,
    service: gwServiceInfo?.DefaultDomain,
  };
}
