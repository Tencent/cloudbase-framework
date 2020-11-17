<a href="https://github.com/TencentCloudBase/cloudbase-framework">![](https://main.qcloudimg.com/raw/bfbcf950e2b8f42b4c5ba31fa09361e4.png)</a>

<p align="center"><a href="/TencentCloudBase/cloudbase-framework/blob/master/LICENSE"><img src="https://img.shields.io/github/license/TencentCloudBase/cloudbase-framework" alt="Github License"></a> <a href="https://www.npmjs.com/package/@cloudbase/framework-core" rel="nofollow"><img src="https://img.shields.io/npm/v/@cloudbase/framework-core" alt="Npm version"></a> <a href="https://lernajs.io/" rel="nofollow"><img src="https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg" alt="lerna"></a> <a href="https://www.npmjs.com/package/@cloudbase/cli" rel="nofollow"><img src="https://img.shields.io/npm/dw/@cloudbase/framework-core" alt="download"></a> <a href="https://github.com/TencentCloudBase/cloudbase-framework/issues"><img src="https://img.shields.io/github/issues/TencentCloudBase/cloudbase-framework" alt="issue"></a> <a href="https://github.com/TencentCloudBase/cloudbase-framework/pulls"><img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"></a> <a href="https://github.com/TencentCloudBase/cloudbase-framework/actions?query=workflow%3ABaseline-Init"><img src="https://github.com/TencentCloudBase/cloudbase-framework/workflows/Baseline-Init/badge.svg"></a> <a href='https://gitee.com/TencentCloudBase/cloudbase-framework/stargazers'><img src='https://gitee.com/TencentCloudBase/cloudbase-framework/badge/star.svg?theme=dark' alt='star'></img></a> <a href="https://github.com/TencentCloudBase/cloudbase-framework"><img alt="star" src="https://img.shields.io/github/stars/TencentCloudBase/cloudbase-framework?style=social" ></a>
</p>
  
<h1 align="center">云开发 CloudBase Framework</h1>
<p align="center">
🚀 CloudBase Framework 是云开发官方出品的前后端一体化部署工具 🔥
</p>

<p align="center">
<b>无需改动代码，前后端一键托管部署，基于Serverless架构，加速访问，弹性免运维。</b>
</p>

<p align="center">
  <a href="https://cloudbase.net" target="_blank">
    官网
  </a>
  / 
  <a href="https://docs.cloudbase.net/" target="_blank">
    文档
  </a>
  / 
  <a href="https://cloudbase.net/community.html" target="_blank">
    社区
  </a>
  /
  <a href="https://support.qq.com/products/148793" target="_blank">
    问答
  </a>
</p>

![](https://main.qcloudimg.com/raw/2e1f83c30bdea819b3a7d0c098353c9b.png)

![](https://main.qcloudimg.com/raw/ac39db57bcadce1a47d490935bd46c79.png)

![](https://main.qcloudimg.com/raw/18f05eadb428fb281a8ff78ae79087fe.png)

![](https://main.qcloudimg.com/raw/c821f21c3ff43d26db39cadf85957e94.png)

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

**一键部署一个 Vue CLI 创建的 项目**

![](https://6678-fx-1259727701.tcb.qcloud.la/ezgif-4-ee79409c8665.gif)

## <a name="examples"></a>项目示例

<!-- START mdmod {replace: apps} -->

<table>

  <tr><td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/react-demo"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/cloudbase-cms/upload/2020-11-01/y37ugvjfq5gdb7koct2s70l01llb21xs-react.png">
        <br />
        <b>React 全栈应用示例</b></a><br/>
        <p style="min-height: 60px;">快速搭建基于 React 结合TypeScript 开发的应用示例 ，使用云函数, 云数据库, 静态托管云资源</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=react-demo" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/react-demo">
        <img style="margin-left: 55px;height: 20px;margin-bottom: 5px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg">
        </a>
        </td><td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/nuxt-spa"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600430087100.png">
        <br />
        <b>Nuxt Spa 应用</b></a><br/>
        <p style="min-height: 60px;">快速构建基于 Vue 的 SPA 应用 ，使用云函数, 静态托管云资源</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=nuxt-spa" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/nuxt-spa">
        <img style="margin-left: 55px;height: 20px;margin-bottom: 5px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg">
        </a>
        </td>
</tr>

  <tr><td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/nuxt-ssr"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600430159912.png">
        <br />
        <b>Nuxt SSR 应用</b></a><br/>
        <p style="min-height: 60px;">快速构建基于 Vue 的 SSR 应用 ，使用云函数, 静态托管云资源</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=nuxt-ssr" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/nuxt-ssr">
        <img style="margin-left: 55px;height: 20px;margin-bottom: 5px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg">
        </a>
        </td><td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/koa-starter"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600431597355.png">
        <br />
        <b>Koa 应用</b></a><br/>
        <p style="min-height: 60px;">快速构建新一代更轻量 Web 应用框架 ，使用云函数云资源</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=koa-starter" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/koa-starter">
        <img style="margin-left: 55px;height: 20px;margin-bottom: 5px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg">
        </a>
        </td>
</tr>

  <tr><td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/express-starter"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600680114724.png">
        <br />
        <b>Express 应用</b></a><br/>
        <p style="min-height: 60px;">快速构建开放、极简 Web 应用框架 ，使用云函数云资源</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=express-starter" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/express-starter">
        <img style="margin-left: 55px;height: 20px;margin-bottom: 5px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg">
        </a>
        </td><td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/nest-starter"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600434436206.png">
        <br />
        <b>Nest 应用</b></a><br/>
        <p style="min-height: 60px;">快速构建一种渐进式的 Node.js 框架，用于构建高效、可靠、可扩展的服务器端应用 ，使用云函数云资源</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=nest-starter" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/nest-starter">
        <img style="margin-left: 55px;height: 20px;margin-bottom: 5px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg">
        </a>
        </td>
</tr>

  <tr><td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/egg-starter"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600661476916.png">
        <br />
        <b>Egg 应用</b></a><br/>
        <p style="min-height: 60px;">快速构建基于 Node.js 和 Koa 的 Egg 企业框架及应用 ，使用云函数云资源</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=egg-starter" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/egg-starter">
        <img style="margin-left: 55px;height: 20px;margin-bottom: 5px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg">
        </a>
        </td><td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/node-starter"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600662423450.png">
        <br />
        <b>Node.js 云函数示例</b></a><br/>
        <p style="min-height: 60px;">快速构建 Node.js 服务端应用 ，使用云函数云资源</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=node-starter" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/node-starter">
        <img style="margin-left: 55px;height: 20px;margin-bottom: 5px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg">
        </a>
        </td>
</tr>

  <tr><td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/php-starter"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600662775076.png">
        <br />
        <b>PHP 云函数示例</b></a><br/>
        <p style="min-height: 60px;">快速构建灵活、高效的 PHP 应用框架 ，使用云函数云资源</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=php-starter" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/php-starter">
        <img style="margin-left: 55px;height: 20px;margin-bottom: 5px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg">
        </a>
        </td><td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/java-starter"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600663876737.png">
        <br />
        <b>Java 云函数示例</b></a><br/>
        <p style="min-height: 60px;">快速构建开放、极简 Java 应用框架 ，使用云函数云资源</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=java-starter" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/java-starter">
        <img style="margin-left: 55px;height: 20px;margin-bottom: 5px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg">
        </a>
        </td>
</tr>

  <tr><td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/vuepress"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600664138327.png">
        <br />
        <b>VuePress 网站应用</b></a><br/>
        <p style="min-height: 60px;">快速构建基于 VuePress 的网站应用 ，使用静态托管云资源</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=vuepress" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/vuepress">
        <img style="margin-left: 55px;height: 20px;margin-bottom: 5px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg">
        </a>
        </td><td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/node"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600664505744.png">
        <br />
        <b>Node.js 云托管</b></a><br/>
        <p style="min-height: 60px;">快速构建一个 Node.js 的 Koa 云托管实例 ，使用云托管云资源</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=node" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/node">
        <img style="margin-left: 55px;height: 20px;margin-bottom: 5px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg">
        </a>
        </td>
</tr>

  <tr><td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/dart"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600665868642.png">
        <br />
        <b>Aqueduct (Dart Server) 云托管</b></a><br/>
        <p style="min-height: 60px;">快速构建一个包含多线程 HTTP 服务器框架的 Aqueduct 云托管实例 ，使用云数据库, 云托管云资源</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=dart" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/dart">
        <img style="margin-left: 55px;height: 20px;margin-bottom: 5px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg">
        </a>
        </td><td style="vertical-align: top;">
        <a target="_blank" style="min-height:100px; display:block;" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/omi-starter"><img width="80px;" src="https://7163-qcloud-tcb-console-1258344699.tcb.qcloud.la/uploads/1600670706144.svg">
        <br />
        <b>Omi 应用</b></a><br/>
        <p style="min-height: 60px;">快速构建一个跨框架的 Omi 应用 ，使用云函数, 静态托管云资源</p>
        <a href="https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&appUrl=https://github.com/TencentCloudBase/cloudbase-templates&workDir=omi-starter" target="_blank"><img src="https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg"/></a>         <a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/omi-starter">
        <img style="margin-left: 55px;height: 20px;margin-bottom: 5px;" src="https://main.qcloudimg.com/raw/210d07b1f37b4483c116637e5830a804.svg">
        </a>
        </td>
</tr>

</table>

点击进入[应用中心](https://cloudbase.net/marketplace.html)查看更多应用

<!-- END mdmod -->

## <a name="conf"></a> 配置示例

例如一个 Vue 的全栈项目，包含网站前端和云函数

可以在在项目下手动创建一个 `cloudbaserc.json`，填写如下配置文件，调用 `cloudbase framework deploy` 进行部署

或者直接运行 `cloudbase` 来进行自动检测并部署

```json
{
  "envId": "{{envId}}",
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

更多配置详细参数说明，可以查看配置说明文档，点击[查看配置文档](https://github.com/TencentCloudBase/cloudbase-framework/blob/master/doc/config.md)

## <a name="changelog"></a> Changelog

CloudBase Framework 的版本变更日志请参阅 [changelog](https://github.com/TencentCloudBase/cloudbase-framework/blob/master/CHANGELOG.md) 文件

## <a name="license"></a>License

开源协议文档请参阅 [Apache License 2.0](https://github.com/TencentCloudBase/cloudbase-framework/blob/master/LICENSE)

## <a name="user"></a> 优秀应用案例

<!-- START mdmod {replace: usercases} -->

<table>

  <tr><td align="center"><a target="_blank" href="https://work.weixin.qq.com/"><img width="100px;" src="https://main.qcloudimg.com/raw/594c677f67fa352a1b0c73cdc31c88f1.jpg"><br /><sub><b>企业微信</b></sub></a><br/><a target="_blank" href="https://work.weixin.qq.com/">🌐</a></td><td align="center"><a target="_blank" href="https://ilive.qq.com/"><img width="100px;" src="https://nowpic.gtimg.com/feeds_pic/ajNVdqHZLLCSibq1Mbc4x7v3q63wjgXdKJUbUuynLCj1RUbuu0yOvdw/"><br /><sub><b>腾讯直播</b></sub></a><br/><a target="_blank" href="https://ilive.qq.com/">🌐</a></td><td align="center"><a target="_blank" href="https://cloud.tencent.com/product/lowcode"><img width="100px;" src="https://main.qcloudimg.com/raw/fe8883203548358b9a337bc07723796b.png"><br /><sub><b>云开发低码平台</b></sub></a><br/><a target="_blank" href="https://cloud.tencent.com/product/lowcode">🌐</a></td><td align="center"><a target="_blank" href="https://xinyue.qq.com/"><img width="100px;" src="https://main.qcloudimg.com/raw/5f4bc0fc5cb7525baf6b43732e0389c8.png"><br /><sub><b>心悦俱乐部</b></sub></a><br/><a target="_blank" href="https://xinyue.qq.com/">🌐</a></td><td align="center"><a target="_blank" href="https://cloud.tencent.com/"><img width="100px;" src="https://main.qcloudimg.com/raw/715269aa213967150d4508a5fe81d666.png"><br /><sub><b>健康码</b></sub></a><br/><a target="_blank" href="https://cloud.tencent.com/">🌐</a></td>
</tr>

  <tr><td align="center"><a target="_blank" href="https://github.com/TencentCloudBase/cloudbase-extension-cms"><img width="100px;" src="https://main.qcloudimg.com/raw/d56f7877c8fec451718459a3aa8bbc9a.png"><br /><sub><b>CloudBase CMS</b></sub></a><br/><a target="_blank" href="https://cms-demo-1252710547.tcloudbaseapp.com/#/login">🌐</a></td><td align="center"><a target="_blank" href="https://github.com/hi-our/hi-face"><img width="100px;" src="https://image-hosting.xiaoxili.com/img/img/20200920/eca5f4fa2f7f5512fe236d5dfd05f1c0-b879e7.jpg"><br /><sub><b>Hi头像</b></sub></a><br/><a target="_blank" href="https://face.xiaoxili.com">🌐</a></td><td align="center"><a target="_blank" href="https://github.com/TCloudBase/WEB-TodoList-framework"><img width="100px;" src="https://main.qcloudimg.com/raw/d56f7877c8fec451718459a3aa8bbc9a.png"><br /><sub><b>CloudBase TodoList</b></sub></a><br/><a target="_blank" href="https://acc.cloudbase.vip/todo">🌐</a></td><td align="center"><a target="_blank" href="https://github.com/1377283509/CampusShooting"><img width="100px;" src="https://gitee.com/cc_li/images/raw/master/2020/11/04/221549.jpeg"><br /><sub><b>校拍</b></sub></a><br/><a target="_blank" href="">🌐</a></td><td align="center"><a target="_blank" href="https://github.com/xcatliu/pagic"><img width="100px;" src="https://pagic.org/assets/pagic_logo.png"><br /><sub><b>Pagic</b></sub></a><br/><a target="_blank" href="">🌐</a></td>
</tr>

</table>

[持续征集优秀应用案例](https://github.com/TencentCloudBase/cloudbase-framework/issues/91)

<!-- END mdmod -->

## <a name="community"></a> 在线交流群

<table>
  <tr>
   <td>
      微信群
      <br>
      <img src="https://main.qcloudimg.com/raw/730411c9377192efbe27d0093f5d8a89.png" width="100px;" alt=""/>
    </td>
    <td>
      QQ 群
      <br>
      <img src="https://main.qcloudimg.com/raw/52e3e5062e01cc9058689138c9e8f02f.jpg" width="100px;" alt=""/>
    </td>
  </tr>
</table>

## <a name="contributor"></a> Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-27-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://bookerzhao.com"><img src="https://avatars2.githubusercontent.com/u/7686861?v=4" width="100px;" alt=""/><br /><sub><b>Booker Zhao</b></sub></a><br /><a href="#infra-binggg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=binggg" title="Tests">⚠️</a> <a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=binggg" title="Code">💻</a> <a href="#plugin-binggg" title="Plugin/utility libraries">🔌</a></td>
    <td align="center"><a href="https://twitter.com/_WeijiaWang_"><img src="https://avatars0.githubusercontent.com/u/10933333?v=4" width="100px;" alt=""/><br /><sub><b>Weijia Wang</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=starkwang" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/chhpt"><img src="https://avatars2.githubusercontent.com/u/19288423?v=4" width="100px;" alt=""/><br /><sub><b>hengechang</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=chhpt" title="Code">💻</a> <a href="#infra-chhpt" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/lt5c"><img src="https://avatars0.githubusercontent.com/u/9676050?v=4" width="100px;" alt=""/><br /><sub><b>Zijie Zhou</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=lt5c" title="Code">💻</a> <a href="#plugin-lt5c" title="Plugin/utility libraries">🔌</a> <a href="#talk-lt5c" title="Talks">📢</a></td>
    <td align="center"><a href="http://www.qinmudi.cn/"><img src="https://avatars1.githubusercontent.com/u/2224413?v=4" width="100px;" alt=""/><br /><sub><b>erikqin</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=qinmudi" title="Code">💻</a> <a href="#maintenance-qinmudi" title="Maintenance">🚧</a> <a href="#example-qinmudi" title="Examples">💡</a></td>
    <td align="center"><a href="https://www.xiaoxili.com/"><img src="https://avatars3.githubusercontent.com/u/6348297?v=4" width="100px;" alt=""/><br /><sub><b>Hanqin</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/issues?q=author%3Ashenghanqin" title="Bug reports">🐛</a> <a href="#example-shenghanqin" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/zemzheng"><img src="https://avatars3.githubusercontent.com/u/650956?v=4" width="100px;" alt=""/><br /><sub><b>Zem</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=zemzheng" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/magentaqin"><img src="https://avatars0.githubusercontent.com/u/30370223?v=4" width="100px;" alt=""/><br /><sub><b>magenta</b></sub></a><br /><a href="#blog-magentaqin" title="Blogposts">📝</a> <a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=magentaqin" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/SmartCodeDavid"><img src="https://avatars0.githubusercontent.com/u/30002112?v=4" width="100px;" alt=""/><br /><sub><b>TIANXIANG LAN</b></sub></a><br /><a href="#content-SmartCodeDavid" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/fanyegong"><img src="https://avatars0.githubusercontent.com/u/12660343?v=4" width="100px;" alt=""/><br /><sub><b>liyuanfeng</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=fanyegong" title="Code">💻</a></td>
    <td align="center"><a href="https://www.ixiqin.com/"><img src="https://avatars1.githubusercontent.com/u/13283837?v=4" width="100px;" alt=""/><br /><sub><b>白宦成</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=bestony" title="Code">💻</a></td>
    <td align="center"><a href="https://yiliang.site"><img src="https://avatars0.githubusercontent.com/u/11473889?v=4" width="100px;" alt=""/><br /><sub><b>易良</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=yiliang114" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/shryzhang"><img src="https://avatars1.githubusercontent.com/u/18062954?v=4" width="100px;" alt=""/><br /><sub><b>Sherry Zhang</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=shryzhang" title="Code">💻</a> <a href="#blog-shryzhang" title="Blogposts">📝</a></td>
    <td align="center"><a href="https://github.com/Realybig"><img src="https://avatars3.githubusercontent.com/u/10878451?v=4" width="100px;" alt=""/><br /><sub><b>RealyBig</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=Realybig" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://evecalm.com"><img src="https://avatars2.githubusercontent.com/u/1655294?v=4" width="100px;" alt=""/><br /><sub><b>Saiya</b></sub></a><br /><a href="#talk-oe" title="Talks">📢</a> <a href="https://github.com/TencentCloudBase/cloudbase-framework/issues?q=author%3Aoe" title="Bug reports">🐛</a> <a href="#blog-oe" title="Blogposts">📝</a></td>
    <td align="center"><a href="https://github.com/mirageql"><img src="https://avatars1.githubusercontent.com/u/69442876?v=4" width="100px;" alt=""/><br /><sub><b>mirageql</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=mirageql" title="Code">💻</a> <a href="#blog-mirageql" title="Blogposts">📝</a> <a href="#example-mirageql" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/TabSpace"><img src="https://avatars0.githubusercontent.com/u/550449?v=4" width="100px;" alt=""/><br /><sub><b>Tab Liang</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=TabSpace" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/juukee"><img src="https://avatars0.githubusercontent.com/u/28680837?v=4" width="100px;" alt=""/><br /><sub><b>juukee</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/issues?q=author%3Ajuukee" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://blog.heyliubo.top"><img src="https://avatars1.githubusercontent.com/u/41336612?v=4" width="100px;" alt=""/><br /><sub><b>Albert Liu</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=liulinboyi" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/SearchFan"><img src="https://avatars1.githubusercontent.com/u/42856891?v=4" width="100px;" alt=""/><br /><sub><b>SearchFan</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/issues?q=author%3ASearchFan" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://a.dnuise.cn"><img src="https://avatars2.githubusercontent.com/u/48037743?v=4" width="100px;" alt=""/><br /><sub><b>Zira</b></sub></a><br /><a href="#example-wasfzxt" title="Examples">💡</a> <a href="#blog-wasfzxt" title="Blogposts">📝</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://www.mscoder.cn/"><img src="https://avatars3.githubusercontent.com/u/80653?v=4" width="100px;" alt=""/><br /><sub><b>代码抄写狮</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/issues?q=author%3ADaZiYuan" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/1377283509"><img src="https://avatars0.githubusercontent.com/u/44151817?v=4" width="100px;" alt=""/><br /><sub><b>lichaochao</b></sub></a><br /><a href="#example-1377283509" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/MrZhaoCn"><img src="https://avatars1.githubusercontent.com/u/18179784?v=4" width="100px;" alt=""/><br /><sub><b>MrZhaoCn</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=MrZhaoCn" title="Code">💻</a></td>
    <td align="center"><a href="http://xcatliu.com/"><img src="https://avatars0.githubusercontent.com/u/5453359?v=4" width="100px;" alt=""/><br /><sub><b>xcatliu</b></sub></a><br /><a href="#example-xcatliu" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/seymoe"><img src="https://avatars3.githubusercontent.com/u/25032899?v=4" width="100px;" alt=""/><br /><sub><b>唐羲</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/issues?q=author%3Aseymoe" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/marschenbiqi"><img src="https://avatars3.githubusercontent.com/u/44521251?v=4" width="100px;" alt=""/><br /><sub><b>Life</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/issues?q=author%3Amarschenbiqi" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## <a name="contribute"></a>贡献指南

欢迎大家参与到 CloudBase Framework 的开发工作，贡献一份力量

您可以选择如下的贡献方式：

- [贡献一篇技术文章](./community/posts/README.md)
- [贡献应用模板](./doc/app.md)
- [提交一个应用案例](https://github.com/TencentCloudBase/cloudbase-framework/issues/91)
- [贡献代码，提交 Pull Request](https://github.com/TencentCloudBase/cloudbase-framework/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22)
- [反馈 bug，提交 Issue](https://github.com/TencentCloudBase/cloudbase-framework/issues/new/choose)
- 在技术会议上发表技术演讲

我们会将您加入 [我们的贡献者名单](https://github.com/TencentCloudBase/cloudbase-framework#contributors-)

贡献方式请参考 [贡献指南](https://github.com/TencentCloudBase/cloudbase-framework/blob/master/CONTRIBUTING.md) 文档
