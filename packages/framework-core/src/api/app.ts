import { CloudApi } from ".";

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
    "DescribeCloudBaseProjectLatestVersionList",
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
  return CloudApi.tcbService.request("CreateAndDeployCloudBaseProject", {
    Name,
    Parameters,
    RcJson,
    Source,
    AddonConfig,
    NetworkConfig,
    Type: "framework-oneclick-local",
  });
}
