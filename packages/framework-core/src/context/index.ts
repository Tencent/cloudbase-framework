import {
  Config,
  CloudBaseConfig,
  ResourceProviders,
  ICloudBaseConfig,
} from "../types";
import CloudBaseManager from "@cloudbase/manager-node";
import createLogger, { Logger } from "../logger";
import { SamManager } from "../sam";

interface ContextOption {
  appConfig: Config;
  cloudbaseConfig: CloudBaseConfig;
  projectPath: string;
  logLevel?: string;
  resourceProviders?: ResourceProviders;
  projectConfig: ICloudBaseConfig | undefined;
  samManager: SamManager;
  bumpVerison: boolean;
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
  bumpVerison: boolean;
  versionRemark: string;

  constructor({
    appConfig,
    cloudbaseConfig,
    projectPath,
    projectConfig,
    logLevel,
    resourceProviders,
    samManager,
    bumpVerison,
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
    this.bumpVerison = bumpVerison;
    this.versionRemark = versionRemark;
  }
}
