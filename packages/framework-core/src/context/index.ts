import { Config, CloudBaseConfig } from "../types";
import CloudBaseManager from "@cloudbase/manager-node";

interface ContextOption {
  appConfig: Config;
  cloudbaseConfig: CloudBaseConfig;
  projectPath: string;
}

export default class Context {
  cloudbaseManager: CloudBaseManager;
  appConfig: Config;
  projectPath: string;

  constructor({ appConfig, cloudbaseConfig, projectPath }: ContextOption) {
    this.appConfig = appConfig;
    this.projectPath = projectPath;
    this.cloudbaseManager = new CloudBaseManager(cloudbaseConfig);
  }
}
