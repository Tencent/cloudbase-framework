/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import { CloudApiService, fetchStream, fetch } from '@cloudbase/cloud-api';
import { getProxy } from '@cloudbase/toolbox';

export interface ICloudApiOptions {
  secretId: string;
  secretKey: string;
  token: string;
  envId: string;
}

export class CloudApi {
  public static tcbService: CloudApiService;
  // 账号维度的 TCB 服务，不需要传入 EnvId
  public static tcbUinService: CloudApiService;
  public static envId: string;

  public static fetchStream = fetchStream;
  public static fetch = fetch;

  static init({ secretId, secretKey, token, envId }: ICloudApiOptions) {
    const proxy = getProxy();
    CloudApi.envId = envId;
    CloudApi.tcbService = new CloudApiService({
      service: 'tcb',
      credential: {
        secretId,
        secretKey,
        token,
      },
      baseParams: { EnvId: envId },
      ...(proxy ? { proxy } : {}),
    });
    CloudApi.tcbUinService = new CloudApiService({
      service: 'tcb',
      credential: {
        secretId,
        secretKey,
        token,
      },
      ...(proxy ? { proxy } : {}),
    });
  }

  constructor() {}
}
