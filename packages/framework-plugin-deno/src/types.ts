import { IFrameworkPluginContainerInputs } from "@cloudbase/framework-plugin-container";

export interface IDenoPluginInputs {
  dockerImage?: string;
  runtime?: string;
  entry?: string;
  runOptions?: Array<string>;
  servicePath?: string;
  serviceName?: string;
  projectPath?: string;
  containerOptions?: IFrameworkPluginContainerInputs;
  functionOptions?: any;
  installDeps: boolean;
  buildCommand?: string;
  wrapExpress?: boolean;
}
