import { Plugin, PluginServiceApi } from "@cloudbase/framework-core";
import { plugin as FunctionPlugin } from "@cloudbase/framework-plugin-function";
import { NuxtBuilder } from "@cloudbase/nuxt-builder";

class NuxtPlugin extends Plugin {
  protected resolvedInputs: any;
  protected buildOutput: any;
  protected builder: NuxtBuilder;
  protected functionPlugin: any;

  constructor(
    public name: string,
    public api: PluginServiceApi,
    public inputs: any
  ) {
    super(name, api, inputs);

    const DEFAULT_INPUTS = {
      runtime: "Nodejs10.15",
      entry: "app.js",
      path: "/nuxt",
    };

    this.resolvedInputs = resolveInputs(this.inputs, DEFAULT_INPUTS);

    this.builder = new NuxtBuilder({
      projectPath: this.api.projectPath,
    });
  }

  /**
   * 初始化
   */
  async init() {
    this.api.logger.debug("NuxtPlugin: init", this.resolvedInputs);
  }

  async compile() {
    this.api.logger.debug("NuxtPlugin: compile", this.resolvedInputs);

    return this.functionPlugin.compile();
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
    this.api.logger.debug("NuxtPlugin: build", this.resolvedInputs);

    this.buildOutput = await this.builder.build(this.resolvedInputs.entry, {
      path: this.resolvedInputs.path,
    });

    const srcFunction = this.buildOutput.functions[0];

    this.functionPlugin = new FunctionPlugin("function", this.api, {
      functionRootPath: srcFunction.source,
      functions: [
        {
          name: srcFunction.name,
          handler: srcFunction.entry,
          runtime: this.resolvedInputs.runtime,
          installDependency: true,
        },
      ],
      servicePaths: {
        [this.resolvedInputs.name]: this.resolvedInputs.path,
      },
    });
  }

  /**
   * 部署
   */
  async deploy() {
    this.api.logger.debug(
      "NuxtPlugin: deploy",
      this.resolvedInputs,
      this.buildOutput
    );

    await this.functionPlugin.deploy();

    await this.builder.clean();

    this.api.logger.info(`🚀 Nuxt 应用部署成功`);
  }
}

function resolveInputs(inputs: any, defaultInputs: any) {
  return Object.assign({}, defaultInputs, inputs);
}

export const plugin = NuxtPlugin;
