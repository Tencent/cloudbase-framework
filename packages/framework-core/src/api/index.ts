/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import { CloudApiService, fetchStream, fetch } from '@cloudbase/cloud-api';
import {
  getProxy,
  getRegion,
  getCredentialWithoutCheck,
} from '@cloudbase/toolbox';

export interface ICloudApiOptions {
  envId: string;
}

const getCredential = async () => {
  const credential = await getCredentialWithoutCheck();
  if (!credential) {
    throw new Error('无有效身份信息，请使用 cloudbase login 登录');
  }

  return {
    ...credential,
    tokenExpired: credential.accessTokenExpired,
  };
};

export class CloudApi {
  public static tcbService: CloudApiService;
  // 账号维度的 TCB 服务，不需要传入 EnvId
  public static tcbUinService: CloudApiService;
  public static envId: string;

  public static fetchStream = fetchStream;
  public static fetch = fetch;

  static async init({ envId }: ICloudApiOptions) {
    const proxy = getProxy();
    const region = await getRegion();
    CloudApi.envId = envId;
    CloudApi.tcbService = new CloudApiService({
      service: 'tcb',
      getCredential,
      baseParams: { EnvId: envId },
      ...(region ? { region } : {}),
      ...(proxy ? { proxy } : {}),
    });
    CloudApi.tcbUinService = new CloudApiService({
      service: 'tcb',
      getCredential,
      ...(region ? { region } : {}),
      ...(proxy ? { proxy } : {}),
    });
  }

  constructor() {}
}
