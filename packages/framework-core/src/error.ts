/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
export const ERRORS = {
  /**
   * 调用扩展部署失败
   */
  DEPLOY_ERROR: 'DEPLOY_ERROR',
  /**
   * cloudbaserc.json 文件校验失败
   */
  CONFIG_VALIDATE_ERROR: 'CONFIG_VALIDATE_ERROR',
};

export class CloudBaseFrameworkError extends Error {
  readonly code: string;
  constructor(message: string, code: string) {
    super(message);
    this.name = 'CloudBaseFrameworkError';
    this.code = code;
  }
}
