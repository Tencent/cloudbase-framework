import PluginServiceApi from "../plugin-sevice-api";

export default abstract class Plugin {
  constructor(public name: string) {}
  abstract build(api: PluginServiceApi, inputs: any): Promise<any>;
  abstract deploy(
    api: PluginServiceApi,
    inputs: any,
    buildOutput: any
  ): Promise<any>;
}
