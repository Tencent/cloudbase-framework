import { DeployerOptions } from "../types";
import CloubaseManager from "@cloudbase/manager-node";

import getLogger, { Logger } from "../logger";

export class Deployer {
  protected app: CloubaseManager;
  protected logger: Logger;
  constructor(options: DeployerOptions) {
    this.app = options.cloudbaseManager;
    this.logger = getLogger();
  }
}
