import PluginServiceApi from "../plugin-sevice-api";

/**
 * 插件抽象类
 *
 * @description 插件基类, 插件可实现不同生命周期的方法来实现对项目的某一类应用资源进行操作和管理
 *
 */
export default abstract class Plugin {
  constructor(public name: string) {}

  /**
   *
   * 初始化资源
   * @param api
   * @param inputs
   */
  abstract init(api: PluginServiceApi, inputs: any): Promise<any>;

  /**
   * 生成功能代码，可以多次调用
   *
   * @param api
   * @param inputs
   */
  abstract genCode(
    api: PluginServiceApi,
    inputs: any,
    params: any
  ): Promise<any>;

  /**
   *
   * 构建资源
   * @param api
   * @param inputs
   */
  abstract build(api: PluginServiceApi, inputs: any): Promise<any>;

  /**
   *
   * 部署资源
   * @param api
   * @param inputs
   * @param buildOutput
   */
  abstract deploy(
    api: PluginServiceApi,
    inputs: any,
    buildOutput: any
  ): Promise<any>;

  /**
   * 将资源编译成 SAM 描述
   * @param api
   * @param inputs
   * @param buildOutput
   */
  abstract compile(
    api: PluginServiceApi,
    inputs: any,
    buildOutput: any
  ): Promise<any>;

  /**
   *
   * 移除资源
   * @param api
   * @param inputs
   * @param buildOutput
   */
  abstract remove(
    api: PluginServiceApi,
    inputs: any,
    buildOutput: any
  ): Promise<any>;
}
