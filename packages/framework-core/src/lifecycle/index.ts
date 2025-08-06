/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2025 Tencent.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import fs from 'fs';
import { promisify } from 'util';

import { getLogFilePath } from '../logger';
import { reportCloudBaseCIResultCallback } from '../api/app';
import Context from '../context';

export default class LifeCycleManager {
  constructor(public context: Context) {}

  /**
   * 上报构建日志和状态
   *
   * @param status
   * @param failReason
   */
  async reportBuildResult(
    status: number,
    failReason?: string,
    failType?: string
  ) {
    let buildLog = '';

    try {
      buildLog = await this.getBuildLog();
    } catch (e) {}

    return reportCloudBaseCIResultCallback({
      ciId: this.context.ciId,
      extensionId: this.context.extensionId,
      status,
      failReason,
      buildLog: buildLog.slice(0, 60 * 1000),
      failType,
    });
  }

  /**
   * 查询本地构建日志
   */
  async getBuildLog() {
    const logFilePath = getLogFilePath();
    return promisify(fs.readFile)(logFilePath, 'utf-8');
  }
}
