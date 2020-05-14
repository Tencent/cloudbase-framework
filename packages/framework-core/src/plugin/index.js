"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 插件抽象类
 *
 * @description 插件基类, 插件可实现不同生命周期的方法来实现对项目的某一类应用资源进行操作和管理
 *
 * @param name 插件名
 * @param api 插件服务API
 * @param inputs 插件配置
 *
 */
class Plugin {
    constructor(name, api, inputs) {
        this.name = name;
        this.api = api;
        this.inputs = inputs;
    }
}
exports.default = Plugin;
