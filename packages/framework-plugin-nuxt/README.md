<a href="https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-nuxt">![Tencent CloudBase Framework Nuxt SSR Plugin](https://main.qcloudimg.com/raw/6d48ab8bc29c38558cd258b28b14f94e.jpg)</a>

# Tencent CloudBase Framework Nuxt SSR Plugin

[![Github License](https://img.shields.io/github/license/TencentCloudBase/cloudbase-framework)](LICENSE)
[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-nuxt)](https://www.npmjs.com/package/@cloudbase/framework-plugin-nuxt)
[![issue](https://img.shields.io/github/issues/TencentCloudBase/cloudbase-framework)](https://github.com/TencentCloudBase/cloudbase-framework/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/TencentCloudBase/cloudbase-framework/pulls)
[![star](https://img.shields.io/github/stars/TencentCloudBase/cloudbase-framework?style=social)](https://github.com/TencentCloudBase/cloudbase-framework)

**云开发 CloudBase Framework 框架「Nuxt SSR」插件**： 通过云开发 **[CloudBase Framework](https://github.com/TencentCloudBase/cloudbase-framework)** 框架将 Nuxt SSR 应用一键部署到云开发环境，提供自动弹性伸缩的高性能 Node SSR 应用服务。可以搭配其他插件如 Website 插件、函数插件实现云端一体开发。

## 功能特性

- 无须关心底层架构: 只需要开发业务服务，不用适配函数或者容器
- 节约成本: 资源伸缩，弹性扩缩容，灵活计费，极大节约资源成本
- 框架支持: 无缝支持 Nuxt 框架构建的项目

## 使用方法

### 步骤一. 准备工作

具体步骤请参照 [准备云开发环境和 CloudBase CLI 命令工具](../../CLI_GUIDE.md)

### 步骤二. 进入 Nuxt 项目目录进行初始化

如果目前已有 Nuxt 应用项目

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

`cloudbase init` 之后会创建云开发的配置文件 `cloudbaserc.js`，可在配置文件的 plugins 里 写入插件配置

```json
{
  "envId": "{{envId}}",
  "framework": {
    "plugins": {
      "client": {
        "use": "@cloudbase/framework-plugin-nuxt",
        "inputs": {
          "entry": "./",
          "path": "/nuxt-ssr",
          "name": "nuxt-ssr",
          "buildCommand": "npm run build"
        }
      }
    }
  }
}
```

### `entry`

默认 `./`

Nuxt 配置文件所在目录，默认当前项目所在目录

### `path`

访问子路径，如 `/nuxt-ssr`

### `name`

服务名，如`nuxt-ssr`

### `buildCommand`

构建命令，如`npm run build`，没有可不传

## 更多插件

请访问 [CloudBase Framework 插件列表](https://github.com/TencentCloudBase/cloudbase-framework#%E7%9B%AE%E5%89%8D%E6%94%AF%E6%8C%81%E7%9A%84%E6%8F%92%E4%BB%B6%E5%88%97%E8%A1%A8) 搭配使用其他插件

## 文档资料

- 云开发官网地址： [https://cloudbase.net/](https://cloudbase.net/)
- 云开发静态网站开通指南：[https://docs.cloudbase.net/hosting/](https://docs.cloudbase.net/hosting/)
- 云开发控制台地址： [https://console.cloud.tencent.com/tcb](https://console.cloud.tencent.com/tcb)
