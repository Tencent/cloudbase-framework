import npm from "npm";
import { promisify } from "util";
import { Config } from "../types";
import Context from "../context";
import Plugin from "../plugin";
import PluginServiceApi from "../plugin-sevice-api";

interface PluginData {
  id: string;
  name: string;
  inputs: any;
  outputs: {
    build?: any;
    deploy?: any;
  };
  pluginInstance?: Plugin;
  api?: PluginServiceApi;
}

/**
 * 插件管理器
 *
 * @description 管理插件的生命周期，为插件注入 api 和参数
 */
export default class PluginManager {
  context: Context;
  plugins: PluginData[];

  constructor(context: Context) {
    this.context = context;
    this.plugins = this.resolvePlugins(this.context.appConfig);
  }

  /**
   * 构建
   * @param id
   */
  async build(id?: string) {
    return Promise.all(
      this.pickPlugins(id).map(async (pluginData) => {
        const pluginInstance = await this.loadPlugin(pluginData);

        this.context.logger.info(`🔨 build: ${pluginData.id}...`);

        pluginData.outputs.build = await pluginInstance.build(
          pluginData.api as PluginServiceApi,
          pluginData.inputs
        );

        return pluginData.outputs.build;
      })
    );
  }

  /**
   * 部署
   * @param id
   */
  async deploy(id?: string) {
    return Promise.all(
      this.pickPlugins(id).map(async (pluginData) => {
        const pluginInstance = await this.loadPlugin(pluginData);

        if (!pluginInstance.deploy) return;
        this.context.logger.info(`🚀 deploy: ${pluginData.id}...`);

        pluginData.outputs.build = await pluginInstance.deploy(
          pluginData.api as PluginServiceApi,
          pluginData.inputs,
          pluginData.outputs.build
        );
        return pluginData.outputs.build;
      })
    );
  }

  /**
   * 解析插件
   * @param config
   */
  private resolvePlugins(config: Config) {
    const allPlugins = Object.entries(config.plugins).map(
      ([id, pluginConfig]) => {
        const { use, inputs } = pluginConfig;
        return {
          id,
          name: use,
          inputs: inputs,
          outputs: {},
        };
      }
    );
    return allPlugins;
  }

  /**
   * 加载插件代码
   *
   * @param pluginData
   */
  private async loadPlugin(pluginData: PluginData): Promise<Plugin> {
    if (pluginData.pluginInstance) {
      return pluginData.pluginInstance;
    }

    let PluginCode: Plugin | undefined;

    try {
      PluginCode = require(pluginData.name);
    } catch (e) {
      this.context.logger.debug(e);
      PluginCode = undefined;
    }

    if (typeof PluginCode === "undefined") {
      try {
        await this.installPackageFromNpm(pluginData.name);
      } catch (e) {
        this.context.logger.error(e);
        throw new Error(
          `CloudBase Framwork: can't install plugin npm package '${pluginData.name}'`
        );
      }

      try {
        PluginCode = require(pluginData.name);
      } catch (e) {
        this.context.logger.error(e);
        throw new Error(
          `CloudBase Framwork: can't find plugin '${pluginData.name}'`
        );
      }
    }

    if (!(PluginCode && (PluginCode as any).prototype instanceof Plugin)) {
      this.context.logger.error(
        `CloudBase Framwork: plugin '${pluginData.name}' isn't a valid plugin`
      );
      throw new Error(
        `CloudBase Framwork: plugin '${pluginData.name}' isn't a valid plugin`
      );
    }

    pluginData.pluginInstance = new (PluginCode as any)(pluginData.name);
    pluginData.api = new PluginServiceApi(this);
    return pluginData.pluginInstance as Plugin;
  }

  /**
   * 筛选插件
   * @param id
   */
  private pickPlugins(id?: string): PluginData[] {
    return id
      ? this.plugins.filter((plugin) => plugin.id === id)
      : this.plugins;
  }

  /**
   * 通过 NPM 安装插件
   *
   * 全局安装是考虑其他非 JavaScript 项目底下尽量不产生 node_modules
   *
   * @param packageName
   */
  private async installPackageFromNpm(packageName: string) {
    await promisify(npm.load as (cli: any, callback: () => void) => void)({});
    await promisify(npm.commands.install)([packageName, "-g"]);
  }
}
