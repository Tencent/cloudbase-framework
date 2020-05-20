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

**CloudBase Framework** 云开发 Serverless 应用开发框架，开箱即用，方便开发和部署多端+全栈的 Serverless 应用

## Table of Contents

- [快速开始](#quick-start)
- [示例](#examples)
- [插件](#plugins)
- [插件](#roadmap)
- [License](#license)

## <a name="quick-start"></a> 快速开始

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

## <a name="examples"></a>示例

## <a name="plugins"></a>插件

| 插件                                                                     | 最新版本                                                                                                                                              | 插件介绍         |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| [@cloudbase/framework-plugin-website](packages/framework-plugin-website) | [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-website)](https://www.npmjs.com/package/@cloudbase/framework-plugin-website) | 一键部署网站应用 |

## <a name="roadmap"></a>Roadmap

| 里程碑                                                                 | 状态 |
| ---------------------------------------------------------------------- | ---- |
| 框架核心功能支持插件机制，适配 Cloudbase CLI                           | 🚀   |
| 开发 Website plugin 支持部署前端静态项目                               | 🚀   |
| 自动检测前端框架 (Vue/React 等主流框架) 使用 Website plugin            | 🚀   |
| 开发 Nuxt plugin 支持 Nuxt SSR 项目                                    |      |
| 开发 Function plugin 支持自动部署函数                                  | 🚀   |
| 开发 Node Api Plugin 支持一键部署 Node 应用                            |      |
| 自动检测 Express/ Koa 等主流 Node 框架使用 Node Api Plugin             |      |
| 腾讯内部全栈框架插件支持                                               |      |
| Node Api Plugin 支持建模和代码生成                                     |      |
| 插件支持编译成 SAM 描述                                                |      |
| 结合 Github Action、Coding 等平台的 CI/CD 功能                         |      |
| 支持后端部分 Docker 化构建，提供服务函数化构建的另一个选项             |      |
| 开发 SAM Plugin 支持 SAM 扩展插件，框架可引入第三方 SAM 扩展（如 CMS） |      |
| 开发 Flutter Plugin 支持 Flutter 的 Dart 后端一键部署                  |      |

## <a name="license"></a>License

[Apache License 2.0](./LICENSE)
