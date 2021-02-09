<a href="https://github.com/Tencent/cloudbase-framework">![](https://main.qcloudimg.com/raw/d0f4f8cf03d1267c396eb4cf3570031b.png)</a>

<p align="center"><a href="/Tencent/cloudbase-framework/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-blue" alt="Github License"></a> <a href="https://www.npmjs.com/package/@cloudbase/framework-core" rel="nofollow"><img src="https://img.shields.io/npm/v/@cloudbase/framework-core" alt="Npm version"></a> <a href="https://lernajs.io/" rel="nofollow"><img src="https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg" alt="lerna"></a> <a href="https://www.npmjs.com/package/@cloudbase/cli" rel="nofollow"><img src="https://img.shields.io/npm/dw/@cloudbase/framework-core" alt="download"></a> <a href="https://github.com/Tencent/cloudbase-framework/issues"><img src="https://img.shields.io/github/issues/Tencent/cloudbase-framework" alt="issue"></a> <a href="https://github.com/Tencent/cloudbase-framework/pulls"><img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"></a> <a href="https://github.com/Tencent/cloudbase-framework/actions?query=workflow%3ABaseline-Init"><img src="https://github.com/Tencent/cloudbase-framework/workflows/Baseline-Init/badge.svg"></a> <a href='https://gitee.com/TencentCloudBase/cloudbase-framework/stargazers'><img src='https://gitee.com/TencentCloudBase/cloudbase-framework/badge/star.svg?theme=dark' alt='star'></img></a> <a href="https://github.com/Tencent/cloudbase-framework"><img alt="star" src="https://img.shields.io/github/stars/Tencent/cloudbase-framework?style=social" ></a>
</p>

<h1 align="center">云开发 CloudBase Framework</h1>

<p align="center">
🚀 CloudBase Framework 是云开发官方出品的前后端一体化部署工具 🔥
</p>

<p align="center">
<b>无需改动代码，前后端一键托管部署，基于Serverless架构，加速访问，弹性免运维。</b>
</p>

<table>
<tr>
  <td align="center">
    <a href="https://cloudbase.net/framework.html" target="_blank" title="CloudBase Framework 官网">
      <img width="50%" src="https://main.qcloudimg.com/raw/88e60798bc268017674990cc72f3a4b2.png">
    </a>
  </td>
  <td align="center">
    <a href="https://docs.cloudbase.net/framework/" target="_blank">
      <img width="50%" src="https://main.qcloudimg.com/raw/f5f651ff0d1c5e782a366d951b9ceadf.png">
    </a>
  </td>
  <td align="center">
  <a href="https://cloudbase.net/marketplace.html" target="_blank">
    <img width="50%" src="https://main.qcloudimg.com/raw/1b363736b3d66e905d11b9036361574e.png">
  </a>
  </td>
  <td align="center">
   <a href="https://docs.cloudbase.net/framework/plugins/#guan-fang-cha-jian-lie-biao" target="_blank">
    <img width="50%" src="https://main.qcloudimg.com/raw/ad334b6cf439366bceb80498ec8f0b98.png">
  </a>
  </td>
  <td align="center">
  <a href="https://cloudbase.net/community.html" target="_blank">
    <img width="50%" src="https://main.qcloudimg.com/raw/8dbe9b04c68b807ea524e1a5c187e852.png">
  </a>
  </td>
</tr>
</table>

<details>
<summary>更多特性和优势</summary>

![](https://main.qcloudimg.com/raw/2e1f83c30bdea819b3a7d0c098353c9b.png)

![](https://main.qcloudimg.com/raw/ac39db57bcadce1a47d490935bd46c79.png)

![](https://main.qcloudimg.com/raw/18f05eadb428fb281a8ff78ae79087fe.png)

![](https://main.qcloudimg.com/raw/c821f21c3ff43d26db39cadf85957e94.png)

</details>

## Table of Contents

- [快速开始](#quick-start)
- [项目示例](#examples)
- [插件](#plugins)
- [配置示例](#conf)
- [Changelog](#changelog)
- [License](#license)
- [优秀应用案例](#user)
- [在线交流群](#community)
- [Contributors](#contributor)
- [贡献指南](#contribute)

## <a name="quick-start"></a> 快速开始

1. **安装 CLI**

```bash
npm install -g @cloudbase/cli@latest
```

2. **初始化一个应用**

```bash
cloudbase init
```

3. **部署应用**

```bash
cloudbase framework deploy
```

<details>
 <summary>一键部署一个 Vue CLI 创建的 项目</summary>

![](https://6678-fx-1259727701.tcb.qcloud.la/ezgif-4-ee79409c8665.gif)

</details>

## <a name="examples"></a>项目示例

下面的快速开始部分可以帮助您更快地体验 CloudBase Framework 的能力，以便尽快开始将自己的项目部署起来。

<details>
 <summary>查看项目示例</summary>

每一个例子都提供了一个 **部署按钮**，可以点击之后在云端一键部署，将应用安装在您的腾讯云开发环境中。同时我们也提供了对应的源代码，可以查看源代码，Clone 或者下载项目到本地进行修改，在本地通过 CloudBase CLI 进行一键部署。

<!-- START mdmod {replace: apps} -->
<table>

  <tr><td style="vertical-align: top;">
              <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/daruk-starter"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/cloudbase-cms/upload/2021-01-05/75e7u2jzm0t4qn3q55rc09ysqs5dv9vb-daruk.png">
              <br />
              <b>Daruk 应用 <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
              <p style="min-height: 60px;">Daruk 是一款基于 Koa2，使用 Typescript 开发的轻量级 web 框架 ，使用���函数云资源</p>
              <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=daruk-starter" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>
              <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/daruk-starter">
              </a>
              </td><td style="vertical-align: top;">
              <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/thinkjs-starter"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/cloudbase-cms/upload/2021-01-05/5e42l6y34472j7018nvdndm6msptrogi-logo (1).png">
              <br />
              <b>ThinkJS 应用 <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
              <p style="min-height: 60px;">ThinkJS 是一款可以使用ES6/7 特性开发项目的Node.js 框架，支持TypeScript。 ，使用云函数云资源</p>
              <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=thinkjs-starter" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>
              <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/thinkjs-starter">
              </a>
              </td>
</tr>

  <tr><td style="vertical-align: top;">
              <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase-Marketplace/jenkins/tree/master/"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/cloudbase-cms/upload/2020-11-03/2nuqw5gbavvbp60r07ekxtq0r703a3tn-logo.png">
              <br />
              <b>Jenkins <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
              <p style="min-height: 60px;">Jenkins 是一个独立的开源软件项目，是基于 Java 开发的一种持续集成工具，用于监控持续重复的工作，旨在提供一个开放易用的软件平台，使软件的持续集成变成可能。 ，使用云托管,CFS云资源</p>
              <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase-Marketplace/jenkins&workDir=" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>
              <a target="_blank" href="https://github.com/TencentCloudBase-Marketplace/jenkins/tree/master/">
              </a>
              </td><td style="vertical-align: top;">
              <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/go-starter"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600676354450.png">
              <br />
              <b>Go 云函数 <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
              <p style="min-height: 60px;">快速搭建一个基于 GO 语言的简单、可靠、高效的应用 ，使用云函数云资源</p>
              <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=go-starter" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>
              <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/go-starter">
              </a>
              </td>
</tr>

  <tr><td style="vertical-align: top;">
              <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/java-starter"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600663876737.png">
              <br />
              <b>Java 云函数示例 <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
              <p style="min-height: 60px;">快速构建开放、极简 Java 应用框架 ，使用云函数云资源</p>
              <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=java-starter" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>
              <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/java-starter">
              </a>
              </td><td style="vertical-align: top;">
              <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/php-starter"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600662775076.png">
              <br />
              <b>PHP 云函数示例 <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
              <p style="min-height: 60px;">快速构建灵活、高效的 PHP 应用框架 ，使用云函数云资源</p>
              <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=php-starter" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>
              <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/php-starter">
              </a>
              </td>
</tr>

  <tr><td style="vertical-align: top;">
              <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/taro-starter"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600672235661.png">
              <br />
              <b>Taro 应用 <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
              <p style="min-height: 60px;">快速构建 Taro 全栈应用框架 ，使用云函数, 静态托管云资源</p>
              <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=taro-starter" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>
              <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/taro-starter">
              </a>
              </td><td style="vertical-align: top;">
              <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/omi-starter"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600670706144.svg">
              <br />
              <b>Omi 应用 <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
              <p style="min-height: 60px;">快速构建一个跨框架的 Omi 应用 ，使用云函数, 静态托管云资源</p>
              <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=omi-starter" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>
              <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/omi-starter">
              </a>
              </td>
</tr>

  <tr><td style="vertical-align: top;">
              <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/dart"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600665868642.png">
              <br />
              <b>Aqueduct (Dart Server) 云托管 <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
              <p style="min-height: 60px;">快速构建一个包含多线程 HTTP 服务器框架的 Aqueduct 云托管实例 ，使用云数据库, 云托管云资源</p>
              <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=dart" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>
              <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/dart">
              </a>
              </td><td style="vertical-align: top;">
              <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase-Marketplace/nextcloud/tree/master/"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/cloudbase-cms/upload/2020-11-03/y9xcq0xi631eszidmmsiih3inspwl83b-logo.png">
              <br />
              <b>Nextcloud <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
              <p style="min-height: 60px;">Nextcloud 是一套个人云存储解决方案，内置了图片相册、日历联系人、文件管理、RSS 阅读等丰富的应用。 ，使用云托管,CynosDB,CFS云资源</p>
              <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase-Marketplace/nextcloud&workDir=" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>
              <a target="_blank" href="https://github.com/TencentCloudBase-Marketplace/nextcloud/tree/master/">
              </a>
              </td>
</tr>

  <tr><td style="vertical-align: top;">
              <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/vuepress"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600664138327.png">
              <br />
              <b>VuePress 网站应用 <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
              <p style="min-height: 60px;">快速构建基于 VuePress 的网站应用 ，使用静态托管云资源</p>
              <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=vuepress" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>
              <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/vuepress">
              </a>
              </td><td style="vertical-align: top;">
              <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/nest-starter"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600434436206.png">
              <br />
              <b>Nest 应用 <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
              <p style="min-height: 60px;">快速构建一种渐进式的 Node.js 框架，用于构建高效、可靠、可扩展的服务器端应用 ，使用云函数云资源</p>
              <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=nest-starter" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>
              <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/nest-starter">
              </a>
              </td>
</tr>

  <tr><td style="vertical-align: top;">
              <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/egg-starter"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600661476916.png">
              <br />
              <b>Egg 应用 <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
              <p style="min-height: 60px;">快速构建基于 Node.js 和 Koa 的 Egg 企业框架及应用 ，使用云函数云资源</p>
              <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=egg-starter" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>
              <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/egg-starter">
              </a>
              </td><td style="vertical-align: top;">
              <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/next-ssr"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600742226934.png">
              <br />
              <b>Next SSR 应用 <img height="20px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg"></b></a><br/>
              <p style="min-height: 60px;">快速构建一个简单、智能、静态和服务器混合渲染的应用框架 ，使用云函数, 静态托管云资源</p>
              <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=next-ssr" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>
              <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/next-ssr">
              </a>
              </td>
</tr>

</table>

点击进入[应用中心](https://cloudbase.net/marketplace.html)查看更多应用
      
<!-- END mdmod -->

</details>

## <a name="plugins"></a>插件

云开发 CloudBase Framework 支持插件机制，提供了多种应用框架和云资源的插件，只需要很少的配置甚至 0 配置就可以现有应用和云开发 CloudBase Framework 框架进行集成。

<details>
 <summary>查看插件说明</summary

插件可以处理应用中的一些独立单元的构建、部署、开发、调试等流程。例如 website 插件可以处理静态网站等单元，node 插件可以处理 koa 、express 等 node 应用。插件可以组合使用。

插件的配置写在 cloudbaserc 文件中，目前仅支持 JSON 文件，后续会支持 YAML。

请参考完整的[插件文档](https://docs.cloudbase.net/framework/plugins/)

插件的配置可以手动填写，也可以自动生成，目前针对前端框架支持自动识别填写插件。

### 自动检测生成插件配置流程

可以在项目目录下直接运行 `cloudbase` 命令进行自动检测生成插件配置文件并部署

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
 CloudBase Framework  info     Github: https://github.com/Tencent/cloudbase-framework

 CloudBase Framework  info     EnvId webpage
? 检测到当前项目包含 Vue.js 项目

  🔨 构建脚本 `npm run build`
  📦 本地静态文件目录 `dist`

  是否需要修改默认配置 No
? 请输入应用唯一标识(支持大小写字母数字及连字符, 同一账号下不能相同) test-vue
? 是否需要保存当前项目配置，保存配置之后下次不会再次询问 Yes
 CloudBase Framework  info     📦 install plugins
```

### 目前支持的插件列表

<!-- START mdmod {replace: plugins} -->

| 插件链接 | 插件 | 最新版本 | 插件介绍 |
| -------- | ---- | -------- | -------- |
| <a href="https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-website"><img width="200" src="https://main.qcloudimg.com/raw/abbc0f23ee92e8f4665ab316b6126d33.jpg"></a>  | [@cloudbase/framework-plugin-website](https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-website) |[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-website)](https://www.npmjs.com/package/@cloudbase/framework-plugin-website) | 一键部署网站应用|
| <a href="https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-node"><img width="200" src="https://main.qcloudimg.com/raw/80526dcba2f27ed2619ac43b9b623d5a.jpg"></a>  | [@cloudbase/framework-plugin-node](https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-node) |[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-node)](https://www.npmjs.com/package/@cloudbase/framework-plugin-node) | 一键部署 Node 应用（支持底层部署为函数或者 云托管）|
| <a href="https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-nuxt"><img width="200" src="https://main.qcloudimg.com/raw/6d48ab8bc29c38558cd258b28b14f94e.jpg"></a>  | [@cloudbase/framework-plugin-nuxt](https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-nuxt) |[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-nuxt)](https://www.npmjs.com/package/@cloudbase/framework-plugin-nuxt) | 一键部署 Nuxt SSR 应用|
| <a href="https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-function"><img width="200" src="https://main.qcloudimg.com/raw/2cd529a816464f59684515f73b0a5622.jpg"></a>  | [@cloudbase/framework-plugin-function](https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-function) |[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-function)](https://www.npmjs.com/package/@cloudbase/framework-plugin-function) | 一键部署函数资源|
| <a href="https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-container"><img width="200" src="https://main.qcloudimg.com/raw/7e5e467a45bdfb5f5f4cc2eb27ea71bb.jpg"></a>  | [@cloudbase/framework-plugin-container](https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-container) |[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-container)](https://www.npmjs.com/package/@cloudbase/framework-plugin-container) | 一键部署云托管容器服务|
| <a href="https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-dart"><img width="200" src="https://main.qcloudimg.com/raw/fabde81e6232f0eccf4914721ee2a55c.jpg"></a>  | [@cloudbase/framework-plugin-dart](https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-dart) |[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-dart)](https://www.npmjs.com/package/@cloudbase/framework-plugin-dart) | 一键部署 Dart 应用|
| <a href="https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-database"><img width="200" src="https://main.qcloudimg.com/raw/41a9bd0e62c638ab40cb8b8cba26696b.jpg"></a>  | [@cloudbase/framework-plugin-database](https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-database) |[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-database)](https://www.npmjs.com/package/@cloudbase/framework-plugin-database) | 一键声明式部署云开发 NoSQL 云数据库|
| <a href="https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-deno"><img width="200" src="https://main.qcloudimg.com/raw/70429911e53a56366c39e11f5596e790.jpg"></a>  | [@cloudbase/framework-plugin-deno](https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-deno) |[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-deno)](https://www.npmjs.com/package/@cloudbase/framework-plugin-deno) | 一键部署 Deno 应用|
| <a href="https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-next"><img width="200" src="https://main.qcloudimg.com/raw/484de9a30676fb6ede6078622eea0274.png"></a>  | [@cloudbase/framework-plugin-next](https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-next) |[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-next)](https://www.npmjs.com/package/@cloudbase/framework-plugin-next) | 一键部署 Next SSR 应用|
| <a href="https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-mp"><img width="200" src="https://main.qcloudimg.com/raw/3de9cef4b6ac7c72f9519f13d063fc13.jpg"></a>  | [@cloudbase/framework-plugin-mp](https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-mp) |[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-mp)](https://www.npmjs.com/package/@cloudbase/framework-plugin-mp) | 一键部署微信小程序应用|
| <a href="https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-auth"><img width="200" src="https://main.qcloudimg.com/raw/8f7534f7f3a3f3a8df2cf861040f6a8c.jpg"></a>  | [@cloudbase/framework-plugin-auth](https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-auth) |[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-auth)](https://www.npmjs.com/package/@cloudbase/framework-plugin-auth) | 一键设置登录配置|
<!-- 新增/删除/修改插件信息，请修改 community/plugins/index.json，然后执行 npm run build:markdown-->

<!-- END mdmod -->

</details>

## <a name="conf"></a> 配置示例

例如一个 Vue 的全栈项目，包含网站前端和云函数

<details>
 <summary>查看 Vue 全栈项目的配置示例</summary>

可以在在项目下手动创建一个 `cloudbaserc.json`，填写如下配置文件，调用 `cloudbase framework deploy` 进行部署

或者直接运行 `cloudbase` 来进行自动检测并部署

```json
{
  "envId": "{{env}}",
  "framework": {
    "plugins": {
      "client": {
        "use": "@cloudbase/framework-plugin-website",
        "inputs": {
          "buildCommand": "npm run build",
          "outputPath": "dist"
        }
      },
      "server": {
        "use": "@cloudbase/framework-plugin-function",
        "inputs": {
          "functionRootPath": "cloudfunctions",
          "functions": [
            {
              "name": "helloworld",
              "config": {
                "timeout": 5,
                "envVariables": {},
                "runtime": "Nodejs10.15",
                "memorySize": 128
              }
            }
          ]
        }
      }
    }
  }
}
```

</details>

更多配置详细参数说明，可以查看配置说明文档，点击[查看配置文档](https://docs.cloudbase.net/framework/config.html)

## <a name="changelog"></a> Changelog

CloudBase Framework 的版本变更日志请参阅 [changelog](https://github.com/Tencent/cloudbase-framework/blob/master/CHANGELOG.md) 文件

## <a name="license"></a>License

开源协议文档请参阅 [Apache License 2.0](https://github.com/Tencent/cloudbase-framework/blob/master/LICENSE)

## <a name="user"></a> 优秀应用案例

<!-- START mdmod {replace: usercases} -->

<table>

  <tr><td align="center"><a target="_blank" href="https://work.weixin.qq.com/"><img width="100px;" src="https://main.qcloudimg.com/raw/594c677f67fa352a1b0c73cdc31c88f1.jpg"><br /><sub><b>企业微信</b></sub></a><br/><a target="_blank" href="https://work.weixin.qq.com/">🌐</a></td><td align="center"><a target="_blank" href="https://ilive.qq.com/"><img width="100px;" src="https://nowpic.gtimg.com/feeds_pic/ajNVdqHZLLCSibq1Mbc4x7v3q63wjgXdKJUbUuynLCj1RUbuu0yOvdw/"><br /><sub><b>腾讯直播</b></sub></a><br/><a target="_blank" href="https://ilive.qq.com/">🌐</a></td><td align="center"><a target="_blank" href="https://cloud.tencent.com/product/lowcode"><img width="100px;" src="https://main.qcloudimg.com/raw/fe8883203548358b9a337bc07723796b.png"><br /><sub><b>云开发低码平台</b></sub></a><br/><a target="_blank" href="https://cloud.tencent.com/product/lowcode">🌐</a></td><td align="center"><a target="_blank" href="https://xinyue.qq.com/"><img width="100px;" src="https://main.qcloudimg.com/raw/5f4bc0fc5cb7525baf6b43732e0389c8.png"><br /><sub><b>心悦俱乐部</b></sub></a><br/><a target="_blank" href="https://xinyue.qq.com/">🌐</a></td><td align="center"><a target="_blank" href="https://cloud.tencent.com/"><img width="100px;" src="https://main.qcloudimg.com/raw/715269aa213967150d4508a5fe81d666.png"><br /><sub><b>健康码</b></sub></a><br/><a target="_blank" href="https://cloud.tencent.com/">🌐</a></td>
</tr>

  <tr><td align="center"><a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-extension-cms"><img width="100px;" src="https://main.qcloudimg.com/raw/d56f7877c8fec451718459a3aa8bbc9a.png"><br /><sub><b>CloudBase CMS</b></sub></a><br/><a target="_blank" href="https://cms-demo-1252710547.tcloudbaseapp.com/#/login">🌐</a></td><td align="center"><a target="_blank" href="https://github.com/hi-our/hi-face"><img width="100px;" src="https://image-hosting.xiaoxili.com/img/img/20200920/eca5f4fa2f7f5512fe236d5dfd05f1c0-b879e7.jpg"><br /><sub><b>Hi头像</b></sub></a><br/><a target="_blank" href="https://face.xiaoxili.com">🌐</a></td><td align="center"><a target="_blank" href="https://github.com/TCloudBase/WEB-TodoList-framework"><img width="100px;" src="https://main.qcloudimg.com/raw/d56f7877c8fec451718459a3aa8bbc9a.png"><br /><sub><b>CloudBase TodoList</b></sub></a><br/><a target="_blank" href="https://acc.cloudbase.vip/todo">🌐</a></td><td align="center"><a target="_blank" href="https://github.com/TCloudBase/WXAPP-WEB-ShowMess"><img width="100px;" src="https://main.qcloudimg.com/raw/d56f7877c8fec451718459a3aa8bbc9a.png"><br /><sub><b>ShowMess实时弹幕</b></sub></a><br/><a target="_blank" href="https://f.cloudbase.vip">🌐</a></td><td align="center"><a target="_blank" href="https://github.com/1377283509/CampusShooting"><img width="100px;" src="https://gitee.com/cc_li/images/raw/master/2020/11/04/221549.jpeg"><br /><sub><b>校拍</b></sub></a><br/><a target="_blank" href="">🌐</a></td>
</tr>

  <tr><td align="center"><a target="_blank" href="https://github.com/xcatliu/pagic"><img width="100px;" src="https://pagic.org/assets/pagic_logo.png"><br /><sub><b>Pagic</b></sub></a><br/><a target="_blank" href="">🌐</a></td><td align="center"><a target="_blank" href="https://www.hzecool.com/"><img width="100px;" src="https://main.qcloudimg.com/raw/d56f7877c8fec451718459a3aa8bbc9a.png"><br /><sub><b>衣科官网</b></sub></a><br/><a target="_blank" href="https://www.hzecool.com/">🌐</a></td><td align="center"><a target="_blank" href="https://github.com/imaegoo/twikoo"><img width="100px;" src="https://696d-imaegoo-16fe3d-1252243992.tcb.qcloud.la/logo/twikoo.png"><br /><sub><b>Twikoo 评论</b></sub></a><br/><a target="_blank" href="https://twikoo.js.org/">🌐</a></td><td align="center"><a target="_blank" href=""><img width="100px;" src="https://6f6e-one-f81300-1255396116.tcb.qcloud.la/quake_qr.jpg"><br /><sub><b>实时地震</b></sub></a><br/><a target="_blank" href="">🌐</a></td><td align="center"><a target="_blank" href="https://github.com/Handsomedoggy/KodExplorer"><img width="100px;" src="https://github.com/Handsomedoggy/KodExplorer/blob/master/logo.png"><br /><sub><b>可道云网盘</b></sub></a><br/><a target="_blank" href="">🌐</a></td>
</tr>

  <tr><td align="center"><a target="_blank" href="https://github.com/nasawz/niceup"><img width="100px;" src="https://md-1256312109.cos.ap-beijing.myqcloud.com/uPic/Group.svg"><br /><sub><b>NiceUp</b></sub></a><br/><a target="_blank" href="https://nice-9goo8zpofac7bee9-1304765945.tcloudbaseapp.com/docs/">🌐</a></td><td align="center"><a target="_blank" href="https://daodewenzhang.cn"><img width="100px;" src="https://daodewenzhang.cn/img/ic_launcher.png"><br /><sub><b>道德文章</b></sub></a><br/><a target="_blank" href="https://daodewenzhang.cn">🌐</a></td><td align="center"><a target="_blank" href="https://github.com/beetcb/sosf"><img width="100px;" src="https://main.qcloudimg.com/raw/d56f7877c8fec451718459a3aa8bbc9a.png"><br /><sub><b>OneDrive 图床</b></sub></a><br/><a target="_blank" href="https://sosf.beetcb.com/?path=/demo.svg">🌐</a></td><td align="center"><a target="_blank" href="https://github.com/lizheming/waline"><img width="100px;" src="https://cdn.jsdelivr.net/gh/lizheming/waline/assets/waline.png"><br /><sub><b>Waline 评论系统</b></sub></a><br/><a target="_blank" href="https://waline.js.org/">🌐</a></td><td align="center"><a target="_blank" href="https://github.com/liyupi/code-nav/tree/master/code-nav-home"><img width="100px;" src="https://636f-codenav-8grj8px727565176-1256524210.tcb.qcloud.la/img/1610686940692-logo.3c8859f8.png"><br /><sub><b>编程主页</b></sub></a><br/><a target="_blank" href="https://home.code-nav.cn">🌐</a></td>
</tr>

  <tr><td align="center"><a target="_blank" href="https://github.com/LanHao0/cloudbase-global-aqi-visualize"><img width="100px;" src="https://github.com/LanHao0/cloudbase-global-aqi-visualize/blob/master/worldAir.png"><br /><sub><b>全球空气质量监测可视化</b></sub></a><br/><a target="_blank" href="http://worldair.lanhaoo.club/">🌐</a></td>
</tr>

</table>

[持续征集优秀应用案例](https://github.com/Tencent/cloudbase-framework/issues/91)

<!-- END mdmod -->

## <a name="community"></a> 在线交流群

如果在使用、安装过程中有任何问题，或者建议，欢迎加群讨论、反馈问题，或加云开发小助手微信： Tcloudedu1，发送 CBF 入群。

<table>
  <tr>
    <td>
    云开发小助手微信
    <br>
    <img src="https://main.qcloudimg.com/raw/d2092f06d0c25cbbdde1f699f9b4b3b1.png" width="100px;" alt=""/>
    </td>
   <td>
      微信群
      <br>
      <img src="https://main.qcloudimg.com/raw/f62645ae07fec77638db3711791f00e1.png" width="100px;" alt=""/>
    </td>
    <td>
      QQ 群
      <br>
      <img src="https://main.qcloudimg.com/raw/52e3e5062e01cc9058689138c9e8f02f.jpg" width="100px;" alt=""/>
    </td>
  </tr>
</table>

## CloudBase Framework 资讯

### 技术文章

- [开源一个辅助 B 站 UP 办抽奖活动的工具](https://www.cnblogs.com/nasa/p/14167262.html)
- [如何在持续集成（CI）环境中使用 CloudBase Framework](https://docs.cloudbase.net/framework/ci.html)
- [实战丨借助云开发 Framework 快速部署 Kodexplorer](https://cloudbase.net/community/share/articles/1526e12a6006ce400018eefa7882b506.html)
- [腾讯 CloudBase ，开启一键部署](https://immmmm.com/tx-cloudbase-framework/)
- [长文攻略| 快速打造一键部署云开发应用](https://cloud.tencent.com/developer/article/1775450)
- [如何将开源容器应用快速打造为云开发应用](https://cloudbase.net/community/share/articles/3b020ca36008ea5d004673b61ebd6f04.html)
- [云开发还可以这么玩系列之二----小手一点，一键部署！](https://developers.weixin.qq.com/community/develop/article/doc/00062e9c214b78b8c78b1491d5b413)
- [如何更快打造云原生应用：CloudBase Framework 云原生一体化实践](https://www.infoq.cn/article/peocxuhjdwuxlxi7lv65)
- [CloudBase FrameWork 如何进行云托管部署](https://cloudbase.net/community/share/articles/2424fa985fed8fef00ef767c590f0555.html)
- [云开发外卖优惠券小程序之 CLI 一键部署](https://developers.weixin.qq.com/community/develop/article/doc/000e622832cac0b8716beab485b813)
- [小程序·云开发地表最强 CI 利器来了](https://cloudbase.net/community/share/articles/0bcbdde05fb4a21200006eba31db31f9.html)
- [基于云开发 CloudBase 搭建在线视频会议应用](https://cloudbase.net/community/share/articles/2fd465895fb335f500d9c03b76f48779.html)
- [基于 ThinkJS 的云开发体验](https://cloudbase.net/community/share/articles/98bb04175fdacdbe0006bf1b2774205e.html)
- [如何把 Flutter 云端一体化做到极致？](https://cloudbase.net/community/share/articles/f2716ee45f28f9c900574d1f1e064e9f.html)
- [如何用云开发快速搭建实时 Todo List 应用](https://cloudbase.net/community/share/articles/b1cb7d3a5f39e4f300b41bcd78e9aedd.html)
- [如何用 Cloudbase Framework 部署一个 Vue 项目](https://cloudbase.net/community/share/articles/b333e0365fae0298009f112050646450.html)
- [第一个 Deno 部署工具是如何打造的？](https://cloudbase.net/community/share/articles/60173c665f44d8e900438bb57ee9d9f8.html)
- [云开发推出「前后端一体化部署工具」CloudBase Framework](https://cloudbase.net/community/share/articles/b4f7b7d25fab5c330068ed523f8db5a8.html)

[✍️ 欢迎提交技术文章](https://github.com/Tencent/cloudbase-framework/blob/master/community/posts/README.md)

### 演讲

- [云原生一体化部署工具 CloudBase Framework 开源探索](https://ke.sifou.com/course/1650000037526331/section/1500000038144935)
- [如何更快打造云原生应用：CloudBase Framework 云原生一体化实践](https://developers.weixin.qq.com/community/business/doc/00086ceed60ca0ac9c5b655245b00d)
- [TLC 大会讲师专访：聊聊云开发 CloudBase 的设计与实践](https://developers.weixin.qq.com/community/develop/article/doc/0000e8e38dce783548da99ad851c13)

### 新闻

- [云开应用征集应用评选：他 们 真 的 有 点 极 客](https://mp.weixin.qq.com/s/6ALOy5SpKl1aaAop_dCMAw)
- [3 分钟上线一款应用，我是怎么做到的？](https://mp.weixin.qq.com/s/tAuNIw3f0LcbfuQkb4k1OA)
- [向 100 万云开发者“秀肌肉”的机会来了](https://developers.weixin.qq.com/community/develop/article/doc/0006c83221820087dc8b61e9551013)
- [国内首发，这款 Serverless 云原生一体化部署工具正式开源！](https://cloudbase.net/community/share/articles/85ff8afa5fea952d00e079bf24a3c724.html)
- [腾讯云十年新风向：云原生与开源的未来](https://www.leiphone.com/news/202012/Ao4Xg8E6YcbASFeQ.html)
- [腾讯云首次公布云原生全系产品矩阵，提供国内最完善产品矩阵](http://www.sohu.com/a/410762466_220528)
- [这个小小小小小变化，你发现了没？](https://developers.weixin.qq.com/community/develop/article/doc/00088c6a06c090085d4b9ed825ac13)
- [【年度回顾】2020，云开发的 20 个重大更新](https://developers.weixin.qq.com/community/develop/article/doc/000e0421af02683b269bf97c45b013)
- [凤凰网：腾讯开源 Serverless 云原生一体化部署工具](https://tech.ifeng.com/c/82QmuBnxirE)
- [腾讯科技：国内首发！腾讯云原生一体化部署工具宣布开源](https://view.inews.qq.com/a/TEC2020122301795000?openid=o04IBAFpKGglC-M8UhvMWNvZB4_k&key=28f30db0e9a68db6ac09f9e5fce6ac6868c7187049e86728ffa35a2a75911d8f06a028a5f8f754a29f2dc0534b77144149aa036379ec6a9785ddca97ef3848bcaf95f9dfa75f60f8ed3400c54894cadc01ac4afbfbe7b6b1577b563a9404aabe8d18f4cc414ac3cc928647dc68df0473fd46af19718ce1b9bcd3b9780763b5a8&version=17001231&devicetype=iOS13.6&wuid=oDdoCtyGunJUMhaC1PHnwN-4hKMc&cv=0x17001231&dt=1&lang=zh_CN&pass_ticket=z12QsUmu%2B5Drw15tMbDawvYIXV3ECgdzZndS8uq476IPO0jnE7AgDW86CYbAFvoI&sharer=o04IBAFpKGglC-M8UhvMWNvZB4_k&uid=&shareto=)
- [腾讯开源：【开源公告】云原生一体化部署工具 CloudBaseFramework 开源啦](https://mp.weixin.qq.com/s/Axt33-Olz1dKjb5XuxAe2w)

## <a name="contributor"></a> Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-32-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://bookerzhao.com"><img src="https://avatars2.githubusercontent.com/u/7686861?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Booker Zhao</b></sub></a><br /><a href="#infra-binggg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/Tencent/cloudbase-framework/commits?author=binggg" title="Tests">⚠️</a> <a href="https://github.com/Tencent/cloudbase-framework/commits?author=binggg" title="Code">💻</a> <a href="#plugin-binggg" title="Plugin/utility libraries">🔌</a></td>
    <td align="center"><a href="https://twitter.com/_WeijiaWang_"><img src="https://avatars0.githubusercontent.com/u/10933333?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Weijia Wang</b></sub></a><br /><a href="https://github.com/Tencent/cloudbase-framework/commits?author=starkwang" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/chhpt"><img src="https://avatars2.githubusercontent.com/u/19288423?v=4?s=100" width="100px;" alt=""/><br /><sub><b>hengechang</b></sub></a><br /><a href="https://github.com/Tencent/cloudbase-framework/commits?author=chhpt" title="Code">💻</a> <a href="#infra-chhpt" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/lt5c"><img src="https://avatars0.githubusercontent.com/u/9676050?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Zijie Zhou</b></sub></a><br /><a href="https://github.com/Tencent/cloudbase-framework/commits?author=lt5c" title="Code">💻</a> <a href="#plugin-lt5c" title="Plugin/utility libraries">🔌</a> <a href="#talk-lt5c" title="Talks">📢</a></td>
    <td align="center"><a href="http://www.qinmudi.cn/"><img src="https://avatars1.githubusercontent.com/u/2224413?v=4?s=100" width="100px;" alt=""/><br /><sub><b>erikqin</b></sub></a><br /><a href="https://github.com/Tencent/cloudbase-framework/commits?author=qinmudi" title="Code">💻</a> <a href="#maintenance-qinmudi" title="Maintenance">🚧</a> <a href="#example-qinmudi" title="Examples">💡</a></td>
    <td align="center"><a href="https://www.xiaoxili.com/"><img src="https://avatars3.githubusercontent.com/u/6348297?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Hanqin</b></sub></a><br /><a href="https://github.com/Tencent/cloudbase-framework/issues?q=author%3Ashenghanqin" title="Bug reports">🐛</a> <a href="#example-shenghanqin" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/zemzheng"><img src="https://avatars3.githubusercontent.com/u/650956?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Zem</b></sub></a><br /><a href="https://github.com/Tencent/cloudbase-framework/commits?author=zemzheng" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/magentaqin"><img src="https://avatars0.githubusercontent.com/u/30370223?v=4?s=100" width="100px;" alt=""/><br /><sub><b>magenta</b></sub></a><br /><a href="#blog-magentaqin" title="Blogposts">📝</a> <a href="https://github.com/Tencent/cloudbase-framework/commits?author=magentaqin" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/SmartCodeDavid"><img src="https://avatars0.githubusercontent.com/u/30002112?v=4?s=100" width="100px;" alt=""/><br /><sub><b>TIANXIANG LAN</b></sub></a><br /><a href="#content-SmartCodeDavid" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/fanyegong"><img src="https://avatars0.githubusercontent.com/u/12660343?v=4?s=100" width="100px;" alt=""/><br /><sub><b>liyuanfeng</b></sub></a><br /><a href="https://github.com/Tencent/cloudbase-framework/commits?author=fanyegong" title="Code">💻</a></td>
    <td align="center"><a href="https://www.ixiqin.com/"><img src="https://avatars1.githubusercontent.com/u/13283837?v=4?s=100" width="100px;" alt=""/><br /><sub><b>白宦成</b></sub></a><br /><a href="https://github.com/Tencent/cloudbase-framework/commits?author=bestony" title="Code">💻</a></td>
    <td align="center"><a href="https://yiliang.site"><img src="https://avatars0.githubusercontent.com/u/11473889?v=4?s=100" width="100px;" alt=""/><br /><sub><b>易良</b></sub></a><br /><a href="https://github.com/Tencent/cloudbase-framework/commits?author=yiliang114" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/shryzhang"><img src="https://avatars1.githubusercontent.com/u/18062954?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sherry Zhang</b></sub></a><br /><a href="https://github.com/Tencent/cloudbase-framework/commits?author=shryzhang" title="Code">💻</a> <a href="#blog-shryzhang" title="Blogposts">📝</a></td>
    <td align="center"><a href="https://github.com/Realybig"><img src="https://avatars3.githubusercontent.com/u/10878451?v=4?s=100" width="100px;" alt=""/><br /><sub><b>RealyBig</b></sub></a><br /><a href="https://github.com/Tencent/cloudbase-framework/commits?author=Realybig" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://evecalm.com"><img src="https://avatars2.githubusercontent.com/u/1655294?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Saiya</b></sub></a><br /><a href="#talk-oe" title="Talks">📢</a> <a href="https://github.com/Tencent/cloudbase-framework/issues?q=author%3Aoe" title="Bug reports">🐛</a> <a href="#blog-oe" title="Blogposts">📝</a></td>
    <td align="center"><a href="https://github.com/mirageql"><img src="https://avatars1.githubusercontent.com/u/69442876?v=4?s=100" width="100px;" alt=""/><br /><sub><b>mirageql</b></sub></a><br /><a href="https://github.com/Tencent/cloudbase-framework/commits?author=mirageql" title="Code">💻</a> <a href="#blog-mirageql" title="Blogposts">📝</a> <a href="#example-mirageql" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/TabSpace"><img src="https://avatars0.githubusercontent.com/u/550449?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tab Liang</b></sub></a><br /><a href="https://github.com/Tencent/cloudbase-framework/commits?author=TabSpace" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/juukee"><img src="https://avatars0.githubusercontent.com/u/28680837?v=4?s=100" width="100px;" alt=""/><br /><sub><b>juukee</b></sub></a><br /><a href="https://github.com/Tencent/cloudbase-framework/issues?q=author%3Ajuukee" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://blog.heyliubo.top"><img src="https://avatars1.githubusercontent.com/u/41336612?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Albert Liu</b></sub></a><br /><a href="https://github.com/Tencent/cloudbase-framework/commits?author=liulinboyi" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/SearchFan"><img src="https://avatars1.githubusercontent.com/u/42856891?v=4?s=100" width="100px;" alt=""/><br /><sub><b>SearchFan</b></sub></a><br /><a href="https://github.com/Tencent/cloudbase-framework/issues?q=author%3ASearchFan" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://a.dnuise.cn"><img src="https://avatars2.githubusercontent.com/u/48037743?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Zira</b></sub></a><br /><a href="#example-wasfzxt" title="Examples">💡</a> <a href="#blog-wasfzxt" title="Blogposts">📝</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://www.mscoder.cn/"><img src="https://avatars3.githubusercontent.com/u/80653?v=4?s=100" width="100px;" alt=""/><br /><sub><b>代码抄写狮</b></sub></a><br /><a href="https://github.com/Tencent/cloudbase-framework/issues?q=author%3ADaZiYuan" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/1377283509"><img src="https://avatars0.githubusercontent.com/u/44151817?v=4?s=100" width="100px;" alt=""/><br /><sub><b>lichaochao</b></sub></a><br /><a href="#example-1377283509" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/MrZhaoCn"><img src="https://avatars1.githubusercontent.com/u/18179784?v=4?s=100" width="100px;" alt=""/><br /><sub><b>MrZhaoCn</b></sub></a><br /><a href="https://github.com/Tencent/cloudbase-framework/commits?author=MrZhaoCn" title="Code">💻</a> <a href="#example-MrZhaoCn" title="Examples">💡</a></td>
    <td align="center"><a href="http://xcatliu.com/"><img src="https://avatars0.githubusercontent.com/u/5453359?v=4?s=100" width="100px;" alt=""/><br /><sub><b>xcatliu</b></sub></a><br /><a href="#example-xcatliu" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/seymoe"><img src="https://avatars3.githubusercontent.com/u/25032899?v=4?s=100" width="100px;" alt=""/><br /><sub><b>唐羲</b></sub></a><br /><a href="https://github.com/Tencent/cloudbase-framework/issues?q=author%3Aseymoe" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/marschenbiqi"><img src="https://avatars3.githubusercontent.com/u/44521251?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Life</b></sub></a><br /><a href="https://github.com/Tencent/cloudbase-framework/issues?q=author%3Amarschenbiqi" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://imnerd.org"><img src="https://avatars2.githubusercontent.com/u/424491?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Austin Lee</b></sub></a><br /><a href="https://github.com/Tencent/cloudbase-framework/commits?author=lizheming" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://www.imaegoo.com/"><img src="https://avatars2.githubusercontent.com/u/20182252?v=4?s=100" width="100px;" alt=""/><br /><sub><b>iMaeGoo</b></sub></a><br /><a href="#example-imaegoo" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/Handsomedoggy"><img src="https://avatars2.githubusercontent.com/u/33211616?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Doggy</b></sub></a><br /><a href="#example-Handsomedoggy" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/nasawz"><img src="https://avatars2.githubusercontent.com/u/372910?v=4?s=100" width="100px;" alt=""/><br /><sub><b>nasa.wang</b></sub></a><br /><a href="#example-nasawz" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/pandagis"><img src="https://avatars2.githubusercontent.com/u/5012180?v=4?s=100" width="100px;" alt=""/><br /><sub><b>pandagis</b></sub></a><br /><a href="#example-pandagis" title="Examples">💡</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## <a name="contribute"></a>贡献指南

欢迎大家参与到 CloudBase Framework 的开发工作，贡献一份力量

您可以选择如下的贡献方式：

- [贡献一篇技术文章](./community/posts/README.md)
- [贡献应用模板](https://docs.cloudbase.net/framework/guide/app.html)
- [提交一个应用案例](https://github.com/Tencent/cloudbase-framework/issues/91)
- [贡献代码，提交 Pull Request](https://github.com/Tencent/cloudbase-framework/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)
- [反馈 bug，提交 Issue](https://github.com/Tencent/cloudbase-framework/issues/new/choose)
- 在技术会议上发表技术演讲

我们会将您加入 [我们的贡献者名单](https://github.com/Tencent/cloudbase-framework#contributors-)

贡献方式请参考 [贡献指南](https://github.com/Tencent/cloudbase-framework/blob/master/CONTRIBUTING.md) 文档
