<a href="https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-auth">![Tencent CloudBase Framework MP Plugin](https://main.qcloudimg.com/raw/8f7534f7f3a3f3a8df2cf861040f6a8c.jpg)</a>

# Tencent CloudBase Framework Auth Plugin

[![Github License](https://img.shields.io/badge/license-Apache--2.0-blue)](LICENSE)
[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-auth)](https://www.npmjs.com/package/@cloudbase/framework-plugin-auth)
[![issue](https://img.shields.io/github/issues/TencentCloudBase/cloudbase-framework)](https://github.com/TencentCloudBase/cloudbase-framework/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/TencentCloudBase/cloudbase-framework/pulls)
[![star](https://img.shields.io/github/stars/TencentCloudBase/cloudbase-framework?style=social)](https://github.com/TencentCloudBase/cloudbase-framework)

**云开发 CloudBase Framework 框架「登录配置」插件**： 通过云开发 **[CloudBase Framework](https://github.com/TencentCloudBase/cloudbase-framework)** 框架一键设置环境下的登录配置。

## 功能特性

- 支持未登录、匿名登录登录设置
- 后续会支持开放平台、公众号、账号密码等其他登录方式配置

## 使用方法

### 步骤一. 准备工作

具体步骤请参照 [准备云开发环境和 CloudBase CLI 命令工具](../../CLI_GUIDE.md)

### 步骤二. 编写 cloudbaserc.json 配置

在 `framework.plugins` 中新增登录插件配置

```json
{
  "envId": "YOU_ENV_ID",
  "framework": {
    "plugins": {
      "auth": {
        "use": "@cloudbase/framework-plugin-auth",
        "inputs": {
          "configs": [
            {
              "platform": "NONLOGIN",
              "status": "ENABLE"
            }
          ]
        }
      }
    }
  }
}
```

具体配置信息请参考下面的配置文档

### 步骤三. 一键部署

```bash
cloudbase framework deploy
```

## 配置

默认情况下仅需要配置 `appid`、`privateKeyPath` 即可使用，以下配置参数针对有特殊需求的场景

### 配置示例

云开发的配置文件 `cloudbaserc.json`，可在配置文件的 plugins 里修改和写入插件配置

```json
{
  "envId": "YOU_ENV_ID",
  "framework": {
    "plugins": {
      "client": {
        "use": "@cloudbase/framework-plugin-auth",
        "inputs": {
          "configs": [
            {
              "platform": "NONLOGIN",
              "status": "ENABLE"
            }
          ]
        }
      }
    }
  }
}
```

### 配置参数说明

### `configs`

必填，类型为数组格式 Array.<Login 对象>

#### Login 对象

| 属性名称       | 类型     | 长度 | 是否必填 | 描述                                                                                                                                                                                                                                           |
| -------------- | -------- | ---- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| platform       | `String` | 1-32 | 是       | 平台名称，可枚举值：<br>WECHAT-OPEN：微信开放平台；<br>WECHAT-PUBLIC：微信公众平台；<br>QQ-MINI：QQ 小程序；<br>CUSTOM：自定义登录；<br>ANONYMOUS：匿名登录；<br>EMAIL：邮箱登录；<br>NONLOGIN：未登录<br>**目前仅支持 ANONYMOUS 和 NONLOGIN** |
| status         | `String` | 1-32 | 否       | 默认开启，可枚举值：ENABLE；DISABLE。                                                                                                                                                                                                          |
| platformId     | `String` | 1-64 | 否       | 第三方平台的 AppID                                                                                                                                                                                                                             |
| platformSecret | `String` | 1-64 | 否       | 第三方平台的 AppSecret                                                                                                                                                                                                                         |

## 更多插件

请访问 [CloudBase Framework 插件列表](https://github.com/TencentCloudBase/cloudbase-framework#%E7%9B%AE%E5%89%8D%E6%94%AF%E6%8C%81%E7%9A%84%E6%8F%92%E4%BB%B6%E5%88%97%E8%A1%A8) 搭配使用其他插件

## 文档资料

- 云开发登录鉴权文档：<https://docs.cloudbase.net/authentication/introduce.html>
- 云开发官网地址： [https://cloudbase.net/](https://cloudbase.net/)
- 云开发控制台地址： [https://console.cloud.tencent.com/tcb](https://console.cloud.tencent.com/tcb?tdl_anchor=github&tdl_site=0)
