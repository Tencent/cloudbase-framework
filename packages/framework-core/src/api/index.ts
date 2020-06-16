import { CloudApiService, fetchStream, fetch } from "@cloudbase/cloud-api";

export interface ICloudApiOptions {
  secretId: string;
  secretKey: string;
  token: string;
  envId: string;
}

export class CloudApi {
  constructor() {}

  static init({ secretId, secretKey, token, envId }: ICloudApiOptions) {
    CloudApi.tcbService = new CloudApiService({
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

  public static tcbService: CloudApiService;

  public static fetchStream = fetchStream;
  public static fetch = fetch;
}
