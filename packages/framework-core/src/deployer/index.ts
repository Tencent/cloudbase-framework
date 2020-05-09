import { DeployerOptions } from "../types";
import CloubaseManager from "@cloudbase/manager-node";

export class Deployer {
  protected app: CloubaseManager;
  constructor(options: DeployerOptions) {
    this.app = options.cloudbaseManager;
  }
}
