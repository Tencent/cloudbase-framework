/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2025 Tencent.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import { DeployerOptions } from '../types';
import CloubaseManager from '@cloudbase/manager-node';

import getLogger, { Logger } from '../logger';

export class Deployer {
  protected app: CloubaseManager;
  protected logger: Logger;
  constructor(options: DeployerOptions) {
    this.app = options.cloudbaseManager;
    this.logger = getLogger();
  }
}
