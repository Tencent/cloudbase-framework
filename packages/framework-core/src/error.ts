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
  /**
   * 取消任务
   */
  CANCEL_JOB: 'CANCEL_JOB',
};

/**
 * 用户级错误码
 */
export const USER_ERRORS_MAP = {
  CANCEL_JOB: 1,
  CONFIG_VALIDATE_ERROR: 1,
};

export class CloudBaseFrameworkError extends Error {
  readonly code: string;
  constructor(message: string, code: string) {
    super(message);
    this.name = 'CloudBaseFrameworkError';
    this.code = code;
  }
}
