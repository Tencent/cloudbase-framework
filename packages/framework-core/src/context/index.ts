import { Config, CloudBaseConfig } from "../types";
import CloudBaseManager from "@cloudbase/manager-node";

export default class Context {
  cloudbaseManager: CloudBaseManager;

  constructor(public appConfig: Config, cloudbaseConfig: CloudBaseConfig) {
    this.cloudbaseManager = new CloudBaseManager(cloudbaseConfig);
  }
}
