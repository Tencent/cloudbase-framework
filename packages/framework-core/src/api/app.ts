/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2025 Tencent.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
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
  Tags,
}: {
  Name: string;
  Parameters: Record<string, string>[];
  RcJson: string;
  Source: Record<string, any>;
  AddonConfig: string;
  NetworkConfig: string;
  Tags: string[];
}) {
  return CloudApi.tcbService.request('CreateAndDeployCloudBaseProject', {
    Name,
    Parameters,
    RcJson,
    Source,
    AddonConfig,
    NetworkConfig,
    Tags,
    Type: 'framework-oneclick-local',
  });
}

/**
 * 上报部署状态
 */
export function reportCloudBaseCIResultCallback({
  ciId,
  extensionId,
  failReason,
  status,
  buildLog,
  failType,
}: {
  ciId: string;
  extensionId?: string;
  failReason?: string;
  failType?: string;
  status: number;
  buildLog: string;
}) {
  return CloudApi.tcbService.request('CloudBaseCIResultCallback', {
    CIID: ciId,
    TraceId: ciId,
    ExtensionID: extensionId,
    FailReason: failReason,
    Status: status,
    BuildLog: buildLog,
    FailType: failType,
  });
}
