import { Plugin, PluginServiceApi } from "@cloudbase/framework-core";
import { plugin as NodeFunctionPlugin } from "./node-function-impl";
import { plugin as NodeContainerPlugin } from "./node-function-impl";

import { INodePluginInputs } from "./types";

class NodePlugin extends Plugin {
  protected resolvedInputs: INodePluginInputs;
  protected buildOutput: any;
  protected pluginImpl: Plugin;

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
      platform: "function",
    };

    this.resolvedInputs = resolveInputs(this.inputs, DEFAULT_INPUTS);

    if (this.resolvedInputs.platform === "container") {
      this.pluginImpl = new NodeContainerPlugin(
        "NodeContainer",
        this.api,
        this.resolvedInputs
      );
    } else {
      this.pluginImpl = new NodeFunctionPlugin(
        "NodeFunction",
        this.api,
        this.resolvedInputs
      );
    }
  }

  /**
   * 初始化
   */
  async init(params: any) {
    this.api.logger.debug("NodePlugin: init", this.resolvedInputs);
    return this.pluginImpl.init(params);
  }

  /**
   * 编译成 SAM
   * @param params
   */
  async compile(params: any) {
    this.api.logger.debug("NodePlugin: compile", this.resolvedInputs);

    if (!this.pluginImpl.compile) {
      return null;
    }

    return this.pluginImpl.compile(params);
  }

  /**
   * 删除资源
   */
  async remove(params: any) {
    if (!this.pluginImpl.remove) {
      return null;
    }
    return this.pluginImpl.remove(params);
  }

  /**
   * 生成代码
   */
  async genCode(params: any) {
    if (!this.pluginImpl.genCode) {
      return null;
    }
    return this.pluginImpl.genCode(params);
  }

  /**
   * 构建
   */
  async build(params: any) {
    this.api.logger.debug("NodePlugin: build", this.resolvedInputs);
    return this.pluginImpl.build(params);
  }

  /**
   * 部署
   */
  async deploy(params: any) {
    this.api.logger.debug(
      "NodePlugin: deploy",
      this.resolvedInputs,
      this.buildOutput
    );

    await this.pluginImpl.deploy(params);

    this.api.logger.info(`🚀 Node 应用部署成功`);
  }
}

function resolveInputs(inputs: any, defaultInputs: any) {
  return Object.assign({}, defaultInputs, inputs);
}

export const plugin = NodePlugin;
