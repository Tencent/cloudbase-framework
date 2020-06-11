import { Plugin, PluginServiceApi } from "@cloudbase/framework-core";
import { plugin as ContainerPlugin } from "@cloudbase/framework-plugin-container";
import { DartBuilder } from "./builder";

class DartPlugin extends Plugin {
  protected resolvedInputs: any;
  protected buildOutput: any;
  protected dartBuilder: DartBuilder;
  protected containerPlugin: any;

  constructor(
    public name: string,
    public api: PluginServiceApi,
    public inputs: any
  ) {
    super(name, api, inputs);

    const DEFAULT_INPUTS = {
      servicePath: "/dart-api",
      serviceName: "dart-api",
      localPath: "./",
    };

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

    this.api.logger.info(`🚀 Dart 应用部署成功`);
  }
}

function resolveInputs(inputs: any, defaultInputs: any) {
  return Object.assign({}, defaultInputs, inputs);
}

export const plugin = DartPlugin;
