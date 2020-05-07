import { Config } from "../types";
import Context from "../context";
import Plugin from "../plugin";

import PluginServiceApi from "../plugin-sevice-api";
import { exec } from "child_process";
import { promisify } from "util";

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

        pluginData.outputs.build = await pluginInstance.deploy(
          pluginData.api as PluginServiceApi,
          pluginData.inputs,
          pluginData.outputs.build
        );
        return pluginData.outputs.build;
      })
    );
  }

  resolvePlugins(config: Config) {
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

  async loadPlugin(pluginData: PluginData): Promise<Plugin> {
    if (pluginData.pluginInstance) {
      return pluginData.pluginInstance;
    }

    let PluginCode;

    try {
      PluginCode = require(pluginData.name);
    } catch (e) {
      // @todo 自动安装依赖
      throw new Error(
        `CloudBase Framwork: can't find plugin '${pluginData.name}'`
      );
    }

    pluginData.pluginInstance = new PluginCode(pluginData.name);
    pluginData.api = new PluginServiceApi(this);
    return pluginData.pluginInstance as Plugin;
  }

  private pickPlugins(id?: string): PluginData[] {
    return id
      ? this.plugins.filter((plugin) => plugin.id === id)
      : this.plugins;
  }
}
