---
title: 云开发推出「前后端一体化部署工具」CloudBase Framework
description: '开发者福利～现在可以通过一体化的方式来开发和部署应用到云开发了，无须修改业务代码，将应用前后端一键托管部署在云开发平台，享受加速访问和弹性免运维'
# github 用户名
authorIds:
  - binggg
href: https://zhuanlan.zhihu.com/p/159302477
platforms:
  - Web
  - 小程序
  - 移动端
tags:
  - 云函数
  - 数据库
  - ClouBase Framework
  - 静态网站托管
  - 云托管
---

# 云开发推出「前后端一体化部署工具」CloudBase Framework

## 背景和介绍

云开发（CloudBase）是云端一体化的云服务平台，采用 serverless 架构，开发者无须关心服务器搭建和管理，只需要编写业务代码和调用原生提供的云能力，就可以快速搭建完整的小程序/小游戏、H5、Web、移动 App 等应用。云开发是国内 Serverless 理念的领先实践，服务了超过 50 万开发者。

在开发者使用云开发的过程中，我们收集到如下场景的反馈和需求：

1. 存量业务如网站、后端服务希望能托管在云开发平台，但存在不小的**改造成本**
2. 无法**覆盖各种开发语言、框架和现有的应用交付方式**
3. 应用中存在**前后端使用多种云开发资源**时，希望能**降低发布成本，同时实现持续交付**
4. 应用中添加其他云能力需要**手动在控制台配置**

基于以上的场景，我们希望设计一个工具来解决上述问题，希望具备以下的特性：

1. **支持应用的无缝托管**：用户不需要改变开发习惯，不需要修改代码适配云函数等云资源，而是可以直接将应用托管在云开发平台上
2. **引入支持自定义的底层资源层**：引入容器化的部署方案来承载各种开发语言、框架和现有的应用交付方式
3. **支持声明式描述云资源**：将应用内各个部分最终都能描述成统一的描述语言，支持前后端的统一部署
4. **使用简单**：使用者无须关心底层资源和底层声明文件等细节，只需要有限的业务参数，即可将应用一键托管到云开发平台

核心的思想就是希望让开发者使用**一体化的方式来开发和部署应用**

![](https://main.qcloudimg.com/raw/bfbcf950e2b8f42b4c5ba31fa09361e4.png)

[CloudBase Framework](https://github.com/Tencent/cloudbase-framework) 是云开发基于上述一体化的思想开发的**前后端一体化部署工具**，开发者无需改动业务代码，支持前后端一键托管部署在云开发平台，享受加速访问和弹性免运维的优势，具有以下特点：

**1. 云开发出品**

由云开发推出，核心代码已在 Github 开源

[https://github.com/Tencent/cloudbase-framework](https://github.com/Tencent/cloudbase-framework)

（欢迎给我们的项目点个 Star，支持我们做得更好～）

![](https://main.qcloudimg.com/raw/7aa4647df44a6d57ba9158e185617d1c.png)

**2. 云原生，一体化**

前后端一体化部署在 Serverless 架构的云环境上，弹性可扩展

**3. 降低成本**

资源按使用自动弹性扩缩容，按照使用计费，极大节约资源成本

**4. 高效快速**

简单易用，并内置大量强大后端能力，只需要开发业务逻辑即可

## 亮点 1: 一键部署

[CloudBase Framework](https://github.com/Tencent/cloudbase-framework) 的第一个核心亮点是可以实现一键部署，常见的应用，不需要改动业务代码，即可“零配置”部署到云开发上。

![](https://main.qcloudimg.com/raw/0168e6f661ed8c3072434c70e5594418.png)

例如，图中所示的基于 Vue CLI 工具创建的项目，在执行 [CloudBase Framework](https://github.com/Tencent/cloudbase-framework) 的部署命令时，会自动检测项目框架和语言，交互式确认并保存项目配置，实现应用的一键发布。一条命令实现了应用部署，自动配置 COS 对象存储和 DNS、域名等，自带 HTTPS 安全访问、CDN 访问加速等能力。

### 支持常见框架和语言

![](https://main.qcloudimg.com/raw/ba3478f95ded79dea875ff14cdb51b2e.png)

[CloudBase Framework](https://github.com/Tencent/cloudbase-framework) 目前支持了 Vue、React 等前端框架，也支持 Nuxt 等 SSR 框架，基于 Node 开发的应用如 Express、Koa 等也可以一键托管。除此之外，借助底层 云托管的能力，也可以部署其他后端的应用（PHP、Java、Go 等），值得一提的是可以部署 Dart Server，可以配合 Flutter 实现 Dart 语言的云端一体化，这也是国内云厂商对 Dart 语言和生态的一大补充。

### 自动检测框架

在降低用户使用门槛方面，我们实现了自动检测的功能，针对常见前端框架无需编写配置，可以实现自动识别项目的构建和发布默认配置

### 无需复杂适配

不需要学习复杂的服务器配置和更改代码，只需要输入业务参数即可部署

### 可配合 CI/CD

可以与您的现有工作流完美配合，可搭配 CI/ CD 工具实现持续部署，例如只需要几行代码就可以实现 Github 自动推送时自动部署应用前后端，同时也可以在 CI/CD 过程中增加手动确认步骤来 Review 发布过程。

```
    - name: Deploy to CloudBase
      run: |
        npm i @cloudbase/cli
        cloudbase login --apiKeyId ${{secrets.SECRETID}}  --apiKey ${{secrets.SECRETKEY}}
        cloudbase framework deploy
```

## 亮点 2: 一体化，易扩展

**平台一体化**

云开发（CloudBase）是云端一体化的云服务平台，采用 serverless 架构，开发者无须关心服务器搭建和管理，原生提供了很多开箱即用的云能力

**项目一体化**

使用 [CloudBase Framework](https://github.com/Tencent/cloudbase-framework) 开发的项目前端、后端等都可以在同一个项目内开发和维护，这一点和小程序开发非常类似，可以在 IDE 内通过一体化的方式开发和发布。

![](https://main.qcloudimg.com/raw/3e2dab0401d5e95773a48b06fd133d57.png)

### 前后端一体化部署

如上面的例子所示，一个具备前端代码、云函数和服务端代码的一体化应用，只需要调用 [CloudBase Framework](https://github.com/Tencent/cloudbase-framework) 的一条命令，即可将完整应用部署在云端，统一管理和维护。

### 开箱即用的原生云能力

云开发一体化平台提供了开箱即用的原生的云能力，无需学习底层资源配置，无需运维和管理。

例如，在云开发平台上，我们需要部署静态网站，无须关心对象存储和 CDN 的管理；需要部署 HTTP 服务，无须关心网关层和计算资源的配置；需要使用云数据库时，我们也不用担心数据库实例的容灾。

### 轻松添加更多后端能力

可轻松引入更多开箱即用的后端能力

- **登录鉴权**：通过 SDK 实现登录鉴权
- **云数据库**：内置的 NoSQL 数据库，可通过声明式的方式来创建集合和索引
- **云接入**：引入 HTTP 访问的支持
- **云调用**：几行代码实现微信开放能力的调用
- **云函数**：轻量级的计算能力
- **云存储**：实现文件的存储和下载
- **云托管**：极简方式使用 Kubenetes 容器
- **扩展能力**：可以免开发安装 CMS 内容管理系统等扩展能力

## 快速开始

1. **安装 CloudBase CLI**

首先需要安装 CloudBase 最新版命令行工具

```bash
npm install -g @cloudbase/cli@latest
```

2. **登录命令行工具**

然后调用命令行进行登录，会跳转到腾讯云控制台进行账号的授权，如果没有账号，可以在控制台进行开通

```bash
cloudbase login
```

3. **初始化一个应用**

通过 CloudBase 命令行工具我们可以非常方便地创建一个应用，如果在现有应用中使用，可以执行 `cloudbase` 命令来进行智能检测和初始化

如果需要创建一个新的应用

```bash
cloudbase init
```

通过交互式地创建环境和选择模板来初始化应用

![](https://main.qcloudimg.com/raw/6829fcbd51fcbea49c3616531a528d70.png)

也可以直接指定模板 id 创建对应的项目，例如

```bash
cloudbase init --template nuxt-ssr
```

目前支持的一体化应用模板如下：

| 名称                          | 应用示例介绍                            | 模板 id           |
| ----------------------------- | --------------------------------------- | ----------------- |
| Vue 应用                      | Vue + 云函数 + 静态网站部署             | `vue`             |
| React 应用                    | React + 云函数 + 静态网站部署           | `react-starter`   |
| React 全栈应用                | React + 云函数 + 静态网站部署+ 云数据库 | `react-demo`      |
| Nuxt SPA 应用                 | Nuxt SPA + 云函数 + 静态网站部署        | `nuxt-spa`        |
| Nuxt SSR 应用                 | Nuxt SSR + 服务端部署 + 静态网站部署    | `nuxt-ssr`        |
| Koa 应用                      | Koa + 服务端部署                        | `koa-starter`     |
| Express 应用                  | Express + 服务端部署                    | `express-starter` |
| Nest 应用                     | Nest + 服务端部署                       | `nest-starter`    |
| Node.js 云函数示例            | Node.js 云函数                          | `node-starter`    |
| PHP 云函数示例                | PHP 云函数                              | `php-starter`     |
| Java 云函数示例               | Java 云函数                             | `java-starter`    |
| VuePresss 网站应用            | VuePresss + 静态网站部署                | `vuepress`        |
| Node.js 云托管                | Node.js + 云托管部署                    | `node`            |
| Aqueduct (Dart Server) 云托管 | Aqueduct (Dart Server) + 云托管部署     | `dart`            |

4. **部署应用**

接下来，只需要进入到项目目录中调用命令进行部署

```bash
cloudbase framework deploy
```

![](https://main.qcloudimg.com/raw/ae4a181e01c1f3278dc48940a5839551.png)

部署成功后，就可以通过命令行提示的地址进行访问了:

[https://framework.service.tcloudbase.com/express-starter/](https://framework.service.tcloudbase.com/express-starter/)

## CloudBase Framework 降本增效

[CloudBase Framework](https://github.com/Tencent/cloudbase-framework) 通过提供一体化的开发和部署功能，将应用轻松迁移到一体化的云开发平台上来。企业和个人开发者可以借助这套方案，提升业务效率，节省业务成本。

### 开发更快

- 集成云开发多端 SDK
- 开箱即用的后端能力

![](https://main.qcloudimg.com/raw/b89c003d6813e5fc81f960d609deb686.png)

### 部署更快

- 一键部署，声明式创建云资源
- 自动、快速弹性扩缩容
  ![](https://main.qcloudimg.com/raw/d22e8fb2a003e98f2b49680da11eda1a.png)

### 访问更快

- 更多节点覆盖
- 高性能，高可用

在 50 万开发者，每日调用量 7 亿的规模下，可用性保障可以做到 99.90%

![](https://main.qcloudimg.com/raw/abd117d9dcfe72f277eefa2dca2e1dde.png)

### 省心更省钱

云开发平台具备了免运维，全托管，按量付费的特点，通过 CloudBase 部署应用的成本相比传统方式部署应用的成本，节省了运维成本、闲置租用成本以及多角色沟通的成本。

![](https://main.qcloudimg.com/raw/b8bfe8d86dd32735bb135a3cbf7fc881.png)

例如微信读书团队借助“小程序·云开发”带来了很大的效能提升，微信读书小程序上线 10 个月累计发布 349 次版本，开发效率分别是对应的 APP 和 H5 的 4 倍与 2 倍。

云开发还让其团队的分工和成员能力发生了显著变化。以前其团队按照前端开发、Node.js 开发和运维人员进行分工，现在前端负责全栈开发。

## 生态和插件

[CloudBase Framework](https://github.com/Tencent/cloudbase-framework) 具有**开放性**的特点，通**过微内核、插件化**的方式来设计这套方案。内核层面解决插件化、构建生命周期等问题，针对具体的场景则通过插件的方式来实现。

例如，针对不同技术栈的网站的托管，设计了 website 插件来处理这一类问题，可以解决前端页面构建、静态资源的部署以及域名的处理。

开发者也可以根据插件的规范来开发不同的插件发布到 NPM 上，使用时只需要指定其 npm 包名即可。

目前 [CloudBase Framework](https://github.com/Tencent/cloudbase-framework) 官方提供的插件有：

| 插件                                                                         | 最新版本                                                                                                                                                  | 插件介绍                                            |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| [@cloudbase/framework-plugin-website](packages/framework-plugin-website)     | [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-website)](https://www.npmjs.com/package/@cloudbase/framework-plugin-website)     | 一键部署网站应用                                    |
| [@cloudbase/framework-plugin-node](packages/framework-plugin-node)           | [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-node)](https://www.npmjs.com/package/@cloudbase/framework-plugin-node)           | 一键部署 Node 应用（支持底层部署为函数或者 云托管） |
| [@cloudbase/framework-plugin-nuxt](packages/framework-plugin-nuxt)           | [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-nuxt)](https://www.npmjs.com/package/@cloudbase/framework-plugin-nuxt)           | 一键部署 Nuxt SSR 应用                              |
| [@cloudbase/framework-plugin-function](packages/framework-plugin-function)   | [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-nuxt)](https://www.npmjs.com/package/@cloudbase/framework-plugin-function)       | 一键部署函数资源                                    |
| [@cloudbase/framework-plugin-container](packages/framework-plugin-container) | [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-container)](https://www.npmjs.com/package/@cloudbase/framework-plugin-container) | 一键部署云托管容器服务                              |
| [@cloudbase/framework-plugin-dart](packages/framework-plugin-dart)           | [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-dart)](https://www.npmjs.com/package/@cloudbase/framework-plugin-dart)           | 一键部署 Dart 云托管                                |
| [@cloudbase/framework-plugin-database](packages/framework-plugin-database)   | [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-database)](https://www.npmjs.com/package/@cloudbase/framework-plugin-database)   | 一键声明式部署云开发 NoSQL 云数据库                 |

## 愿景

[CloudBase Framework](https://github.com/Tencent/cloudbase-framework) 致力于打造一体化框架，目前已实现了一体化的部署工具，未来会引入一体化运行时库和一体化 CI/CD 工作流，帮助业务更快更简单地将业务部署在面向未来的云开发平台上，提高效率，节省成本。

1. **一体化思想**
2. **一体化平台**
3. **一体化部署工具**
4. **一体化运行时库**：通过运行时框架简化开发流程，以更少的代码实现强大的功能
5. **一体化 CI/CD 工作流**：结合代码仓库推送，实现内置的自动化云端构建和部署

![](https://main.qcloudimg.com/raw/7fcf4e7822f89fc3807ccc68424e6fe5.png)

## 开源贡献

我们非常欢迎各位开发者为 CloudBase Framework 贡献一份力量，让这个项目能够更好地帮助开发者提升效率。

Github 地址：[https://github.com/Tencent/cloudbase-framework](https://github.com/Tencent/cloudbase-framework)

### 参与贡献

- 积极参与 Issue 的讨论，如答疑解惑、提供想法或报告无法解决的错误
- 撰写和改进项目的文档
- 提交补丁优化代码
- 认领待办任务中的事项

## 在线交流

欢迎大家加入我们的 QQ 群来交流。

QQ 交流群

![](https://main.qcloudimg.com/raw/8888a1adbd1bace5691b1802b5033fff.jpeg)
