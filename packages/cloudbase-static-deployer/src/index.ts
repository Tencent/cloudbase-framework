/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import { Deployer, DeployerOptions } from '@cloudbase/framework-core';

type StaticDeployerOptions = DeployerOptions;

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
