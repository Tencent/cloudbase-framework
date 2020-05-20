import {
  Config,
  CloudBaseConfig,
  ResourceProviders,
  ICloudBaseConfig,
} from "../types";
import CloudBaseManager from "@cloudbase/manager-node";
import createLogger, { Logger } from "../logger";

interface ContextOption {
  appConfig: Config;
  cloudbaseConfig: CloudBaseConfig;
  projectPath: string;
  logLevel?: string;
  resourceProviders?: ResourceProviders;
  projectConfig: ICloudBaseConfig | undefined;
}

export default class Context {
  cloudbaseManager: CloudBaseManager;
  appConfig: Config;
  envId: string;
  projectPath: string;
  logger: Logger;
  resourceProviders?: ResourceProviders;
  projectConfig: ICloudBaseConfig | undefined;

  constructor({
    appConfig,
    cloudbaseConfig,
    projectPath,
    projectConfig,
    logLevel,
    resourceProviders,
  }: ContextOption) {
    this.appConfig = appConfig;
    this.projectPath = projectPath;
    this.cloudbaseManager = new CloudBaseManager(cloudbaseConfig);
    this.envId = cloudbaseConfig.envId;
    this.logger = createLogger(logLevel);
    this.resourceProviders = resourceProviders;
    this.projectConfig = projectConfig;
  }
}
