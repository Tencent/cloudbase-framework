import PluginServiceApi from "../plugin-sevice-api";

/**
 * @description 插件基类,插件可实现不同生命周期的方法
 */
export default abstract class Plugin {
  constructor(public name: string) {}
  abstract build(api: PluginServiceApi, inputs: any): Promise<any>;
  abstract deploy(
    api: PluginServiceApi,
    inputs: any,
    buildOutput: any
  ): Promise<any>;
}
