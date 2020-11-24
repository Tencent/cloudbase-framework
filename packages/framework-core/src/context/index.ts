/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import {
  Config,
  CloudBaseConfig,
  ResourceProviders,
  ICloudBaseConfig,
} from '../types';
import CloudBaseManager from '@cloudbase/manager-node';
import createLogger, { Logger } from '../logger';
import { SamManager } from '../sam';

interface ContextOption {
  appConfig: Config;
  cloudbaseConfig: CloudBaseConfig;
  projectPath: string;
  logLevel?: string;
  resourceProviders?: ResourceProviders;
  projectConfig: ICloudBaseConfig | undefined;
  samManager: SamManager;
  bumpVersion: boolean;
  versionRemark: string;
}

export default class Context {
  cloudbaseManager: CloudBaseManager;
  appConfig: Config;
  envId: string;
  projectPath: string;
  logger: Logger;
  resourceProviders?: ResourceProviders;
  projectConfig: ICloudBaseConfig | undefined;
  cloudbaseConfig: CloudBaseConfig;
  samManager: SamManager;
  bumpVersion: boolean;
  versionRemark: string;

  constructor({
    appConfig,
    cloudbaseConfig,
    projectPath,
    projectConfig,
    logLevel,
    resourceProviders,
    samManager,
    bumpVersion,
    versionRemark,
  }: ContextOption) {
    this.appConfig = appConfig;
    this.projectPath = projectPath;
    this.cloudbaseManager = new CloudBaseManager(cloudbaseConfig);
    this.cloudbaseConfig = cloudbaseConfig;
    this.envId = cloudbaseConfig.envId;
    this.logger = createLogger(logLevel);
    this.resourceProviders = resourceProviders;
    this.projectConfig = projectConfig;
    this.samManager = samManager;
    this.bumpVersion = bumpVersion;
    this.versionRemark = versionRemark;
  }
}
