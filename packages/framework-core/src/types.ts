import CloudBaseManager from "@cloudbase/manager-node";

export interface DeployerOptions {
  cloudbaseManager: CloudBaseManager;
}

export interface Config {
  name?: string;
  plugins: {
    [name: string]: {
      use: string;
      inputs?: {
        [input: string]: any;
      };
    };
  };
}

export interface CloudBaseConfig {
  secretId?: string;
  secretKey?: string;
  token?: string;
  envId?: string;
  proxy?: string;
}

export interface CloudbaseFrameworkConfig {
  projectPath: string;
  cloudbaseConfig: CloudBaseConfig;
  logLevel?: string;
  config?: Config;
}
