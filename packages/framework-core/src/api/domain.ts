import { CloudApi } from ".";

export async function describeStaticRes() {
  return CloudApi.tcbService.request("DescribeStaticStore", {});
}

export async function describeCloudBaseGWService() {
  return CloudApi.tcbUinService.request("DescribeCloudBaseGWService", {
    ServiceId: CloudApi.envId,
  });
}

export async function fetchDomains() {
  const gwServiceInfo = await describeCloudBaseGWService();
  const staticResInfo = await describeStaticRes();
  return {
    static: staticResInfo?.Data?.[0].CdnDomain,
    service: gwServiceInfo?.DefaultDomain,
  };
}
