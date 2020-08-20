<a href="https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-deno">![Tencent CloudBase Framework Deno Plugin](https://main.qcloudimg.com/raw/70429911e53a56366c39e11f5596e790.jpg)</a>

# Tencent CloudBase Framework Deno Plugin

[![Github License](https://img.shields.io/github/license/TencentCloudBase/cloudbase-framework)](LICENSE)
[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-function)](https://www.npmjs.com/package/@cloudbase/framework-plugin-function)
[![issue](https://img.shields.io/github/issues/TencentCloudBase/cloudbase-framework)](https://github.com/TencentCloudBase/cloudbase-framework/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/TencentCloudBase/cloudbase-framework/pulls)
[![star](https://img.shields.io/github/stars/TencentCloudBase/cloudbase-framework?style=social)](https://github.com/TencentCloudBase/cloudbase-framework)

**云开发 CloudBase Framework 框架「Deno」插件**： 通过云开发 **[CloudBase Framework](https://github.com/TencentCloudBase/cloudbase-framework)** 框架将 Deno 应用一键部署到云开发环境，提供生产环境可用的自动弹性伸缩的高性能 Deno 应用服务。

## 功能特性

- 无须关心底层架构: 只需要开发业务服务，不用适配底层架构
- 节约成本: 资源伸缩，弹性扩缩容，灵活计费，极大节约资源成本
- 框架支持: 无缝支持 Deno 应用

## 使用方法

### 步骤一. 准备工作

具体步骤请参照 [准备云开发环境和 CloudBase CLI 命令工具](../../CLI_GUIDE.md)

### 步骤二. 进入项目目录进行初始化

执行以下命令来初始化一个全新的 deno 项目

```bash
cloudbase init --template deno
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
        "use": "@cloudbase/framework-plugin-deno",
        "inputs": {
          "serviceName": "deno-app",
          "projectPath": "/deno-app"
        }
      }
    }
  }
}
```

### 配置参数说明

### `serviceName`

必填，服务名，字符串格式，如 `'deno-app'`

### `servicePath`

必填，服务路径配置，字符串格式，如 `'/deno-app'`

### `projectPath`

选填，本地代码文件夹相对于项目根目录的路径，字符串格式，默认值 `'./'`

### `dockerImage`

选填，Dockerfile 源镜像，字符串格式，默认值 `'debian:buster-slim'`

### `runtime`

选填，Deno 运行时版本，字符串格式，如 `'v1.3.0'`，默认值 `'latest'`

### `entry`

选填，入口文件，字符串格式，默认值 `''`

配置入口文件为 `entry.ts` 后，docker 编译时，会执行 `deno install entry.ts`。

但不推荐如此管理项目，推荐使用 denon 配置文件，并在部署前进行本地编译。

## 关于 denon

docker 使用 [denon](https://github.com/denosaurs/denon) 来管理 deno 进程，以便于管理 deno 启动参数。

denon 配置示例:

```yml
# denon.yml
scripts:
  build:
    cmd: deno bundle src/entry.ts dist/entry.js
    watch: false
  start:
    cmd: deno run dist/entry.js
    allow:
      - net
      - env
      - read
  dev:
    cmd: deno run src/entry.ts
    env:
      PORT: "3000"
    allow:
      - net
      - env
      - read
```

直接在 docker 编译 deno 应用，由于部分依赖文件所处网络环境原因容易导致镜像编译失败。推荐在本地安装 denon ，通过 `denon.yml` 提供的 `denon build` 命令进行本地编译，然后再发布应用到云端。

`cloudbase init` 之后会自动提供一个默认的 denon.yml，请根据应用需求来修改。

默认 docker 镜像会执行 `denon start` 命令来启动应用。

## 更多插件

请访问 [CloudBase Framework 插件列表](https://github.com/TencentCloudBase/cloudbase-framework#%E7%9B%AE%E5%89%8D%E6%94%AF%E6%8C%81%E7%9A%84%E6%8F%92%E4%BB%B6%E5%88%97%E8%A1%A8) 搭配使用其他插件

## 文档资料

- 云开发官网地址： [https://cloudbase.net/](https://cloudbase.net/)
- 云开发静态网站开通指南：[https://docs.cloudbase.net/hosting/](https://docs.cloudbase.net/hosting/)
- 云开发控制台地址： [https://console.cloud.tencent.com/tcb](https://console.cloud.tencent.com/tcb)
