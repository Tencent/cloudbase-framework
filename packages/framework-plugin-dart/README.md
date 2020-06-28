<a href="https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-dart">![Tencent CloudBase Framework Function Plugin](https://main.qcloudimg.com/raw/fabde81e6232f0eccf4914721ee2a55c.jpg)</a>

# Tencent CloudBase Framework Dart Server Plugin

[![Github License](https://img.shields.io/github/license/TencentCloudBase/cloudbase-framework)](LICENSE)
[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-function)](https://www.npmjs.com/package/@cloudbase/framework-plugin-function)
[![issue](https://img.shields.io/github/issues/TencentCloudBase/cloudbase-framework)](https://github.com/TencentCloudBase/cloudbase-framework/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/TencentCloudBase/cloudbase-framework/pulls)
[![star](https://img.shields.io/github/stars/TencentCloudBase/cloudbase-framework?style=social)](https://github.com/TencentCloudBase/cloudbase-framework)

**云开发 CloudBase Framework 框架「Dart Server」插件**： 通过云开发 **[CloudBase Framework](https://github.com/TencentCloudBase/cloudbase-framework)** 框架将 Dart Server 一键部署到云开发环境，提供生产环境可用的自动弹性伸缩的高性能 Dart Server 应用服务。可以搭配 Flutter 框架，实现云端一体开发。

## 功能特性

- 无须关心底层架构: 只需要开发业务服务，不用适配底层架构
- 节约成本: 资源伸缩，弹性扩缩容，灵活计费，极大节约资源成本
- 框架支持: 无缝支持 Dart Server 框架构建的项目

## 使用方法

### 步骤一. 准备工作

具体步骤请参照 [准备云开发环境和 CloudBase CLI 命令工具](../../CLI_GUIDE.md)

### 步骤二. 进入项目目录进行初始化

执行以下命令来初始化一个全新的 dart server 项目

```bash
cloudbase init --template dart
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
        "use": "@cloudbase/framework-plugin-dart",
        "inputs": {
          "serviceName": "dartapp",
          "servicePath": "/dartapp",
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

## 更多插件

请访问 [CloudBase Framework 插件列表](https://github.com/TencentCloudBase/cloudbase-framework#%E7%9B%AE%E5%89%8D%E6%94%AF%E6%8C%81%E7%9A%84%E6%8F%92%E4%BB%B6%E5%88%97%E8%A1%A8) 搭配使用其他插件

## 文档资料

- 云开发官网地址： [https://cloudbase.net/](https://cloudbase.net/)
- 云开发静态网站开通指南：[https://docs.cloudbase.net/hosting/](https://docs.cloudbase.net/hosting/)
- 云开发控制台地址： [https://console.cloud.tencent.com/tcb](https://console.cloud.tencent.com/tcb)
