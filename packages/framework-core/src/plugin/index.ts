import PluginServiceApi from "../plugin-sevice-api";

/**
 * 插件抽象类
 *
 * @description 插件基类, 插件可实现不同生命周期的方法来实现对项目的某一类应用资源进行操作和管理
 *
 * @param name 插件名
 * @param api 插件服务API
 * @param inputs 插件配置
 *
 */
export default abstract class Plugin {
  constructor(
    public name: string,
    public api: PluginServiceApi,
    public inputs: any
  ) {}

  /**
   *
   * 初始化资源
   *
   * - 基于 inputs 检测插件接管的项目模块结构是否存在
   * - 基于 inputs 创建插件接管的项目模块所需结构，例如，云开发 Vue 插件的初始化，可以调用 vue-cli 创建项目
   * @param params 参数信息
   *
   */
  abstract init(params: any): Promise<any>;

  /**
   * 生成功能代码
   *
   * - 在已有插件项目结构中增加代码功能，例如为 Node 应用添加 api 文件或者基于 model 为项目生成代码
   *
   * @param params 参数信息
   */
  abstract genCode(params: any): Promise<any>;

  /**
   *
   * 构建资源
   *
   * - 调用插件来进行构建编译
   * - 这个阶段可以对用户代码进行包装和编译，为下一步部署作准备
   *
   * @param params 参数信息
   *
   */
  abstract build(params: any): Promise<any>;

  /**
   *
   * 部署资源
   *
   * - 调用 manager sdk 来部署插件所需的资源，将上一步的构建产物进行部署
   *
   * @param params 参数信息
   */
  abstract deploy(params: any): Promise<any>;

  /**
   * 将资源编译成 SAM 描述
   *
   * TCB Serverless Application Model：提供表示函数、api、数据库和事件源映射等的简写语法，每个资源只需几行代码就可以定义所需的应用程序。
   *
   * - 考虑到 CI / CD 需求，以及用户后期需要将项目保存为一个扩展来交付
   * - 插件可提供一个编译方法，将涉及到相应的资源生成 SAM 描述信息，由插件管理器统一组装
   *
   * @param params 参数信息
   *
   */
  abstract compile(params: any): Promise<any>;

  /**
   *
   * 移除资源
   *
   * 提供插件接管的云资源的移除操作
   *
   * @param params 参数信息
   */
  abstract remove(params: any): Promise<any>;
}
