import { Plugin, PluginServiceApi } from "@cloudbase/framework-core";
import { ContainerApi } from "./container-api";
import { ContainerBuilder } from "./builder";

console.log(ContainerApi);

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
      description: "基于云开发 CloudBase 部署的云应用",
      isPublic: true,
      flowRatio: 100,
      cpu: 1,
      mem: 1,
      minNum: 1,
      maxNum: 1000,
      policyType: "cpu",
      policyThreshold: 60,
      containerPort: 80,
      dockerfilePath: "./Dockfile",
      buildDir: "./",
      version: "1.0.0",
      localPath: "./",
    };
    this.resolvedInputs = resolveInputs(this.inputs, DEFAULT_INPUTS);
    this.containerApi = new ContainerApi({
      secretId: this.api.secretId,
      secretKey: this.api.secretKey,
      token: this.api.token,
      envId: this.api.envId,
    });
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

    const { serviceName, version } = this.resolvedInputs;

    const result = await this.builder.build(this.resolvedInputs.localPath, {
      path: this.resolvedInputs.servicePath,
      name: this.resolvedInputs.serviceName,
    });

    const distFileName = result.containers[0].source;

    await this.containerApi.upload(serviceName, version, distFileName);

    this.builder.clean();
  }

  /**
   * 生成SAM文件
   */
  async compile() {
    this.api.logger.debug("ContainerPlugin: compile", this.resolvedInputs);
    return {
      Resources: {
        [this.toConstantCase(this.resolvedInputs.name)]: this.toSAM(),
      },
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
    } = this.resolvedInputs;
    return {
      Type: "CloudBase::CloudBaseRun",
      Properties: {
        ServerName: serviceName,
        Description: description,
        isPublic: isPublic,
        UploadType: "package",
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
        PackageName: serviceName,
        PackageVersion: version,
        Path: servicePath,
      },
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
}

function resolveInputs(inputs: any, defaultInputs: any) {
  return Object.assign({}, defaultInputs, inputs);
}

export const plugin = ContainerPlugin;
