import PluginManager from "../plugin-manager";

export default class PluginServiceApi {
  private pluginManager: PluginManager;

  constructor(pluginManager: PluginManager) {
    this.pluginManager = pluginManager;
  }

  get cloudBaseManager() {
    return this.pluginManager.context.cloudbaseManager;
  }
}
