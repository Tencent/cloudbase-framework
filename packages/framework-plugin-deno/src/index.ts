import { Plugin, PluginServiceApi } from '@cloudbase/framework-core';
import { plugin as ContainerPlugin } from '@cloudbase/framework-plugin-container';
import { DenoBuilder } from './builder';

class DenoPlugin extends Plugin {
  protected resolvedInputs: any;
  protected buildOutput: any;
  protected denoBuilder: DenoBuilder;
  protected containerPlugin: any;

  constructor(
    public name: string,
    public api: PluginServiceApi,
    public inputs: any
  ) {
    super(name, api, inputs);

    const DEFAULT_INPUTS = {
      servicePath: '/deno-app',
      serviceName: 'deno-app',
      localPath: './',
    };

    this.resolvedInputs = resolveInputs(this.inputs, DEFAULT_INPUTS);

    this.denoBuilder = new DenoBuilder({
      projectPath: this.api.projectPath,
    });
  }

  /**
   * 初始化
   */
  async init() {
    this.api.logger.debug('DenoPlugin: init', this.resolvedInputs);
  }

  /**
   * 编译
   */
  async compile() {
    this.api.logger.debug('DenoPlugin: compile', this.resolvedInputs);

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
    this.api.logger.debug('DenoPlugin: build', this.resolvedInputs);

    // 构建 deno 中间产物
    this.buildOutput = await this.denoBuilder.build(
      this.resolvedInputs.localPath,
      {
        path: this.resolvedInputs.servicePath,
        name: this.resolvedInputs.serviceName,
      }
    );

    const container = this.buildOutput.containers[0];

    this.containerPlugin = new ContainerPlugin(
      'container',
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
      'DenoPlugin: deploy',
      this.resolvedInputs,
      this.buildOutput
    );

    await this.containerPlugin.deploy();

    await this.denoBuilder.clean();

    let url = `https://${this.api.envId}.service.tcloudbase.com${this.resolvedInputs.servicePath}`;
    if (url[url.length - 1] !== '/') {
      url = url + '/';
    }
    url = this.api.genClickableLink(url);

    this.api.logger.info(
      `${this.api.emoji('🚀')} Deno 应用部署成功,访问地址: ${url}`
    );
  }
}

function resolveInputs(inputs: any, defaultInputs: any) {
  return Object.assign({}, defaultInputs, inputs);
}

export const plugin = DenoPlugin;
