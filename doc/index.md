# 介绍

<a href="https://github.com/TencentCloudBase/cloudbase-framework">![](https://main.qcloudimg.com/raw/bfbcf950e2b8f42b4c5ba31fa09361e4.png)</a>

<p align="center"><a href="/TencentCloudBase/cloudbase-framework/blob/master/LICENSE"><img src="https://img.shields.io/github/license/TencentCloudBase/cloudbase-framework" alt="Github License"></a> <a href="https://www.npmjs.com/package/@cloudbase/framework-core" rel="nofollow"><img src="https://img.shields.io/npm/v/@cloudbase/framework-core" alt="Npm version"></a>  <a href="https://www.npmjs.com/package/@cloudbase/cli" rel="nofollow"><img src="https://img.shields.io/npm/dw/@cloudbase/framework-core" alt="download"></a> <a href="https://github.com/TencentCloudBase/cloudbase-framework/issues"><img src="https://img.shields.io/github/issues/TencentCloudBase/cloudbase-framework" alt="issue"></a> <a href="https://github.com/TencentCloudBase/cloudbase-framework/pulls"><img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"></a> <a href="https://github.com/TencentCloudBase/cloudbase-framework/actions?query=workflow%3ABaseline-Init"><img src="https://github.com/TencentCloudBase/cloudbase-framework/workflows/Baseline-Init/badge.svg"></a> <a href='https://gitee.com/TencentCloudBase/cloudbase-framework/stargazers'><img src='https://gitee.com/TencentCloudBase/cloudbase-framework/badge/star.svg?theme=dark' alt='star'></img></a> <a href="https://github.com/TencentCloudBase/cloudbase-framework"><img alt="star" src="https://img.shields.io/github/stars/TencentCloudBase/cloudbase-framework?style=social" ></a>
</p>


[CloudBase Framework](https://github.com/TencentCloudBase/cloudbase-framework) 是云开发官方出品的**云原生一体化部署工具**，可以帮助开发者将**静态网站、后端服务和小程序**等应用，**一键部署**到云开发 Serverless 架构的云平台上，**自动伸缩**且**无需关心运维**，聚焦应用本身，**无需关心底层配置和资源**。

## 部署现有项目

在开始之前，您需要有一个腾讯云账号。

### 1.  安装 CloudBase CLI

```bash
npm install -g @cloudbase/cli@latest
```

### 2.  一键部署应用

在项目目录执行 `cloudbase` 命令进行自动检测部署：

```bash
cloudbase
```

执行 `cloudbase` 命令后会显示如下所示的命令行交互界面，在检查登录、选择环境之后，会自动进行项目语言和框架检测，如果检测到匹配的框架和语言，会生成默认的插件配置并进行确认，确认之后即可进行一键部署。

```
cloudbase


✔ 是否使用云开发部署当前项目 <Projects/test/test-vue> ？ (Y/n) · true
✔ 选择关联环境 · webpage - [webpage:按量计费]
   ______ __                   __ ____
  / ____// /____   __  __ ____/ // __ ) ____ _ _____ ___
 / /    / // __ \ / / / // __  // __  |/ __ `// ___// _ \
/ /___ / // /_/ // /_/ // /_/ // /_/ // /_/ /(__  )/  __/
\_________\____/ \__,_/ \__,_//_____/ \__,_//____/ \___/       __
   / ____/_____ ____ _ ____ ___   ___  _      __ ____   _____ / /__
  / /_   / ___// __ `// __ `__ \ / _ \| | /| / // __ \ / ___// //_/
 / __/  / /   / /_/ // / / / / //  __/| |/ |/ // /_/ // /   / ,<
/_/    /_/    \__,_//_/ /_/ /_/ \___/ |__/|__/ \____//_/   /_/|_|


 CloudBase Framework  info     Version v1.2.10
 CloudBase Framework  info     Github: https://github.com/TencentCloudBase/cloudbase-framework

 CloudBase Framework  info     EnvId webpage
? 检测到当前项目包含 Vue.js 项目

  🔨 构建脚本 `npm run build`
  📦 本地静态文件目录 `dist`

  是否需要修改默认配置 No
? 请输入应用唯一标识(支持大小写字母数字及连字符, 同一账号下不能相同) test-vue
? 是否需要保存当前项目配置，保存配置之后下次不会再次询问 Yes
 CloudBase Framework  info     📦 install plugins
```

::: tip 注意
如果您的应用没有被自动检测识别出语言和框架配置，您可以查看 **配置说明** 和 **插件体系**来进行自定义配置，然后再执行 `cloudbase` 命令来进行部署。
:::

## 快速入门

下面的快速开始部分可以帮助您更快地体验 CloudBase Framework 的能力，以便尽快开始将自己的项目部署起来。

每一个例子都提供了一个 **部署按钮**，可以点击之后在云端一键部署，将应用安装在您的腾讯云开发环境中。

同时我们也提供了对应的源代码，可以查看源代码，Clone 或者下载项目到本地进行修改，在本地通过 CloudBase CLI 进行一键部署。





