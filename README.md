![](assets/cloudbase-framework.png)

[![Github License](https://img.shields.io/github/license/TencentCloudBase/cloudbase-framework)](LICENSE)
[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework)](https://www.npmjs.com/package/@cloudbase/cli)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![download](https://img.shields.io/npm/dw/@cloudbase/cli)](https://www.npmjs.com/package/@cloudbase/cli)
[![issue](https://img.shields.io/github/issues/TencentCloudBase/cloudbase-framework)](https://github.com/TencentCloudBase/cloudbase-framework/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/TencentCloudBase/cloudbase-framework/pulls)
[![star](https://img.shields.io/github/stars/TencentCloudBase/cloudbase-framework?style=social)](https://github.com/TencentCloudBase/cloudbase-framework)

[官网](http://cloudbase.net) / [文档](https://docs.cloudbase.net/) / [社区](https://cloudbase.net/community.html)

<img align="right" width="350" src="./assets/quickstart.png" />

**云开发 CloudBase Framework** ： 打造云端一体化小程序、Web应用、移动应用的更快方法

基于云开发 CloudBase Framework 可以方便和应用进行无缝配合，快速接入，为应用引入弹性伸缩、高可用的云服务支持。

云开发 CloudBase Framework 整体包含 CLI 工具层、应用框架层和 CI/CD层

- CLI 层针对主流应用框架进行了适配，可以一键无缝集成，并提供开发、一键部署等功能
- 应用框架层提供了针对不同语言和框架的 SDK 和组件，同时对底层云资源进行抽象
- CI/CD 层可以实现云端部署、代码平台集成、灰度发布和升级回滚等功能

云开发 CloudBase Framework 底层基于腾讯云开发平台（Tencent CloudBase，TCB）提供的高可用、自动弹性扩缩的后端云服务，包含 Serverless 化的计算、存储、CDN、数据库、托管等基础能力和云调用等扩展能力，高效安全，节约成本。

云开发 CloudBase Framework 支持多种应用框架和云资源的插件，只需要很少的配置甚至 0 配置就可以现有应用和云开发 CloudBase Framework 框架进行集成。



**云开发 CloudBase Framework 部分官方插件**


| ![1](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfgd8pz72zj318g0p0npd.jpg) | ![2](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfgd8wamuqj318g0p0npd.jpg) |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| ![3](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfgd956tlqj318g0p0npd.jpg) | ![4](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfgd99vym4j318g0p0npd.jpg) |



## Table of Contents

- [快速开始](#quick-start)
- [示例](#examples)
- [插件](#plugins)
- [插件](#roadmap)
- [License](#license)

## <a name="quick-start"></a> 快速开始


![image-20200604170816588](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfgdcbtk4nj30mu0ilwg0.jpg)



1. **安装 CLI**

```bash
npm install -g @cloudbase/cli
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

## <a name="examples"></a>应用模板示例

| 名称               | 应用示例介绍                         |
| ------------------ | ------------------------------------ |
| Vue 应用           | Vue + 云函数 + 静态网站部署          |
| React 应用         | React + 云函数 + 静态网站部署        |
| Nuxt SPA 应用      | Nuxt SPA + 云函数 + 静态网站部署     |
| Nuxt SSR 应用      | Nuxt SSR + 服务端部署 + 静态网站部署 |
| Next SPA 应用      | Nuxt SPA + 云函数 + 静态网站部署     |
| Next SSR 应用      | Next SSR + 服务端部署 + 静态网站部署 |
| Node.js 云函数示例 | Node.js 云函数                       |
| PHP 云函数示例     | PHP 云函数                           |

## <a name="plugins"></a>插件

| 插件                                                                     | 最新版本                                                                                                                                              | 插件介绍         |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| [@cloudbase/framework-plugin-website](packages/framework-plugin-website) | [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-website)](https://www.npmjs.com/package/@cloudbase/framework-plugin-website) | 一键部署网站应用 |
| [@cloudbase/framework-plugin-node](packages/framework-plugin-website) | [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-node)](https://www.npmjs.com/package/@cloudbase/framework-plugin-node) | 一键部署 Node 应用 |
| [@cloudbase/framework-plugin-nuxt](packages/framework-plugin-website) | [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-nuxt)](https://www.npmjs.com/package/@cloudbase/framework-plugin-nuxt) | 一键部署 Nuxt SSR 应用 |
| [@cloudbase/framework-plugin-function](packages/framework-plugin-website) | [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-function)](https://www.npmjs.com/package/@cloudbase/framework-plugin-function) | 一键部署函数资源 |

## <a name="example"> 配置示例

例如 Vue 全栈项目配置如下

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
          "outputPath": "cloudfunctions",
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

## <a name="architect"> 整体架构

![image-20200604153201359](https://tva1.sinaimg.cn/large/007S8ZIlgy1gfgakae0n8j30ym0o60uv.jpg)

## <a name="roadmap"></a>Roadmap

| 里程碑                                                                 | 状态 |
| ---------------------------------------------------------------------- | ---- |
| 框架核心功能支持插件机制，适配 Cloudbase CLI                           | 🚀   |
| 开发 Website plugin 支持部署前端静态项目                               | 🚀   |
| 自动检测前端框架 (Vue/React 等主流框架) 使用 Website plugin            | 🚀   |
| 开发 Nuxt plugin 支持 Nuxt SSR 项目                                    | 🚀 |
| 开发 Function plugin 支持自动部署函数                                  | 🚀   |
| 开发 Node Api Plugin 支持一键部署 Node 应用                            | 🚀 |
| 插件支持编译成 SAM 描述                                                | 🚀 |
| 自动检测 Express/ Koa 等主流 Node 框架使用 Node Api Plugin             |      |
| 云开发全栈框架支持                               |      |
| Node Api Plugin 支持建模和代码生成                                     |      |
| 结合 Github Action、Coding 等平台的 CI/CD 功能                         |      |
| 支持后端部分 Docker 化构建，提供服务函数化构建的另一个选项             |      |
| 开发 SAM Plugin 支持 SAM 扩展插件，框架可引入第三方 SAM 扩展（如 CMS） |      |
| 开发 Flutter Plugin 支持 Flutter 的 Dart 后端一键部署                  |      |

## <a name="license"></a>License

[Apache License 2.0](./LICENSE)