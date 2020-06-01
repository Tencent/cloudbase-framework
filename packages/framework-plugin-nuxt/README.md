![Tecent CloudBase](https://github.com/TencentCloudBase/cloudbase-action/raw/master/assets/logo.png)

# Tencent CloudBase Framework Nuxt SSR Plugin

`@cloudbase/framework-plugin-nuxt`

云开发 Tencent CloudBase Framework Node Plugin 插件，可以通过云开发 [CloudBase Framework](https://github.com/TencentCloudBase/cloudbase-framework) 将项目下的云函数一键部署云开发环境，提供自动弹性伸缩的高性能 Node 应用服务。

## 功能特性

- 无须关心底层架构
- 支持 Nuxt 一键部署

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

`cloudbase init` 之后会创建云开发的配置文件 `cloudbaserc.js`，可在配置文件的 plugins 里 写入插件配置

```js
module.exports = {
  // ...
  plugins: {
    // 别名
    function: {
      // 使用 Nuxt 插件
      use: "@cloudbase/framework-plugin-nuxt",
      inputs: {},
    },
  },
};
```

### 配置参数说明

## 文档资料

- 云开发官网地址： [https://cloudbase.net/](https://cloudbase.net/)
- 云开发静态网站开通指南：[https://docs.cloudbase.net/hosting/](https://docs.cloudbase.net/hosting/)
- 云开发控制台地址： [https://console.cloud.tencent.com/tcb](https://console.cloud.tencent.com/tcb)
