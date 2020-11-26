<a href="https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-container">![Tencent CloudBase Framework Container Plugin](https://main.qcloudimg.com/raw/7e5e467a45bdfb5f5f4cc2eb27ea71bb.jpg)</a>

# Tencent CloudBase Framework Container Plugin

[![Github License](https://img.shields.io/badge/license-Apache--2.0-blue)](LICENSE)
[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-container)](https://www.npmjs.com/package/@cloudbase/framework-plugin-container)
[![issue](https://img.shields.io/github/issues/Tencent/cloudbase-framework)](https://github.com/Tencent/cloudbase-framework/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Tencent/cloudbase-framework/pulls)
[![star](https://img.shields.io/github/stars/Tencent/cloudbase-framework?style=social)](https://github.com/Tencent/cloudbase-framework)

**云开发 CloudBase Framework 框架「Container」插件**： 通过云开发 **[CloudBase Framework](https://github.com/Tencent/cloudbase-framework)** 框架将项目应用一键部署到云开发的云托管环境，提供生产环境可用的自动弹性伸缩的高性能的容器计算服务。可以搭配其他插件如 Website 插件、Node 插件实现云端一体开发。

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

### `uploadType`

选填，容器镜像代码来源类别，支持`package|image|repository`3 种，分别代表本地代码包、镜像地址和 git 仓库地址。默认是`package`, 选择`image`时需要填写 `imageInfo`, 选择 `repository` 需要填写`codeDetail`

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

### `mode`

选填，副本模式

1.4.0 版本以后支持

副本模式，字符串格式，默认值 `low-cost`，可选值为 `low-cost` | `high-availability`

`low-cost` 代表低成本模式，会有冷启动延时，锁定最小副本数为 0，规格默认值为 0.25C0.5G，副本最小个数不可修改，要修改需要先切换模式。

`high-availability` 代表高可用模式，不存在冷启动，最小副本数不可以为 0，规格默认值为 1C1G，要修改最小副本数到 0 需要先切换模式。

### `cpu`

选填，CPU 的大小，0.25-128, 单位：核，默认值 `0.25`

### `mem`

选填，Mem 的大小，0.5-128, 单位：G，默认值 `0.5`

### `minNum`

选填，最小副本数, 0-50，默认值 `0`

### `maxNum`

选填，最大副本数，1-50，默认值 `10`

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

### `envVariables`

选填，环境变量键值对，会被注入到云托管的运行时环境变量中

### `imageInfo`

`uploadType` 填写为 `image`时需要填写 `imageInfo`，类型是对象格式

| 属性名称 | 类型   | 长度  | 是否必填 | 描述         |
| -------- | ------ | ----- | -------- | ------------ |
| imageUrl | String | 1-512 | 是       | 镜像拉取地址 |

imageUrl 格式为 [registry-url]/[namespace]/[image]:[tag]，支持腾讯云 ccr.ccs.tencentyun.com 上的镜像地址，也支持 dockerhub 公开的镜像，如 `nginx:latest`

例如

```json
{
  "envId": "{{envId}}",
  "framework": {
    "name": "capp-example",
    "plugins": {
      "client": {
        "use": "@cloudbase/framework-plugin-container",
        "inputs": {
          "serviceName": "node-api",
          "servicePath": "/node-api",
          "localPath": "./",
          "uploadType": "image",
          "imageInfo": {
            "imageUrl": "ccr.ccs.tencentyun.com/tcb-100010952056-rjdt/webpage_node-api:node-api-001-1597238358"
          }
        }
      }
    }
  }
}
```

### `codeDetail`

`uploadType` 填写为 `repository` 时需要填写`codeDetail`，类型是对象格式

| 属性名称 | 类型              | 长度  | 是否必填 | 描述        |
| -------- | ----------------- | ----- | -------- | ----------- |
| name     | CodeRepoName 对象 | 1-512 | 否       | repo 的名字 |
| url      | String            | 1-512 | 否       | repo 的 url |

例如

```json
{
  "envId": "{{envId}}",
  "framework": {
    "name": "capp-example",
    "plugins": {
      "client": {
        "use": "@cloudbase/framework-plugin-container",
        "inputs": {
          "serviceName": "deno",
          "servicePath": "/deno",
          "localPath": "./",
          "uploadType": "repository",
          "codeDetail": {
            "name": "deno-docker",
            "url": "https://github.com/TabSpace/deno-docker"
          }
        }
      }
    }
  }
}
```

### `volumeMounts`

挂载目录设置，1.4.0 版本以后支持

类型是对象格式，key 为挂载路径，value 为挂载的 CFS Addon 的 Name

例如

```json
{
  "version": "2.0",
  "envId": "{{env.ENV_ID}}",
  "framework": {
    "name": "grafana",
    "plugins": {
      "client": {
        "use": "@cloudbase/framework-plugin-container",
        "inputs": {
          "mode": "low-cost",
          "serviceName": "grafana",
          "servicePath": "/",
          "localPath": "./",
          "uploadType": "package",
          "containerPort": 3000,
          "envVariables": {},
          "volumeMounts": {
            "/var/lib/grafana": "grafana-cfs"
          }
        }
      }
    },
    "requirement": {
      "addons": [
        {
          "type": "CFS",
          "name": "grafana-cfs"
        }
      ]
    }
  }
}
```

### `customLogs`

可选，用户自定义采集日志路径, 1.4.0 版本以后支持

字符串格式，最长支持 1024

### `initialDelaySeconds`

可选，延迟多长时间开始健康检查

单位 s，支持设置 0-1000

### `bumpVersion`

可选，是否自动创建新版本

选择自动创建新版本，可以在控制台进行流量的灰度和控制，不选择的情况下会自动原位更新

### `versionRemark`

可选，版本备注信息

## 更多插件

请访问 [CloudBase Framework 插件列表](https://github.com/Tencent/cloudbase-framework#%E7%9B%AE%E5%89%8D%E6%94%AF%E6%8C%81%E7%9A%84%E6%8F%92%E4%BB%B6%E5%88%97%E8%A1%A8) 搭配使用其他插件

## 文档资料

- 云开发官网地址： [https://cloudbase.net/](https://cloudbase.net/)
- 云开发静态网站开通指南：[https://docs.cloudbase.net/hosting/](https://docs.cloudbase.net/hosting/)
- 云开发控制台地址： [https://console.cloud.tencent.com/tcb](https://console.cloud.tencent.com/tcb?tdl_anchor=github&tdl_site=0)
