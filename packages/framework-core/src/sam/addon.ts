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
import merge from 'lodash.merge';

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
      const cpu: 1 | 2 | 4 | 8 | 16 = plan?.Cpu;

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
              ...(plan ? { Cpu: plan?.Cpu, MemorySize: plan?.Memory } : {}),
              UseInstanceId: true,
              Port: 3306,
              Password: `\${Inputs.${passwordKey}}`, // 支持引用Inputs内容，且支持拼接字符串
              StorageLimit: STORAGE_LIMIT_MAP[cpu], //最大存储容量
              InstanceCount: 1, //计算实例数 1-4
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
