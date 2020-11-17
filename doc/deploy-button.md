# 一键部署按钮

一键部署按钮可以让公开的 Git 项目一键部署到云开发 CloudBase 上，大大简化用户部署的门槛，方便用户快速使用和体验应用。一键部署功能支持 Github，Gitlab，Coding，Gitee 等 Git 仓库地址。

<DeployButtonGenerator/>

## 部署按钮是如何工作的?

部署按钮可以让云开发控制台根据指定的 Git 地址来快速帮用户导入一个新项目，并在云端进行云端部署，部署在云开发环境中。云端部署主要是用了 [CloudBase Framework](https://cloudbase.net/framework.html) 的能力。

### 快速安装部署流程

云开发控制台可以根据链接参数里指定的 Github，Gitlab，Coding，Gitee 等 Git 仓库地址来快速创建一个应用，在创建应用时可以选择创建新的云开发环境或者在已有环境上进行部署。

![](https://main.qcloudimg.com/raw/5c2cf45b90df66a99908475225bcd739.jpg)

## URL 参数说明

部署按钮会跳转到如下 URL 地址，用户可以在打开的控制台页面进行登录并选择或者创建环境来部署应用。

```
https://console.cloud.tencent.com/tcb/env/index?&action=CreateAndDeployCloudBaseProject&appUrl=${应用url（必填）}&appName=${应用名称（可选）}&workDir=${项目目录（可选）}
```

::: tip 注意
以下是“部署按钮 URL”中实现每个参数的含义的说明。使用 [部署按钮生成器](#sheng-cheng-nin-de-zi-ding-yi-bu-shu-an-niu) 来创建自己的部署按钮。
:::

### 应用代码地址

参数: `appUrl`

类型: String

项目所在 Git 仓库地址，

appUrl 参数允许您定义 Git 存储库 URL，如果要部署的项目位于存储库中的子目录，可以选择配置`workDir`参数来指定，用户在通过云开发控制台导入项目时会自动从指定的 Git 地址来导入代码。

### 应用名称（可选）

参数: `appName`

类型: String

使用 appName “应用名称”参数可以定义默认的应用名称，应用名称在用户自己的腾讯云账号下是唯一的。

### 项目相对目录（可选）

参数: `workDir`

类型: String

如果要部署的项目位于存储库中的子目录，可以选择配置`workDir`参数来指定子目录的位置。
