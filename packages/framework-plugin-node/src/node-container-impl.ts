import { Plugin, PluginServiceApi } from "@cloudbase/framework-core";
import { NodeBuilder } from "@cloudbase/node-builder";
import { plugin as ContainerPlugin } from "@cloudbase/framework-plugin-container";
import { INodePluginInputs } from "./types";
import { NodeContainerBuilder } from "./node-container-builder";

class NodeContainerPlugin extends Plugin {
  protected resolvedInputs: INodePluginInputs;
  protected buildOutput: any;
  protected nodeBuilder: NodeContainerBuilder;
  protected containerPlugin: any;

  constructor(
    public name: string,
    public api: PluginServiceApi,
    public inputs: INodePluginInputs
  ) {
    super(name, api, inputs);

    const DEFAULT_INPUTS = {
      runtime: "Nodejs10.15",
      entry: "app.js",
      path: "/nodeapp",
      name: "node",
    };

    this.resolvedInputs = resolveInputs(this.inputs, DEFAULT_INPUTS);

    this.nodeBuilder = new NodeContainerBuilder({
      projectPath: this.api.projectPath,
    });
  }

  /**
   * 初始化
   */
  async init() {}

  async compile() {
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
    const res = await this.nodeBuilder.build({
      dockerImage: "node:12",
      entry: this.resolvedInputs.entry || "app.js",
      installDeps: this.resolvedInputs.installDeps,
      port: this.resolvedInputs.containerOptions?.containerPort,
    });

    this.containerPlugin = new ContainerPlugin(
      "NodeContainerPlugin",
      this.api,
      {
        serviceName: this.resolvedInputs.name || "node",
        servicePath: this.resolvedInputs.path || "/node-app",
        ...(this.resolvedInputs.containerOptions || {}),
        localAbsolutePath: res.container[0].source,
      }
    );
    return this.containerPlugin.build();
  }

  /**
   * 部署
   */
  async deploy() {
    return this.containerPlugin.build();
  }
}

function resolveInputs(inputs: any, defaultInputs: any) {
  return Object.assign({}, defaultInputs, inputs);
}

export const plugin = NodeContainerPlugin;
