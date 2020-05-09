import { Deployer, DeployerOptions } from "@cloudbase/framework-core";

interface StaticDeployerOptions extends DeployerOptions {}

interface StaticDeployerDeployOptions {
  localPath: string;
  cloudPath: string;
  ignore: string | string[];
}

export class StaticDeployer extends Deployer {
  constructor(options: StaticDeployerOptions) {
    super(options);
  }

  async deploy(options: StaticDeployerDeployOptions) {
    const { localPath, cloudPath, ignore } = options;

    return this.app.hosting.uploadFiles({
      localPath,
      cloudPath,
      ignore,
    });
  }
}
