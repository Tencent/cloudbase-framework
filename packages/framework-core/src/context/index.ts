import { Config, CloudBaseConfig } from "../types";
import CloudBaseManager from "@cloudbase/manager-node";
import createLogger, { Logger } from "../logger";

interface ContextOption {
  appConfig: Config;
  cloudbaseConfig: CloudBaseConfig;
  projectPath: string;
  logLevel?: string;
}

export default class Context {
  cloudbaseManager: CloudBaseManager;
  appConfig: Config;
  projectPath: string;
  logger: Logger;

  constructor({
    appConfig,
    cloudbaseConfig,
    projectPath,
    logLevel,
  }: ContextOption) {
    this.appConfig = appConfig;
    this.projectPath = projectPath;
    this.cloudbaseManager = new CloudBaseManager(cloudbaseConfig);
    this.logger = createLogger(logLevel);
  }
}
