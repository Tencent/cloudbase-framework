<a href="https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-node">![Tencent CloudBase Framework Node Plugin](https://main.qcloudimg.com/raw/80526dcba2f27ed2619ac43b9b623d5a.jpg)</a>

# Tencent CloudBase Framework Node Plugin

[![Github License](https://img.shields.io/github/license/TencentCloudBase/cloudbase-framework)](LICENSE)
[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-node)](https://www.npmjs.com/package/@cloudbase/framework-plugin-node)
[![issue](https://img.shields.io/github/issues/TencentCloudBase/cloudbase-framework)](https://github.com/TencentCloudBase/cloudbase-framework/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/TencentCloudBase/cloudbase-framework/pulls)
[![star](https://img.shields.io/github/stars/TencentCloudBase/cloudbase-framework?style=social)](https://github.com/TencentCloudBase/cloudbase-framework)

**云开发 CloudBase Framework 框架「Node.js App」插件**： 通过云开发 **[CloudBase Framework](https://github.com/TencentCloudBase/cloudbase-framework)** 框架将 Node 应用一键部署云开发环境，提供自动弹性伸缩的高性能 Node 应用服务。可以搭配其他插件如 Website 插件、函数插件实现云端一体开发。

## 功能特性

- 无须关心底层架构: 只需要开发业务服务，不用适配函数或者容器
- 节约成本: 资源伸缩，弹性扩缩容，灵活计费，极大节约资源成本
- 框架支持: 无缝支持原生和前端框架构建的项目
  - `原生 Node.js`
  - `Express`
  - `Koa`

## 使用方法

### 步骤一. 准备工作

具体步骤请参照 [准备云开发环境和 CloudBase CLI 命令工具](../../CLI_GUIDE.md)

### 步骤二. 进入 Node 项目目录进行初始化

如果目前已有 Node 应用项目

```bash
cloudbase init --without-template
```

如果想全新开始一个项目，可以直接执行 init 来从模板开始一个项目

```bash
cloudbase init
```

### 步骤三. 一键部署

```bash
cloudbase framework:deploy
```

## 配置

默认情况下不需要任何配置即可使用，以下配置参数针对有特殊需求的场景

### 配置示例

`cloudbase init` 之后会创建云开发的配置文件 `cloudbaserc.json`，可在配置文件的 plugins 里修改和写入插件配置

```json
{
  "envId": "{{envId}}",
  "framework": {
    "plugins": {
      "client": {
        "use": "@cloudbase/framework-plugin-node",
        "inputs": {
          "entry": "app.js",
          "path": "/nodeapp",
          "name": "nodeapp"
        }
      }
    }
  }
}
```

### 配置参数说明

### `entry`

默认 `app.js`

Node 服务入口文件，需要导出 app 或者 server 实例

如 koa 服务的 `app.js`

```javascript
const Koa = require("koa");
const { router } = require("./routes/");

const app = new Koa();

app.use(router.routes());

module.exports = app;
```

### `path`

访问子路径，如 `/node-app`

### `name`

服务名，如`node-app`

## 更多插件

请访问 [CloudBase Framework 插件列表](https://github.com/TencentCloudBase/cloudbase-framework#%E7%9B%AE%E5%89%8D%E6%94%AF%E6%8C%81%E7%9A%84%E6%8F%92%E4%BB%B6%E5%88%97%E8%A1%A8) 搭配使用其他插件

## 文档资料

- 云开发官网地址： [https://cloudbase.net/](https://cloudbase.net/)
- 云开发静态网站开通指南：[https://docs.cloudbase.net/hosting/](https://docs.cloudbase.net/hosting/)
- 云开发控制台地址： [https://console.cloud.tencent.com/tcb](https://console.cloud.tencent.com/tcb)
