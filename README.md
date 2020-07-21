<a href="https://github.com/TencentCloudBase/cloudbase-framework">![](https://main.qcloudimg.com/raw/bfbcf950e2b8f42b4c5ba31fa09361e4.png)</a>
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

<p align="center"><a href="/TencentCloudBase/cloudbase-framework/blob/master/LICENSE"><img src="https://img.shields.io/github/license/TencentCloudBase/cloudbase-framework" alt="Github License"></a> <a href="https://www.npmjs.com/package/@cloudbase/framework-core" rel="nofollow"><img src="https://img.shields.io/npm/v/@cloudbase/framework-core" alt="Npm version"></a> <a href="https://lernajs.io/" rel="nofollow"><img src="https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg" alt="lerna"></a> <a href="https://www.npmjs.com/package/@cloudbase/cli" rel="nofollow"><img src="https://img.shields.io/npm/dw/@cloudbase/cli" alt="download"></a> <a href="https://github.com/TencentCloudBase/cloudbase-framework/issues"><img src="https://img.shields.io/github/issues/TencentCloudBase/cloudbase-framework" alt="issue"></a> <a href="https://github.com/TencentCloudBase/cloudbase-framework/pulls"><img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"></a> <a href="https://github.com/TencentCloudBase/cloudbase-framework/actions?query=workflow%3ABaseline-Init"><img src="https://github.com/TencentCloudBase/cloudbase-framework/workflows/Baseline-Init/badge.svg"></a> <a href="https://github.com/TencentCloudBase/cloudbase-framework"><img alt="star" src="https://img.shields.io/github/stars/TencentCloudBase/cloudbase-framework?style=social" ></a>
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
- [整体架构](#architect)
- [Roadmap](#roadmap)
- [贡献指南](#contribute)
- [License](#license)
- [Changelog](#changelog)
- [交流 QQ 群](#qq)

## <a name="quick-start"></a> 快速开始

1. **安装 CLI**

```bash
npm install -g @cloudbase/cli@latest
```

2. **登录**

```bash
cloudbase login
```

3. **初始化一个应用**

```bash
cloudbase init
```

4. **部署应用**

```bash
cloudbase framework:deploy
```

## <a name="examples"></a>项目示例

|                                                                                                                                                                                                                       | 名称                          | 应用示例介绍                                   | 基于模板创建项目                            |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ---------------------------------------------- | ------------------------------------------- |
| <a href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/vue"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/9892a3212a49bdd65ba499f2da62ac23.png"></a>             | Vue 应用                      | Vue + 云函数 + 静态网站部署                    | `cloudbase init --template vue`             |
| <a href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/react-starter"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/d94d993269048beb4827b2612ed53692.png"></a>   | React 应用                    | React + 云函数 + 静态网站部署                  | `cloudbase init --template react-starter`   |
| <a href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/react-demo"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/d94d993269048beb4827b2612ed53692.png"></a>      | React 全栈应用                | React + 云函数 + 静态网站部署+ 云数据库        | `cloudbase init --template react-demo`      |
| <a href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/nuxt-spa"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/4a2bb546f6d59133976dccd1ac962378.png"></a>        | Nuxt SPA 应用                 | Nuxt SPA + 云函数 + 静态网站部署               | `cloudbase init --template nuxt-spa`        |
| <a href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/nuxt-ssr"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/338ce75aaf22e407a02d8b5f096212d0.png"></a>        | Nuxt SSR 应用                 | Nuxt SSR + 服务端部署 + 静态网站部署           | `cloudbase init --template nuxt-ssr`        |
| <a href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/koa-starter"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/bc7e3f2989fcf65b2fe8ad37ea3f69a9.png"></a>     | Koa 应用                      | Koa + 服务端部署                               | `cloudbase init --template koa-starter`     |
| <a href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/express-starter"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/ce7fa0617399ac5e7f7bdbef5efb29d9.png"></a> | Express 应用                  | Express + 服务端部署                           | `cloudbase init --template express-starter` |
| <a href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/nest-starter"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/79fdd61df8b2154ccaa479301fcc57a6.png"></a>    | Nest 应用                     | Nest + 服务端部署                              | `cloudbase init --template nest-starter`    |
| <a href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/node-starter"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/7b50431d8cef29d9ebb82c4ff2e6032c.png"></a>    | Node.js 云函数示例            | Node.js 云函数                                 | `cloudbase init --template node-starter`    |
| <a href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/php-starter"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/63782b30178cf5666fdd1e15501aba9b.png"></a>     | PHP 云函数示例                | PHP 云函数                                     | `cloudbase init --template php-starter`     |
| <a href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/java-starter"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/20510a20be999a59458204afcf0fe205.png"></a>    | Java 云函数示例               | Java 云函数                                    | `cloudbase init --template java-starter`    |
| <a href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/vuepress"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/230c115bee4300384fa557710daa2928.jpg"></a>        | VuePresss 网站应用            | VuePresss + 静态网站部署                       | `cloudbase init --template vuepress`        |
| <a href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/node"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/82da2591cd2aed610d7f91f9dd881930.png"></a>            | Node.js 云应用                | Node.js + Serverless 云应用部署                | `cloudbase init --template node`            |
| <a href="https://github.com/TencentCloudBase/cloudbase-templates/tree/master/dart"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/2d1c438165480b9a7937e3b81c4873e3.jpg"></a>            | Aqueduct (Dart Server) 云应用 | Aqueduct (Dart Server) + Serverless 云应用部署 | `cloudbase init --template dart`            |

## <a name="plugins"></a>插件

云开发 CloudBase Framework 支持插件机制，提供了多种应用框架和云资源的插件，只需要很少的配置甚至 0 配置就可以现有应用和云开发 CloudBase Framework 框架进行集成。

插件可以处理应用中的一些独立单元的构建、部署、开发、调试等流程。例如 website 插件可以处理静态网站等单元，node 插件可以处理 koa 、express 等 node 应用。插件可以组合使用。

插件的配置写在 cloudbaserc 文件中，目前仅支持 JSON 文件，后续会支持 YAML。

插件的配置可以手动填写，也可以自动生成，目前针对前端框架支持自动识别填写插件。

### 自动检测生成插件配置流程

- `cloudbase init --without-template` 生成项目配置·

- `cloudbase framework:deploy` 进行自动检测生成插件配置文件并部署

### 目前支持的插件列表

|                                                                                                                                                                                                                   | 插件                                                                         | 最新版本                                                                                                                                                  | 插件介绍                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| <a href="https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-website"><img width="200" src="https://main.qcloudimg.com/raw/abbc0f23ee92e8f4665ab316b6126d33.jpg"></a>   | [@cloudbase/framework-plugin-website](packages/framework-plugin-website)     | [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-website)](https://www.npmjs.com/package/@cloudbase/framework-plugin-website)     | 一键部署网站应用                                               |
| <a href="https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-node"><img width="200" src="https://main.qcloudimg.com/raw/80526dcba2f27ed2619ac43b9b623d5a.jpg"></a>      | [@cloudbase/framework-plugin-node](packages/framework-plugin-node)           | [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-node)](https://www.npmjs.com/package/@cloudbase/framework-plugin-node)           | 一键部署 Node 应用（支持底层部署为函数或者 Serverless 云应用） |
| <a href="https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-nuxt"><img width="200" src="https://main.qcloudimg.com/raw/6d48ab8bc29c38558cd258b28b14f94e.jpg"></a>      | [@cloudbase/framework-plugin-nuxt](packages/framework-plugin-nuxt)           | [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-nuxt)](https://www.npmjs.com/package/@cloudbase/framework-plugin-nuxt)           | 一键部署 Nuxt SSR 应用                                         |
| <a href="https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-function"><img width="200" src="https://main.qcloudimg.com/raw/2cd529a816464f59684515f73b0a5622.jpg"></a>  | [@cloudbase/framework-plugin-function](packages/framework-plugin-function)   | [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-nuxt)](https://www.npmjs.com/package/@cloudbase/framework-plugin-function)       | 一键部署函数资源                                               |
| <a href="https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-container"><img width="200" src="https://main.qcloudimg.com/raw/7e5e467a45bdfb5f5f4cc2eb27ea71bb.jpg"></a> | [@cloudbase/framework-plugin-container](packages/framework-plugin-container) | [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-container)](https://www.npmjs.com/package/@cloudbase/framework-plugin-container) | 一键部署云应用容器服务                                         |
| <a href="https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-dart"><img width="200" src="https://main.qcloudimg.com/raw/fabde81e6232f0eccf4914721ee2a55c.jpg"></a>      | [@cloudbase/framework-plugin-dart](packages/framework-plugin-dart)           | [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-dart)](https://www.npmjs.com/package/@cloudbase/framework-plugin-dart)           | 一键部署 Dart 云应用                                           |
| <a href="https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-database"><img width="200" src="https://main.qcloudimg.com/raw/41a9bd0e62c638ab40cb8b8cba26696b.jpg"></a>  | [@cloudbase/framework-plugin-database](packages/framework-plugin-database)   | [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-database)](https://www.npmjs.com/package/@cloudbase/framework-plugin-database)   | 一键声明式部署云开发 NoSQL 云数据库                            |

## <a name="conf"></a> 配置示例

例如一个 Vue 的全栈项目，包含网站前端和云函数

可以在在项目下手动创建一个 `cloudbaserc.json`，填写如下配置文件，调用 `cloudbase framework:deploy` 进行部署

或者直接运行

- `cloudbase init --without-template`

- `cloudbase framework:deploy` 进行自动检测并部署

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

## <a name="architect"></a> 整体架构

云开发 CloudBase Framework 基于云开发底层资源和云开发资源编排管理，整体包含 CLI 工具层、应用框架层和 CI/CD 层。

- CLI 层针对主流应用框架进行了适配，可以一键无缝集成，并提供开发、一键部署等功能
- 应用框架层提供了针对不同语言和框架的 SDK 和组件，同时对底层云资源进行抽象
- CI/CD 层可以实现云端部署、代码平台集成、灰度发布和升级回滚等功能

![](https://main.qcloudimg.com/raw/e7c525c09ce3197996924a2b70ac0c87.png)

## <a name="roadmap"></a>Roadmap

![](https://main.qcloudimg.com/raw/7fcf4e7822f89fc3807ccc68424e6fe5.png)

🚀 表示已经实现的功能

| 里程碑                                                                 | 状态 |
| ---------------------------------------------------------------------- | ---- |
| 框架核心功能支持插件机制，适配 Cloudbase CLI                           | 🚀   |
| 开发 Website plugin 支持部署前端静态项目                               | 🚀   |
| 自动检测前端框架 (Vue/React 等主流框架) 使用 Website plugin            | 🚀   |
| 开发 Nuxt plugin 支持 Nuxt SSR 项目                                    | 🚀   |
| 开发 Function plugin 支持自动部署函数                                  | 🚀   |
| 开发 Node Api Plugin 支持一键部署 Node 应用                            | 🚀   |
| 插件支持编译成 SAM 描述                                                | 🚀   |
| 自动检测 Express/ Koa 等主流 Node 框架使用 Node Api Plugin             |      |
| 云开发全栈框架支持                                                     |      |
| Node Api Plugin 支持建模和代码生成                                     |      |
| 结合 Github Action、Coding 等平台的 CI/CD 功能                         |      |
| 支持后端部分容器化构建，提供服务函数化构建的另一个选项                 | 🚀   |
| 开发 SAM Plugin 支持 SAM 扩展插件，框架可引入第三方 SAM 扩展（如 CMS） |      |
| 开发 Flutter Plugin 支持 Flutter 的 Dart 后端一键部署                  | 🚀   |

## <a name="contribute"></a>贡献指南

欢迎大家参与到 CloudBase Framework 的开发工作，贡献一份力量

开发贡献方式请参考 [开发贡献指南](https://github.com/TencentCloudBase/cloudbase-framework/blob/master/doc/CONTRIBUTING.md) 文档

## <a name="changelog"></a> Changelog

CloudBase Framework 的版本变更日志请参阅 [changelog](https://github.com/TencentCloudBase/cloudbase-framework/blob/master/CHANGELOG.md) 文件

## <a name="license"></a>License

开源协议文档请参阅 [Apache License 2.0](https://github.com/TencentCloudBase/cloudbase-framework/blob/master/LICENSE)

## <a name="qq"></a> 交流 QQ 群

![](https://main.qcloudimg.com/raw/52e3e5062e01cc9058689138c9e8f02f.jpg)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://bookerzhao.com"><img src="https://avatars2.githubusercontent.com/u/7686861?v=4" width="100px;" alt=""/><br /><sub><b>Booker Zhao</b></sub></a><br /><a href="#infra-binggg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=binggg" title="Tests">⚠️</a> <a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=binggg" title="Code">💻</a></td>
    <td align="center"><a href="https://twitter.com/_WeijiaWang_"><img src="https://avatars0.githubusercontent.com/u/10933333?v=4" width="100px;" alt=""/><br /><sub><b>Weijia Wang</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=starkwang" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!