import merge from "lodash.merge";

const ADDONS: Record<string, any> = {
  CFS: {
    translate(addonConfig: Record<string, any>) {
      const { name, instanceId, region, vpcId } = addonConfig;
      return {
        Resources: {
          [name]: {
            Type: "CloudBase::CFS",
            Properties: {
              InstanceName: name, // 集群名称
              Region: region || "${TcbEnvRegion}", // 区域信息
              UniqVpcId: vpcId || "${Outputs.Network.Properties.InstanceId}",
              NetInterface: "VPC",
              StorageType: "SD",
              InstanceId: instanceId,
            },
          },
        },
      };
    },
  },
  CynosDB: {
    translate(addonConfig: Record<string, any>) {
      const { name, instanceId, region, vpcId, password, plan } = addonConfig;
      const passwordKey = `${name}_PASSWORD`;

      return {
        Inputs: {
          ...(password
            ? {
                [passwordKey]: password,
              }
            : {}),
        },
        Resources: {
          [name]: {
            Type: "CloudBase::CynosDB",
            Properties: {
              InstanceName: name, // 集群名称
              Region: region || "${TcbEnvRegion}", // 区域信息
              UniqVpcId: vpcId || "${Outputs.Network.Properties.InstanceId}",
              DbType: "MYSQL",
              DbVersion: "5.7",
              PayMode: 0, // 0:后付费 1: 预付费
              ...(plan ? { Cpu: plan?.Cpu, MemorySize: plan?.MemorySize } : {}),
              Port: 3306,
              Password: `\${Inputs.${passwordKey}}`, // 支持引用Inputs内容，且支持拼接字符串
              StorageLimit: 1000, //最大存储容量
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
    const { type, name } = cur;
    if (!((type as string) in ADDONS)) {
      throw new Error(`Addon type ${type} 暂不支持`);
    }

    const translate = ADDONS[type as string]?.translate;
    const Sam = translate(cur);

    merge(prev, Sam);

    return prev;
  }, {});
}
