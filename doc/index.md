# 介绍

<a href="https://github.com/TencentCloudBase/cloudbase-framework">![](https://main.qcloudimg.com/raw/bfbcf950e2b8f42b4c5ba31fa09361e4.png)</a>

<p align="center"><a href="/TencentCloudBase/cloudbase-framework/blob/master/LICENSE"><img src="https://img.shields.io/github/license/TencentCloudBase/cloudbase-framework" alt="Github License"></a> <a href="https://www.npmjs.com/package/@cloudbase/framework-core" rel="nofollow"><img src="https://img.shields.io/npm/v/@cloudbase/framework-core" alt="Npm version"></a>  <a href="https://www.npmjs.com/package/@cloudbase/cli" rel="nofollow"><img src="https://img.shields.io/npm/dw/@cloudbase/framework-core" alt="download"></a> <a href="https://github.com/TencentCloudBase/cloudbase-framework/issues"><img src="https://img.shields.io/github/issues/TencentCloudBase/cloudbase-framework" alt="issue"></a> <a href="https://github.com/TencentCloudBase/cloudbase-framework/pulls"><img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"></a> <a href="https://github.com/TencentCloudBase/cloudbase-framework/actions?query=workflow%3ABaseline-Init"><img src="https://github.com/TencentCloudBase/cloudbase-framework/workflows/Baseline-Init/badge.svg"></a> <a href='https://gitee.com/TencentCloudBase/cloudbase-framework/stargazers'><img src='https://gitee.com/TencentCloudBase/cloudbase-framework/badge/star.svg?theme=dark' alt='star'></img></a> <a href="https://github.com/TencentCloudBase/cloudbase-framework"><img alt="star" src="https://img.shields.io/github/stars/TencentCloudBase/cloudbase-framework?style=social" ></a>
</p>

[CloudBase Framework](https://github.com/TencentCloudBase/cloudbase-framework) 是云开发官方出品的**云原生一体化部署工具**，可以帮助开发者将**静态网站、后端服务和小程序**等应用，**一键部署**到云开发 Serverless 架构的云平台上，**自动伸缩**且**无需关心运维**，聚焦应用本身，**无需关心底层配置和资源**。

## 部署现有项目

在开始之前，您需要有一个腾讯云账号。

### 1. 安装 CloudBase CLI

```bash
npm install -g @cloudbase/cli@latest
```

### 2. 一键部署应用

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

每一个例子都提供了一个 **部署按钮**，可以点击之后在云端一键部署，将应用安装在您的腾讯云开发环境中。同时我们也提供了对应的源代码，可以查看源代码，Clone 或者下载项目到本地进行修改，在本地通过 CloudBase CLI 进行一键部署。

<!-- START mdmod {replace: apps} -->

<table>

  <tr><td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/react-demo"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/cloudbase-cms/upload/2020-11-01/y37ugvjfq5gdb7koct2s70l01llb21xs-react.png">
        <br />
        <b>React 全栈应用示例 <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
        <p style="min-height: 60px;">快速搭建基于 React 结合TypeScript 开发的应用示例 ，使用云函数, 云数据库, 静态托管云资源</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=react-demo" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/react-demo">
        </a>
        </td><td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/nuxt-spa"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600430087100.png">
        <br />
        <b>Nuxt Spa 应用 <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
        <p style="min-height: 60px;">快速构建基于 Vue 的 SPA 应用 ，使用云函数, 静态托管云资源</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=nuxt-spa" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/nuxt-spa">
        </a>
        </td>
</tr>

  <tr><td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/nuxt-ssr"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600430159912.png">
        <br />
        <b>Nuxt SSR 应用 <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
        <p style="min-height: 60px;">快速构建基于 Vue 的 SSR 应用 ，使用云函数, 静态托管云资源</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=nuxt-ssr" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/nuxt-ssr">
        </a>
        </td><td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/koa-starter"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600431597355.png">
        <br />
        <b>Koa 应用 <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
        <p style="min-height: 60px;">快速构建新一代更轻量 Web 应用框架 ，使用云函数云资源</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=koa-starter" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/koa-starter">
        </a>
        </td>
</tr>

  <tr><td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/express-starter"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600680114724.png">
        <br />
        <b>Express 应用 <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
        <p style="min-height: 60px;">快速构建开放、极简 Web 应用框架 ，使用云函数云资源</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=express-starter" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/express-starter">
        </a>
        </td><td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/nest-starter"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600434436206.png">
        <br />
        <b>Nest 应用 <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
        <p style="min-height: 60px;">快速构建一种渐进式的 Node.js 框架，用于构建高效、可靠、可扩展的服务器端应用 ，使用云函数云资源</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=nest-starter" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/nest-starter">
        </a>
        </td>
</tr>

  <tr><td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/egg-starter"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600661476916.png">
        <br />
        <b>Egg 应用 <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
        <p style="min-height: 60px;">快速构建基于 Node.js 和 Koa 的 Egg 企业框架及应用 ，使用云函数云资源</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=egg-starter" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/egg-starter">
        </a>
        </td><td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/node-starter"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600662423450.png">
        <br />
        <b>Node.js 云函数示例 <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
        <p style="min-height: 60px;">快速构建 Node.js 服务端应用 ，使用云函数云资源</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=node-starter" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/node-starter">
        </a>
        </td>
</tr>

  <tr><td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/php-starter"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600662775076.png">
        <br />
        <b>PHP 云函数示例 <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
        <p style="min-height: 60px;">快速构建灵活、高效的 PHP 应用框架 ，使用云函数云资源</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=php-starter" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/php-starter">
        </a>
        </td><td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/java-starter"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600663876737.png">
        <br />
        <b>Java 云函数示例 <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
        <p style="min-height: 60px;">快速构建开放、极简 Java 应用框架 ，使用云函数云资源</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=java-starter" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/java-starter">
        </a>
        </td>
</tr>

  <tr><td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/vuepress"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600664138327.png">
        <br />
        <b>VuePress 网站应用 <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
        <p style="min-height: 60px;">快速构建基于 VuePress 的网站应用 ，使用静态托管云资源</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=vuepress" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/vuepress">
        </a>
        </td><td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/node"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600664505744.png">
        <br />
        <b>Node.js 云托管 <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
        <p style="min-height: 60px;">快速构建一个 Node.js 的 Koa 云托管实例 ，使用云托管云资源</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=node" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/node">
        </a>
        </td>
</tr>

  <tr><td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/dart"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600665868642.png">
        <br />
        <b>Aqueduct (Dart Server) 云托管 <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
        <p style="min-height: 60px;">快速构建一个包含多线程 HTTP 服务器框架的 Aqueduct 云托管实例 ，使用云数据库, 云托管云资源</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=dart" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/dart">
        </a>
        </td><td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/omi-starter"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600670706144.svg">
        <br />
        <b>Omi 应用 <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
        <p style="min-height: 60px;">快速构建一个跨框架的 Omi 应用 ，使用云函数, 静态托管云资源</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=omi-starter" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/omi-starter">
        </a>
        </td>
</tr>

</table>

点击进入[应用中心](https://cloudbase.net/marketplace.html)查看更多应用

<!-- END mdmod -->
