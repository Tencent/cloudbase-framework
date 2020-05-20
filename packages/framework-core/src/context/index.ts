import { Config, CloudBaseConfig, ResourceProviders } from "../types";
import CloudBaseManager from "@cloudbase/manager-node";
import createLogger, { Logger } from "../logger";

interface ContextOption {
  appConfig: Config;
  cloudbaseConfig: CloudBaseConfig;
  projectPath: string;
  logLevel?: string;
  resourceProviders?: ResourceProviders;
}

export default class Context {
  cloudbaseManager: CloudBaseManager;
  appConfig: Config;
  envId: string;
  projectPath: string;
  logger: Logger;
  resourceProviders?: ResourceProviders;

  constructor({
    appConfig,
    cloudbaseConfig,
    projectPath,
    logLevel,
    resourceProviders,
  }: ContextOption) {
    this.appConfig = appConfig;
    this.projectPath = projectPath;
    this.cloudbaseManager = new CloudBaseManager(cloudbaseConfig);
    this.envId = cloudbaseConfig.envId;
    this.logger = createLogger(logLevel);
    this.resourceProviders = resourceProviders;
  }
}
