/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import merge from 'lodash.merge';

type cpuSpec = 1 | 2 | 4 | 8 | 16;

const ADDONS: Record<string, any> = {
  CFS: {
    translate(addonConfig: Record<string, any>) {
      const { name, instanceId, instanceName, region, vpcId } = addonConfig;
      return {
        Resources: {
          [name]: {
            Type: 'CloudBase::CFS',
            Properties: {
              Description: '为您提供安全可靠、可扩展的共享文件存储服务',
              InstanceName: instanceName, // 集群名称
              Region: region || '${TcbEnvRegion}', // 区域信息
              UniqVpcId: vpcId || '${Outputs.Network.Properties.InstanceId}',
              NetInterface: 'VPC',
              StorageType: 'SD',
              InstanceId: instanceId,
              UseInstanceId: true,
            },
          },
        },
      };
    },
  },
  CynosDB: {
    translate(addonConfig: Record<string, any>) {
      const {
        name,
        instanceId,
        instanceName,
        region,
        vpcId,
        password,
        plan,
      } = addonConfig;
      const passwordKey = `${name}_PASSWORD`;
      const STORAGE_LIMIT_MAP = {
        1: 1000,
        2: 5000,
        4: 10000,
        8: 10000,
        16: 20000,
      };
      let spec;

      if (!plan) {
        spec = {};
      } else if (plan.DbMode === 'serverless') {
        const { DbMode, MaxCpu, MinCpu, AutoPause, AutoPauseDelay } = plan;

        spec = {
          DbMode,
          MaxCpu,
          MinCpu,
          AutoPause,
          AutoPauseDelay,
          StorageLimit: STORAGE_LIMIT_MAP[Math.ceil(MaxCpu) as cpuSpec], // 最大存储容量
        };
      } else {
        const { Cpu, Memory } = plan;

        spec = {
          Cpu,
          MemorySize: Memory,
          StorageLimit: STORAGE_LIMIT_MAP[Cpu as cpuSpec], // 最大存储容量
        };
      }

      return {
        Inputs: {
          ...(password ? { [passwordKey]: password } : {}),
        },
        Resources: {
          [name]: {
            Type: 'CloudBase::CynosDB',
            Properties: {
              Description:
                '企业级云原生数据库，极速性能，海量存储，全面兼容开源数据库',
              InstanceName: instanceName, // 集群名称
              Region: region || '${TcbEnvRegion}', // 区域信息
              UniqVpcId: vpcId || '${Outputs.Network.Properties.InstanceId}',
              DbType: 'MYSQL',
              DbVersion: '5.7',
              PayMode: 0, // 0:后付费 1: 预付费
              // 规格信息
              ...spec,
              UseInstanceId: true,
              Port: 3306,
              Password: `\${Inputs.${passwordKey}}`, // 支持引用Inputs内容，且支持拼接字符串
              InstanceCount: 1, // 计算实例数 1-4
              InstanceId: instanceId,
            },
          },
        },
      };
    },
  },
};

export function genAddonSam(addons: Record<string, any>[]) {
  return addons.reduce((prev, cur) => {
    const { type } = cur;
    if (!((type as string) in ADDONS)) {
      throw new Error(`Addon type ${type} 暂不支持`);
    }

    const translate = ADDONS[type as string]?.translate;
    const Sam = translate(cur);

    merge(prev, Sam);

    return prev;
  }, {});
}
