import { Plugin, PluginServiceApi } from "@cloudbase/framework-core";
import { ContainerApi } from "./container-api";
import { ContainerBuilder } from "./builder";
import path from "path";

export interface IContainerPluginInputs {
  serviceName: string;
  servicePath: string;
  description?: string;
  isPublic?: boolean;
  flowRatio?: number;
  cpu?: number;
  mem?: number;
  minNum?: number;
  maxNum?: number;
  policyType?: "cpu";
  policyThreshold?: number;
  containerPort?: number;
  dockerfilePath?: string;
  buildDir?: string;
  version?: string;
  localPath?: string;
  localAbsolutePath?: string;
}

class ContainerPlugin extends Plugin {
  protected resolvedInputs: any;
  protected buildOutput: any;
  protected containerApi: ContainerApi;
  protected builder: ContainerBuilder;

  constructor(
    public name: string,
    public api: PluginServiceApi,
    public inputs: IContainerPluginInputs
  ) {
    super(name, api, inputs);

    const DEFAULT_INPUTS = {
      uploadType: "package",
      description: "基于云开发 CloudBase Framework 部署的云应用",
      isPublic: true,
      flowRatio: 100,
      cpu: 1,
      mem: 1,
      minNum: 1,
      maxNum: 1000,
      policyType: "cpu",
      policyThreshold: 60,
      containerPort: 80,
      dockerfilePath: "./Dockerfile",
      buildDir: "./",
      version: "1.0.0",
      localPath: "./",
      envVariables: {},
    };
    this.resolvedInputs = resolveInputs(this.inputs, DEFAULT_INPUTS);

    this.checkInputs();

    this.containerApi = new ContainerApi(this.api.cloudApi, this.api.logger);
    this.builder = new ContainerBuilder({
      projectPath: this.api.projectPath,
    });
  }

  /**
   * 初始化
   */
  async init() {
    this.api.logger.debug("ContainerPlugin: init", this.resolvedInputs);
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
    this.api.logger.debug("ContainerPlugin: build", this.resolvedInputs);

    if (this.resolvedInputs.uploadType === "package") {
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
    this.api.logger.debug("ContainerPlugin: compile", this.resolvedInputs);
    return {
      Resources: {
        [this.toConstantCase(this.resolvedInputs.serviceName)]: this.toSAM(),
      },
      EntryPoint: [
        {
          Label: "服务入口",
          EntryType: "HttpService",
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
      "ContainerPlugin: deploy",
      this.resolvedInputs,
      this.buildOutput
    );
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
    } = this.resolvedInputs;

    let otherProperties;

    switch (uploadType) {
      case "package":
        otherProperties = {
          PackageName: serviceName,
          PackageVersion: version,
        };
        break;
      case "image":
        otherProperties = {
          ImageInfo: {
            ImageUrl: imageInfo.imageUrl,
          },
        };
        break;
      case "repository":
        otherProperties = {
          CodeDetail: {
            Name: {
              Name: codeDetail.name,
            },
            Url: codeDetail.url,
          },
        };
        break;
      default:
        break;
    }

    return {
      Type: "CloudBase::CloudBaseRun",
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
          Path: servicePath,
          EnvParams: JSON.stringify(envVariables),
        },
        otherProperties
      ),
    };
  }

  toConstantCase(name: string) {
    let result = "";
    let lastIsDivide = true;
    for (let i = 0; i < name.length; i++) {
      let letter = name[i];
      if (letter === "-" || letter === "_") {
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

  checkInputs() {
    const { uploadType, codeDetail, imageInfo } = this.resolvedInputs;
    switch (uploadType) {
      case "repository":
        if (!codeDetail || !codeDetail.url) {
          throw new Error(
            "uploadType 填写为 repository 时，应提供正确的 codeDetail 信息"
          );
        }
        break;
      case "image":
        if (!imageInfo || !imageInfo.imageUrl) {
          throw new Error("uploadType 填写为 image 时，应提供 imageInfo 信息");
        }
        break;
      default:
        break;
    }
  }
}

function resolveInputs(inputs: any, defaultInputs: any) {
  return Object.assign({}, defaultInputs, inputs);
}

export const plugin = ContainerPlugin;
