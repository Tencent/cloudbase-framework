<a href="https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-website"><img src="https://main.qcloudimg.com/raw/abbc0f23ee92e8f4665ab316b6126d33.jpg"></a>

# Tencent CloudBase Framework Website Plugin

[![Github License](https://img.shields.io/badge/license-Apache--2.0-blue)](LICENSE)
[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-website)](https://www.npmjs.com/package/@cloudbase/framework-plugin-website)
[![issue](https://img.shields.io/github/issues/Tencent/cloudbase-framework)](https://github.com/Tencent/cloudbase-framework/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Tencent/cloudbase-framework/pulls)
[![star](https://img.shields.io/github/stars/Tencent/cloudbase-framework?style=social)](https://github.com/Tencent/cloudbase-framework)

**云开发 CloudBase Framework 框架「Function」插件**： 通过云开发 **[CloudBase Framework](https://github.com/Tencent/cloudbase-framework)** 框架将静态网站一键部署云开发环境，提供生产环境可用的 CDN 加速、自动弹性伸缩的高性能网站服务。可以搭配其他插件如 Node 插件、函数插件实现云端一体开发。

## 功能特性

- 节约成本: 资源伸缩，弹性扩缩容，灵活计费，极大节约资源成本
- 极简配置：自动检测框架，无须配置，同时支持没有使用框架的纯静态项目
- 框架支持: 无缝支持原生和前端框架构建的项目
  - `Vue`
  - `React`
  - `Next SPA`
  - `Nuxt SPA`
  - `VuePress`

## 使用方法

### 步骤一. 准备工作

具体步骤请参照 [准备云开发环境和 CloudBase CLI 命令工具](../../CLI_GUIDE.md)

### 步骤二. 进入网站项目目录进行初始化

如果目前已有网站应用项目

```bash
cloudbase
```

如果想全新开始一个项目，可以直接执行 init 来从模板开始一个网站项目

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
      "client": {
        "use": "@cloudbase/framework-plugin-website",
        "inputs": {
          "installCommand": "npm install --prefer-offline --no-audit --progress=false",
          "buildCommand": "npm run build",
          "outputPath": "dist",
          "cloudPath": "/path",
          "ignore": [".git", ".github", "node_modules", "cloudbaserc.js"]
        }
      }
    }
  }
}
```

### 配置参数说明

### commands

选填，对象格式

自定义命令，声明应用安装/构建的自定义命令，会在当前项目目录下进行执行

#### `commands.install`

安装命令，如`npm install`，没有可不传

默认值 `npm install --prefer-offline --no-audit --progress=false`

#### `commands.build`

构建命令，如`npm run build`，没有可不传

### `outputPath`

网站静态文件的路径。

### `cloudPath`

静态资源部署到云开发环境的路径，默认为根目录。

### `httpPath`
可选，建立到静态网站托管的 HTTP 访问服务触发路径

### `ignore`

静态资源部署时忽略的文件路径，支持通配符

默认值 `['.git', '.github', 'node_modules', 'cloudbaserc.js']`

### `envVariables`

环境变量键值对，会被注入到静态网站根目录下，可以在网页 html head 里加入一行代码来获取

```html
<script src="/_init_tcb-env.js"></script>
```

在 JS 代码中就可以通过 `window._tcbEnv` 来获取所有的变量

注入的环境变量有：

- `TCB_ENV_ID`: 当前环境的环境 ID
- `TCB_SERVICE_DOMAIN`: 当前环境的云开发 HTTP 访问的默认域名（云接入域名）
- `TCB_REGION`: 当前环境的地域
- 以及用户注入的其他 `envVariables`

> 注意同一环境下不同 web 应用的变量会进行合并，可以在环境变量命名时加以区分

## 更多插件

请访问 [CloudBase Framework 插件列表](https://github.com/Tencent/cloudbase-framework#%E7%9B%AE%E5%89%8D%E6%94%AF%E6%8C%81%E7%9A%84%E6%8F%92%E4%BB%B6%E5%88%97%E8%A1%A8) 搭配使用其他插件

## 文档资料

- 云开发官网地址： [https://cloudbase.net/](https://cloudbase.net/)
- 云开发静态网站开通指南：[https://docs.cloudbase.net/hosting/](https://docs.cloudbase.net/hosting/)
- 云开发控制台地址： [https://console.cloud.tencent.com/tcb](https://console.cloud.tencent.com/tcb?tdl_anchor=github&tdl_site=0)
