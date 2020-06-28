import { IContainerPluginInputs } from "@cloudbase/framework-plugin-container";

export interface INodePluginInputs {
  runtime?: "Nodejs10.15" | "Nodejs8.9";
  entry?: string;
  path?: string;
  name?: string;
  platform?: "function" | "container";
  containerOptions?: IContainerPluginInputs;
  functionOptions?: any;
  installDeps: boolean;
}
