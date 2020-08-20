import { Plugin, PluginServiceApi } from "@cloudbase/framework-core";
import { plugin as ContainerPlugin } from "@cloudbase/framework-plugin-container";
import { DenoBuilder } from "./builder";
import { IFrameworkPluginDenoInputs } from "./types";

function resolveInputs(inputs: any, defaultInputs: any) {
  return Object.assign({}, defaultInputs, inputs);
}

class DenoPlugin extends Plugin {
  protected resolvedInputs: IFrameworkPluginDenoInputs;
  protected buildOutput: any;
  protected denoBuilder: DenoBuilder;
  protected containerPlugin: any;

  constructor(
    public name: string,
    public api: PluginServiceApi,
    public inputs: IFrameworkPluginDenoInputs
  ) {
    super(name, api, inputs);

    const DEFAULT_INPUTS = {
      dockerImage: "debian:buster-slim",
      // runtime example: v1.3.0
      runtime: "latest",
      entry: "",
      serviceName: "deno-app",
      servicePath: "/deno-app",
      projectPath: ".",
    };

    this.resolvedInputs = resolveInputs(this.inputs, DEFAULT_INPUTS);

    this.denoBuilder = new DenoBuilder({
      projectPath: this.api.projectPath,
    });
  }

  /**
   * 初始化资源
   */
  async init() {
    this.api.logger.debug("DenoPlugin: init", this.resolvedInputs);
  }

  /**
   * 生成功能代码
   */
  async genCode() {}

  /**
   * 构建资源
   */
  async build() {
    this.api.logger.debug("DenoPlugin: build", this.resolvedInputs);

    // 构建 deno 中间产物
    this.buildOutput = await this.denoBuilder.build(
      this.resolvedInputs.projectPath || ".",
      {
        dockerImage: this.resolvedInputs.dockerImage,
        runtime: this.resolvedInputs.runtime,
        entry: this.resolvedInputs.entry,
        name: this.resolvedInputs.serviceName || "deno-app",
        path: this.resolvedInputs.servicePath || "/deno-app",
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
   * 部署资源
   */
  async deploy() {
    this.api.logger.debug(
      "DenoPlugin: deploy",
      this.resolvedInputs,
      this.buildOutput
    );

    await this.containerPlugin.deploy();

    await this.denoBuilder.clean();

    let url = `https://${this.api.envId}.service.tcloudbase.com${this.resolvedInputs.servicePath}`;
    if (url[url.length - 1] !== "/") {
      url = url + "/";
    }
    url = this.api.genClickableLink(url);

    this.api.logger.info(
      `${this.api.emoji("🚀")} Deno 应用部署成功,访问地址: ${url}`
    );
  }

  /**
   * 将资源编译成 SAM 描述
   */
  async compile() {
    this.api.logger.debug("DenoPlugin: compile", this.resolvedInputs);
    return this.containerPlugin.compile();
  }

  /**
   * 移除资源
   */
  async remove() {}

  /**
   * 执行自定义命令
   */
  async run() {}
}

export const plugin = DenoPlugin;
