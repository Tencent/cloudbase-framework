<a href="https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-database">![Tencent CloudBase Framework Database Plugin](https://main.qcloudimg.com/raw/3de9cef4b6ac7c72f9519f13d063fc13.jpg)</a>

# Tencent CloudBase Framework MiniProgram Plugin

[![Github License](https://img.shields.io/github/license/TencentCloudBase/cloudbase-framework)](LICENSE)
[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-container)](https://www.npmjs.com/package/@cloudbase/framework-plugin-container)
[![issue](https://img.shields.io/github/issues/TencentCloudBase/cloudbase-framework)](https://github.com/TencentCloudBase/cloudbase-framework/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/TencentCloudBase/cloudbase-framework/pulls)
[![star](https://img.shields.io/github/stars/TencentCloudBase/cloudbase-framework?style=social)](https://github.com/TencentCloudBase/cloudbase-framework)

**云开发 CloudBase Framework 框架「小程序」插件**： 通过云开发 **[CloudBase Framework](https://github.com/TencentCloudBase/cloudbase-framework)** 框架一键部署微信小程序应用。

## 功能特性

## 使用方法

### 步骤一. 准备工作

具体步骤请参照 [准备云开发环境和 CloudBase CLI 命令工具](../../CLI_GUIDE.md)

### 步骤二. 进入项目目录进行初始化

如果是目前已有的小程序应用项目

```bash
cloudbase init --without-template
```

### 步骤三. 一键部署

```bash
cloudbase framework:deploy
```

## 配置

默认情况下仅需要配置 `appid`、`privateKeyPath` 即可使用，以下配置参数针对有特殊需求的场景

### 配置示例

`cloudbase init` 之后会创建云开发的配置文件 `cloudbaserc.json`，可在配置文件的 plugins 里修改和写入插件配置

```json
{
  "envId": "{{envId}}",
  "framework": {
    "plugins": {
      "client": {
        "use": "@cloudbase/framework-plugin-mp",
        "inputs": {
          "appid": "",
          "privateKeyPath": "",
          "localPath": "./",
          "ignores": ["node_modules/**/*"],
          "deployMode": "preview",
          "previewOptions": {
            "desc": "CloudBase Framework 一键预览",
            "setting": {
              "es6": true
            },
            "qrcodeOutputPath": "./qrcode.jpg",
            "pagePath": "pages/index/index"
          }
        }
      }
    }
  }
}
```

> 默认模板的 `appid` 和 `privateKeyPath` 为空，需要开发者填入

### 配置参数说明

### `appid`

必填，小程序应用的 appid

### `privateKeyPath`

必填，小程序应用的部署私钥的本地相对路径

### `localPath`

选填，小程序项目 `project.config.json` 所在的本地路径，默认值 `./`

### `ignores`

选填，小程序应用部署时忽略的文件路径，支持通配符，默认值`["node_modules/**/*"]`

### `deployMode`

选填，小程序应用的部署模式，支持 `preview|upload` 2种部署模式

### `previewOptions`

`deployMode` 填写为 `preview` 时需要填写`previewOptions`，类型是对象格式

| 属性名称           | 类型                          | 是否必填 | 描述        |
| ----------------- | ---------------------------- | -------- | ----------- |
| desc              | String                       | 否       | 小程序应用的版本描述 |
| setting           | IMiniProgramBuildSetting 对象 | 否       | 小程序应用的编译设置 |
| qrcodeOutputPath  | String                       | 否       | 生成的预览二维码保存在本地的路径 |
| pagePath          | String                       | 否       | 小程序应用的预览页面地址 |
| searchQuery       | String                       | 否       | 小程序应用的预览页面参数 |
| scene             | Number                       | 否       | 小程序应用的预览页面场景值 |

例如

```json
{
  "envId": "{{envId}}",
  "framework": {
    "plugins": {
      "client": {
        "use": "@cloudbase/framework-plugin-mp",
        "inputs": {
          "appid": "",
          "privateKeyPath": "",
          "localPath": "./",
          "ignores": ["node_modules/**/*"],
          "deployMode": "preview",
          "previewOptions": {
            "desc": "一键预览",
            "setting": {
              "es6": false
            },
            "qrcodeOutputPath": "./qrcode.jpg",
            "pagePath": "pages/index/index",
            "searchQuery": "",
            "scene": 1011
          }
        }
      }
    }
  }
}
```

### `uploadOptions`

`deployMode` 填写为 `upload` 时需要填写`uploadOptions`，类型是对象格式

| 属性名称  | 类型                          | 是否必填 | 描述        |
| -------- | ---------------------------- | -------- | ----------- |
| version  | String 对象                   | 否       | 小程序应用上传的版本号 |
| desc     | String 对象                   | 否       | 小程序应用的版本描述 |
| setting  | IMiniProgramBuildSetting 对象 | 否       | 小程序应用的编译设置 |

例如

```json
{
  "envId": "{{envId}}",
  "framework": {
    "plugins": {
      "client": {
        "use": "@cloudbase/framework-plugin-mp",
        "inputs": {
          "appid": "",
          "privateKeyPath": "",
          "localPath": "./",
          "ignores": ["node_modules/**/*"],
          "deployMode": "upload",
          "uploadOptions": {
            "version": "1.0.0",
            "desc": "CloudBase Framework 一键上传",
            "setting": {
              "es6": false
            }
          },
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
- 云开发静态网站开通指南：[https://docs.cloudbase.net/hosting/](https://docs.cloudbase.net/hosting/)
- 云开发控制台地址： [https://console.cloud.tencent.com/tcb](https://console.cloud.tencent.com/tcb)
