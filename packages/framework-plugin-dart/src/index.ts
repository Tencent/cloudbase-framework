import { Plugin, PluginServiceApi } from "@cloudbase/framework-core";
import {
  plugin as ContainerPlugin,
  IFrameworkPluginContainerInputs,
} from "@cloudbase/framework-plugin-container";
import { DartBuilder } from "./builder";

const DEFAULT_INPUTS = {
  servicePath: "/dartapp",
  serviceName: "dartapp",
  localPath: "./",
  framework: "aqueduct"
};

/**
 * 导出接口用于生成 JSON Schema 来进行智能提示
 */
export interface IFrameworkPluginDartInputs {
  /**
   * 服务名，字符串格式，如 `dartapp`
   *
   * @default dartapp
   */
  serviceName: string;
  /**
   * 服务访问路径配置, 字符串格式, 如 `/dartapp`
   * @default /dartapp
   */
  servicePath: string;
  /**
   * 本地代码文件夹相对于项目根目录的路径，默认值 `./`
   * @default ./
   */
  localPath?: string;
  /**
   * 本地代码文件夹的绝对路径
   */
  localAbsolutePath?: string;
  /**
   * 版本名，默认值 `1.0.0`
   *
   * @default 1.0.0
   */
  version?: string;
  /**
   * 是否对外网开放访问，默认值 `true`
   *
   * @default true
   */
  isPublic?: boolean;
  /**
   * Dart App 应用框架，如 `aqueduct`
   * 
   * @default aqueduct
   */
  framework?: string;
}

type ResolvedInputs = IFrameworkPluginDartInputs & typeof DEFAULT_INPUTS;

class DartPlugin extends Plugin {
  protected resolvedInputs: ResolvedInputs;
  protected buildOutput: any;
  protected dartBuilder: DartBuilder;
  protected containerPlugin: any;

  constructor(
    public name: string,
    public api: PluginServiceApi,
    public inputs: IFrameworkPluginContainerInputs
  ) {
    super(name, api, inputs);

    this.resolvedInputs = resolveInputs(this.inputs, DEFAULT_INPUTS);

    this.dartBuilder = new DartBuilder({
      projectPath: this.api.projectPath,
    });
  }

  /**
   * 初始化
   */
  async init() {
    this.api.logger.debug("DartPlugin: init", this.resolvedInputs);
  }

  /**
   * 编译
   */
  async compile() {
    this.api.logger.debug("DartPlugin: compile", this.resolvedInputs);

    return this.containerPlugin.compile();
  }

  /**
   * 执行本地命令
   */
  async run() {}

  /**
   * 删除资源
   */
  async remove() {}

  /**
   * 生成代码
   */
  async genCode() {}

  /**
   * 构建
   */
  async build() {
    this.api.logger.debug("DartPlugin: build", this.resolvedInputs);

    // 构建 dart server 中间产物
    this.buildOutput = await this.dartBuilder.build(
      this.resolvedInputs.localPath,
      {
        path: this.resolvedInputs.servicePath,
        name: this.resolvedInputs.serviceName,
      }
    );

    const container = this.buildOutput.containers[0];

    this.containerPlugin = new ContainerPlugin(
      "container",
      this.api,
      resolveInputs(
        { localAbsolutePath: container.source },
        this.resolvedInputs
      )
    );

    // 构建 container 最终产物
    await this.containerPlugin.build();
  }

  /**
   * 部署
   */
  async deploy() {
    this.api.logger.debug(
      "DartPlugin: deploy",
      this.resolvedInputs,
      this.buildOutput
    );

    await this.containerPlugin.deploy();

    await this.dartBuilder.clean();

    this.api.logger.info(`${this.api.emoji("🚀")} Dart 应用部署成功`);
  }
}

function resolveInputs(inputs: any, defaultInputs: any) {
  return Object.assign({}, defaultInputs, inputs);
}

export const plugin = DartPlugin;
