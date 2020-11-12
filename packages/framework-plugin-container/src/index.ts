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
import { Plugin, PluginServiceApi } from '@cloudbase/framework-core';
import { ContainerApi } from './container-api';
import { ContainerBuilder } from './builder';
import path from 'path';

const DEFAULT_INPUTS = {
  uploadType: 'package',
  description: '基于云开发 CloudBase Framework 部署的云托管',
  isPublic: true,
  flowRatio: 100,
  mode: 'low-cost',
  cpu: 0.25,
  mem: 0.5,
  minNum: 0,
  maxNum: 10,
  policyType: 'cpu',
  policyThreshold: 60,
  containerPort: 80,
  dockerfilePath: './Dockerfile',
  buildDir: './',
  version: '1.0.0',
  localPath: './',
  envVariables: {},
};
const MODE_INPUTS = {
  'low-cost': {
    cpu: 0.25,
    mem: 0.5,
    minNum: 0,
  },
  'high-availability': {
    cpu: 1,
    mem: 1,
    minNum: 1,
  },
};

/**
 * 导出接口用于生成 JSON Schema 来进行智能提示
 */
export interface IFrameworkPluginContainerInputs {
  /**
   * 容器镜像代码来源类别
   *
   * 支持`package|image|repository`3 种，分别代表本地代码包、镜像地址和 git 仓库地址。默认是`package`, 选择`image`时需要填写 `imageInfo`, 选择 `repository` 需要填写`codeDetail`
   */
  uploadType?: 'package' | 'image' | 'repository';
  /**
   * 服务名，字符串格式，如 `node-api`
   */
  serviceName: string;
  /**
   * 服务路径配置, 字符串格式, 如 `/node-api`
   */
  servicePath: string;
  /**
   * 服务描述
   */
  description?: string;
  /**
   * 是否对外网开放访问
   * @default true
   */
  isPublic?: boolean;
  /**
   * 副本模式
   *
   * 1.4.0 版本以后支持
   *
   * 支持 "low-cost" | "high-availability"
   * "low-cost" 代表低成本模式，会有冷启动延时，锁定最小副本数为0，规格默认值为0.25C0.5G，副本最小个数不可修改，要修改需要先切换模式。
   * "high-availability" 代表高可用模式，不存在冷启动，最小副本数不可以为0，规格默认值为1C1G，要修改最小副本数到0需要先切换模式。
   *
   * @default low-cost
   */
  mode?: 'low-cost' | 'high-availability';
  /**
   * 用户自定义采集日志路径
   *
   * String	1-1024
   * @maxLength 1024
   */
  customLogs?: string;
  /**
   * 延迟多长时间开始健康检查（单位s）0-1000
   *
   * @minimum 0
   * @maximum 1000
   *
   */
  initialDelaySeconds?: number;
  /**
   * 版本备注
   */
  versionRemark?: string;
  /**
   * 流量占比（0-100）
   * @minimum 0
   * @maximum 100
   *
   * @default 100
   */
  flowRatio?: number;
  /**
   * CPU 的大小，0.25-128, 单位：核，默认值 `0.25`
   * @default 0.25
   */
  cpu?: number;
  /**
   * Mem 的大小，0.5-128, 单位：G，默认值 `0.5`
   *
   * @default 0.5
   */
  mem?: number;
  /**
   * 最小副本数, 1-50，默认值 `0`
   *
   * @default 0
   */
  minNum?: number;
  /**
   * 最大副本数, 1-50，默认值 `10`
   *
   * @maximum 50
   * @default 10
   */
  maxNum?: number;
  /**
   * 策略类型(cpu)，默认值 `cpu`
   */
  policyType?: 'cpu';
  /**
   * 策略阈值，1-100, 默认值 `60`
   *
   * @minimum 0
   * @maximum 100
   *
   * @default 60
   */
  policyThreshold?: number;
  /**
   * 服务端口，默认值 `80`
   *
   * @default 80
   */
  containerPort?: number;
  /**
   * Dockerfile 的路径，默认值 `./Dockerfile`
   *
   * @default ./Dockerfile
   */
  dockerfilePath?: string;
  /**
   * 构建目录，默认值 `./`
   *
   * @default ./
   */
  buildDir?: string;
  /**
   * 服务版本名
   *
   * @default 1.0.0
   */
  version?: string;
  /**
   * 本地代码文件夹相对于项目根目录的路径
   * @default ./
   */
  localPath?: string;
  /**
   * 本地代码文件夹的绝对路径
   */
  localAbsolutePath?: string;
  /**
   * 环境变量键值对，会被注入到云托管的运行时环境变量中
   */
  envVariables?: Record<string, string>;
  /**
   * `uploadType` 填写为 `image`时需要填写 `imageInfo`，类型是对象格式
   */
  imageInfo?: IContainerImageInfo;
  /**
   * `uploadType` 填写为 `repository` 时需要填写`codeDetail`，类型是对象格式
   *
   * 例如
   *
   * ```json
   * {
   *   "envId": "{{envId}}",
   *   "framework": {
   *     "name": "capp-example",
   *     "plugins": {
   *       "client": {
   *         "use": "@cloudbase/framework-plugin-container",
   *         "inputs": {
   *           "serviceName": "deno",
   *           "servicePath": "/deno",
   *           "localPath": "./",
   *           "uploadType": "repository",
   *           "codeDetail": {
   *             "name": "deno-docker",
   *             "url": "https://github.com/TabSpace/deno-docker"
   *           }
   *         }
   *       }
   *     }
   *   }
   * }
   * ```
   */
  codeDetail?: IContainerCodeDetail;

  /**
   * 挂载目录
   * 1.4.0 版本以后支持
   * key 为挂载路径，value为挂载的 CFS Addon 的 Name
   */
  volumeMounts?: Record<string, string>;
}

interface IContainerImageInfo {
  /**
   * 镜像拉取地址
   *
   * imageUrl 格式为 [registry-url]/[namespace]/[image]:[tag]，支持腾讯云 ccr.ccs.tencentyun.com 上的镜像地址，也支持 dockerhub 公开的镜像，如 `nginx:latest`
   * 例如
   *
   * ```json
   * {
   *   "envId": "{{envId}}",
   *   "framework": {
   *     "name": "capp-example",
   *     "plugins": {
   *       "client": {
   *         "use": "@cloudbase/framework-plugin-container",
   *         "inputs": {
   *           "serviceName": "node-api",
   *           "servicePath": "/node-api",
   *           "localPath": "./",
   *           "uploadType": "image",
   *           "imageInfo": {
   *             "imageUrl": "ccr.ccs.tencentyun.com/tcb-100010952056-rjdt/webpage_node-api:node-api-001-1597238358"
   *           }
   *         }
   *       }
   *     }
   *   }
   * }
   * ```
   */
  imageUrl: string;
}

interface IContainerCodeDetail {
  /**
   * Repo的名字
   */
  name?: string;
  /**
   * Repo 的url
   */
  url: string;
}

type ResolvedInputs = typeof DEFAULT_INPUTS & IFrameworkPluginContainerInputs;

class ContainerPlugin extends Plugin {
  protected resolvedInputs!: ResolvedInputs;
  protected buildOutput: any;
  protected containerApi: ContainerApi;
  protected builder: ContainerBuilder;

  constructor(
    public name: string,
    public api: PluginServiceApi,
    public inputs: IFrameworkPluginContainerInputs
  ) {
    super(name, api, inputs);

    this.containerApi = new ContainerApi(this.api.cloudApi, this.api.logger);
    this.builder = new ContainerBuilder({
      projectPath: this.api.projectPath,
    });
  }

  /**
   * 初始化
   */
  async init() {
    this.api.logger.debug('ContainerPlugin: init', this.inputs);

    let modeInputs = MODE_INPUTS[this.inputs.mode || 'low-cost'];

    this.resolvedInputs = resolveInputs(
      this.inputs,
      Object.assign(
        {},
        DEFAULT_INPUTS,
        modeInputs,
        this.api.bumpVersion ? { version: String(Date.now()) } : {}
      )
    );

    const {
      uploadType,
      codeDetail,
      imageInfo,
      mode,
      minNum,
    } = this.resolvedInputs;
    // 检查镜像参数
    switch (uploadType) {
      case 'repository':
        if (!codeDetail || !codeDetail.url) {
          throw new Error(
            'uploadType 填写为 repository 时，应提供正确的 codeDetail 信息'
          );
        }
        break;
      case 'image':
        if (!imageInfo || !imageInfo.imageUrl) {
          throw new Error('uploadType 填写为 image 时，应提供 imageInfo 信息');
        }
        break;
      default:
        break;
    }

    // 检查副本模式
    // "low-cost" 代表低成本模式，会有冷启动延时，锁定最小副本数为0，规格默认值为0.25C0.5G，副本最小个数不可修改，要修改需要先切换模式。
    // "high-availability" 代表高可用模式，不存在冷启动，最小副本数不可以为0，规格默认值为1C1G，要修改最小副本数到0需要先切换模式。
    switch (mode) {
      case 'low-cost':
        if (minNum !== 0) {
          throw new Error(
            '副本模式设置为 "low-cost" 时代表低成本模式，锁定最小副本数为0，规格默认值为0.25C0.5G，副本最小个数不可修改，存在冷启动延时，要修改需要先切换模式。'
          );
        }
        break;
      case 'high-availability':
        if (minNum === 0) {
          throw new Error(
            '副本模式设置为 "high-availability" 代表高可用模式，不存在冷启动，最小副本数不可以为0，规格默认值为1C1G，要修改最小副本数到0需要先切换模式。'
          );
        }
        break;
    }
  }

  /**
   * 执行本地命令
   */
  async run() {}

  /**
   * 删除资源
   */
  async remove() {}

  /**
   * 生成代码
   */
  async genCode() {}

  /**
   * 构建
   */
  async build() {
    this.api.logger.debug('ContainerPlugin: build', this.resolvedInputs);

    if (this.resolvedInputs.uploadType === 'package') {
      const { serviceName, version } = this.resolvedInputs;
      const localPath =
        this.resolvedInputs.localAbsolutePath ||
        path.join(this.api.projectPath, this.resolvedInputs.localPath);

      const result = await this.builder.build(localPath, {
        path: this.resolvedInputs.servicePath,
        name: this.resolvedInputs.serviceName,
      });

      const distFileName = result.containers[0].source;

      await this.containerApi.upload(serviceName, version, distFileName);

      this.builder.clean();
    }
  }

  /**
   * 生成SAM文件
   */
  async compile() {
    this.api.logger.debug('ContainerPlugin: compile', this.resolvedInputs);
    return {
      Resources: {
        [this.toConstantCase(this.resolvedInputs.serviceName)]: this.toSAM(),
      },
      EntryPoint: [
        {
          Label: '服务入口',
          EntryType: 'HttpService',
          HttpEntryPath: this.resolvedInputs.servicePath,
        },
      ],
    };
  }

  /**
   * 部署
   */
  async deploy() {
    this.api.logger.debug(
      'ContainerPlugin: deploy',
      this.resolvedInputs,
      this.buildOutput
    );
    this.api.logger.info(`${this.api.emoji('🚀')} 云托管应用部署成功,`);
  }

  toSAM() {
    const {
      description,
      serviceName,
      isPublic,
      flowRatio,
      cpu,
      mem,
      minNum,
      maxNum,
      policyType,
      policyThreshold,
      containerPort,
      dockerfilePath,
      buildDir,
      version,
      servicePath,
      envVariables,
      uploadType,
      imageInfo,
      codeDetail,
      volumeMounts,
      versionRemark,
      customLogs,
      initialDelaySeconds,
    } = this.resolvedInputs;

    let otherProperties;

    switch (uploadType) {
      case 'package':
        otherProperties = {
          PackageName: serviceName,
          PackageVersion: version,
        };
        break;
      case 'image':
        otherProperties = {
          ImageInfo: {
            ImageUrl: imageInfo?.imageUrl,
          },
        };
        break;
      case 'repository':
        otherProperties = {
          CodeDetail: {
            Name: {
              Name: codeDetail?.name,
            },
            Url: codeDetail?.url,
          },
        };
        break;
      default:
        break;
    }

    let volumeMountsInfo;

    if (volumeMounts && Object.keys(volumeMounts).length) {
      volumeMountsInfo = Object.entries(volumeMounts).reduce(
        (prev, cur) => {
          const [path, addonName] = cur;
          const VolumeMounts = prev.VolumeMounts as any[];
          const Volumes = prev.Volumes as any[];

          VolumeMounts.push({
            MountPath: path,
            Name: addonName,
          });

          if (
            !Volumes.find((volume) => {
              return volume.Name === addonName;
            })
          ) {
            Volumes.push({
              Name: addonName,
              Type: 'nfs',
              Path: '/',
              Server: `\${Outputs.${addonName}.Properties.InstanceIp}`,
            });
          }
          return prev;
        },
        {
          Volumes: [],
          VolumeMounts: [],
        }
      );
    }

    return {
      Type: 'CloudBase::CloudBaseRun',
      Properties: Object.assign(
        {
          ServerName: serviceName,
          Description: description,
          isPublic: isPublic,
          UploadType: uploadType,
          FlowRatio: flowRatio,
          Cpu: cpu,
          Mem: mem,
          MinNum: minNum,
          MaxNum: maxNum,
          PolicyType: policyType,
          PolicyThreshold: policyThreshold,
          ContainerPort: containerPort,
          DockerfilePath: dockerfilePath,
          BuildDir: buildDir,
          HttpPath: servicePath,
          EnvParams: JSON.stringify(envVariables),
          VersionRemark: versionRemark,
          CustomLogs: customLogs,
          InitialDelaySeconds: initialDelaySeconds,
        },
        otherProperties,
        this.api.bumpVersion && {
          NewVersion: true,
        },
        this.api.versionRemark && {
          VersionRemark: this.api.versionRemark,
        },
        volumeMountsInfo
      ),
    };
  }

  toConstantCase(name: string) {
    let result = '';
    let lastIsDivide = true;
    for (let letter of name) {
      if (letter === '-' || letter === '_') {
        lastIsDivide = true;
      } else if (lastIsDivide) {
        result += letter.toUpperCase();
        lastIsDivide = false;
      } else {
        result += letter.toLowerCase();
        lastIsDivide = false;
      }
    }

    return result;
  }
}

function resolveInputs(inputs: any, defaultInputs: any) {
  return Object.assign({}, defaultInputs, inputs);
}

export const plugin = ContainerPlugin;
