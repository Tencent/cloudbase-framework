<a href="https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-container">![Tencent CloudBase Framework Container Plugin](https://main.qcloudimg.com/raw/7e5e467a45bdfb5f5f4cc2eb27ea71bb.jpg)</a>

# Tencent CloudBase Framework Container Plugin

[![Github License](https://img.shields.io/github/license/TencentCloudBase/cloudbase-framework)](LICENSE)
[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-container)](https://www.npmjs.com/package/@cloudbase/framework-plugin-container)
[![issue](https://img.shields.io/github/issues/TencentCloudBase/cloudbase-framework)](https://github.com/TencentCloudBase/cloudbase-framework/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/TencentCloudBase/cloudbase-framework/pulls)
[![star](https://img.shields.io/github/stars/TencentCloudBase/cloudbase-framework?style=social)](https://github.com/TencentCloudBase/cloudbase-framework)

**云开发 CloudBase Framework 框架「Container」插件**： 通过云开发 **[CloudBase Framework](https://github.com/TencentCloudBase/cloudbase-framework)** 框架将项目应用一键部署到云开发的云应用环境，提供生产环境可用的自动弹性伸缩的高性能的容器计算服务。可以搭配其他插件如 Website 插件、Node 插件实现云端一体开发。

## 功能特性

- 节约成本: 资源伸缩，弹性扩缩容，灵活计费，极大节约资源成本
- 极简配置：自动检测框架，无须配置
- 语言支持和框架支持广泛
  - `Node.JS`
  - `PHP`
  - `Java`
  - `Go`
  - `Dart`
  - `Deno`

## 使用方法

### 步骤一. 准备工作

具体步骤请参照 [准备云开发环境和 CloudBase CLI 命令工具](../../CLI_GUIDE.md)

### 步骤二. 进入项目目录进行初始化

如果是目前已有的后端应用项目

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
        "use": "@cloudbase/framework-plugin-container",
        "inputs": {
          "serviceName": "node-api",
          "servicePath": "/node-api",
          "localPath": "./"
        }
      }
    }
  }
}
```

### 配置参数说明

### `serviceName`

必填，服务名，字符串格式，如 `node-api`

### `servicePath`

必填，服务路径配置, 字符串格式, 如 `/node-api`

### `localPath`

选填，本地代码文件夹相对于项目根目录的路径，默认值 `./`

### `localAbsolutePath`

选填，本地代码文件夹的绝对路径

### `version`

选填，版本名，默认值 `1.0.0`

### `isPublic`

选填，是否对外网开放访问，默认值 `true`

### `flowRatio`

选填，流量占比（0-100），默认值 `100`

### `cpu`

选填，CPU 的大小，1-128, 单位：核，默认值 `1`

### `mem`

选填，Mem 的大小，1-128, 单位：G，默认值 `1`

### `minNum`

选填，最小副本数, 1-1000，默认值 `1`

### `maxNum`

选填，最大副本数，1-1000，默认值 `1000`

### `policyType`

选填，策略类型(cpu)，默认值 `cpu`

### `policyThreshold`

选填，策略阈值，1-100, 默认值 `60`

### `containerPort`

选填，服务端口，默认值 `80`

### `dockerfilePath`

选填，Dockerfile 的路径，默认值 `./Dockerfile`

### `buildDir`

选填，构建目录，默认值 `./`

### ``

选填，，默认值 ``

## 更多插件

请访问 [CloudBase Framework 插件列表](https://github.com/TencentCloudBase/cloudbase-framework#%E7%9B%AE%E5%89%8D%E6%94%AF%E6%8C%81%E7%9A%84%E6%8F%92%E4%BB%B6%E5%88%97%E8%A1%A8) 搭配使用其他插件

## 文档资料

- 云开发官网地址： [https://cloudbase.net/](https://cloudbase.net/)
- 云开发静态网站开通指南：[https://docs.cloudbase.net/hosting/](https://docs.cloudbase.net/hosting/)
- 云开发控制台地址： [https://console.cloud.tencent.com/tcb](https://console.cloud.tencent.com/tcb)
