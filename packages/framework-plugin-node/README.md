<a href="https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-node">![Tencent CloudBase Framework Node Plugin](https://main.qcloudimg.com/raw/80526dcba2f27ed2619ac43b9b623d5a.jpg)</a>

# Tencent CloudBase Framework Node Plugin

[![Github License](https://img.shields.io/badge/license-Apache--2.0-blue)](LICENSE)
[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-node)](https://www.npmjs.com/package/@cloudbase/framework-plugin-node)
[![issue](https://img.shields.io/github/issues/TencentCloudBase/cloudbase-framework)](https://github.com/TencentCloudBase/cloudbase-framework/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/TencentCloudBase/cloudbase-framework/pulls)
[![star](https://img.shields.io/github/stars/TencentCloudBase/cloudbase-framework?style=social)](https://github.com/TencentCloudBase/cloudbase-framework)

**云开发 CloudBase Framework 框架「Node.js App」插件**： 通过云开发 **[CloudBase Framework](https://github.com/TencentCloudBase/cloudbase-framework)** 框架将 Node 应用一键部署云开发环境，提供自动弹性伸缩的高性能 Node 应用服务，支持底层部署为函数或者 云托管，可以搭配其他插件如 Website 插件、函数插件实现云端一体开发。

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
cloudbase
```

如果想全新开始一个项目，可以直接执行 init 来从模板开始一个项目

```bash
cloudbase init
```

### 步骤三. 一键部署

```bash
cloudbase framework deploy
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
      "server": {
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

Node 服务入口文件，相对于`projectPath`,需要导出 app 或者 server 的实例，同时也支持导出异步获取 app 的 `tcbGetApp` 方法，方法的返回值为 app 或者 server 的实例。

如 koa 服务的 `app.js`

```javascript
const Koa = require('koa');
const { router } = require('./routes/');

const app = new Koa();

app.use(router.routes());

module.exports = app;
```

nest 服务的 `app.js`

```js
const express = require('express');
const { NestFactory } = require('@nestjs/core');
const { ExpressAdapter } = require('@nestjs/platform-express');
const { AppModule } = require('./dist/app.module');

const expressApp = express();
const adapter = new ExpressAdapter(expressApp);

exports.tcbGetApp = async () => {
  const app = await NestFactory.create(AppModule, adapter);
  await app.init();
  return expressApp;
};
```

### `path`

必填，访问子路径，如 `/node-app`

### `name`

必填，服务名，如`node-app`

### `projectPath`

选填，指定 Node 服务所在目录，相对于当前项目根目录

### `buildCommand`

0.5.x 版本以后支持

选填，指定构建命令，比如`npm run build`

### `platform`

选填，底层使用平台，支持 `container`（ 云托管） 和 `function` （云函数）, 默认是 `function`

### `containerOptions`

选填，当 `platform` 选择 `container` 时，可以支持自定义更多高级设置，例如 CPU 内存等

例如

```json
{
  "use": "@cloudbase/framework-plugin-node",
  "inputs": {
    "entry": "app.js",
    "path": "/nodeapp",
    "name": "nodeapp",
    "platform": "container",
    "containerOptions": {
      "cpu": 2,
      "mem": 2
    }
  }
}
```

具体配置信息请参考 [@cloudbase/framework-plugin-container](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-container#cpu) 配置

### `functionOptions`

选填，当 `platform` 选择 `function` 时，可以支持自定义更多高级设置，例如 VPC 环境变量等

例如

```json
{
  "use": "@cloudbase/framework-plugin-node",
  "inputs": {
    "entry": "app.js",
    "path": "/nodeapp",
    "name": "nodeapp",
    "platform": "function",
    "functionOptions": {
      "timeout": 5,
      "envVariables": {
        "TEST_ENV": 1
      },
      "vpc": {
        "vpcId": "xxx",
        "subnetId": "xxx"
      }
    }
  }
}
```

具体配置信息请参考 [@cloudbase/framework-plugin-function](https://github.com/TencentCloudBase/cloudbase-framework/blob/master/packages/framework-plugin-function/README.md#functions) 配置

### `wrapExpress`

选填，当 `platform` 选择 `function` 时，可以支持自动为函数包上一层 express

例如

```json
{
  "envId": "fx",
  "framework": {
    "plugins": {
      "server": {
        "use": "@cloudbase/framework-plugin-node",
        "inputs": {
          "entry": "./api/index.js",
          "path": "/api",
          "name": "github-stats-api",
          "wrapExpress": true
        }
      },
      "pin": {
        "use": "@cloudbase/framework-plugin-node",
        "inputs": {
          "entry": "./api/pin.js",
          "path": "/api/pin",
          "name": "github-stats-pin",
          "wrapExpress": true
        }
      }
    }
  }
}
```

## 更多插件

请访问 [CloudBase Framework 插件列表](https://github.com/TencentCloudBase/cloudbase-framework#%E7%9B%AE%E5%89%8D%E6%94%AF%E6%8C%81%E7%9A%84%E6%8F%92%E4%BB%B6%E5%88%97%E8%A1%A8) 搭配使用其他插件

## 文档资料

- 云开发官网地址： [https://cloudbase.net/](https://cloudbase.net/)
- 云开发控制台地址： [https://console.cloud.tencent.com/tcb](https://console.cloud.tencent.com/tcb?tdl_anchor=github&tdl_site=0)
