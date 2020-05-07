import PluginManager from "../plugin-manager";

export default class PluginServiceApi {
  private pluginManager: PluginManager;

  constructor(pluginManager: PluginManager) {
    this.pluginManager = pluginManager;
  }

  get cloudBaseManager() {
    return this.pluginManager.context.cloudbaseManager;
  }

  get projectPath() {
    return this.pluginManager.context.projectPath;
  }

  get logger() {
    return this.pluginManager.context.logger;
  }
}
