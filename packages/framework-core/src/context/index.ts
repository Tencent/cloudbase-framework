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
