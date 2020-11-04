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
import { CloudApiService, fetchStream, fetch } from '@cloudbase/cloud-api';

export interface ICloudApiOptions {
  secretId: string;
  secretKey: string;
  token: string;
  envId: string;
}

export class CloudApi {
  constructor() {}

  static init({ secretId, secretKey, token, envId }: ICloudApiOptions) {
    CloudApi.envId = envId;
    CloudApi.tcbService = new CloudApiService({
      service: 'tcb',
      credential: {
        secretId,
        secretKey,
        token,
      },
      baseParams: { EnvId: envId },
      ...(process.env.http_proxy ? { proxy: process.env.http_proxy } : {}),
    });
    CloudApi.tcbUinService = new CloudApiService({
      service: 'tcb',
      credential: {
        secretId,
        secretKey,
        token,
      },
      ...(process.env.http_proxy ? { proxy: process.env.http_proxy } : {}),
    });
  }

  public static tcbService: CloudApiService;
  // 账号维度的 TCB 服务，不需要传入 EnvId
  public static tcbUinService: CloudApiService;
  public static envId: string;

  public static fetchStream = fetchStream;
  public static fetch = fetch;
}
