# Changelog

## [0.9.0] - 2020-08-17

### Features

- 新增 Deno 插件一键部署 Deno 应用(#63) @TabSpace
- 新增 Framework run 命令 (#68) @lt5c
- 新增 Deno 应用模板(#63) @TabSpace
- 新增 Taro 应用模板(#66) @qinmudi
- 支持自动检测和部署 Pagic 应用 (Deno 静态网站生成器)
- 优化 Container 插件部署错误日志信息

## [0.8.2] - 2020-08-13

### Features

- Container 插件支持指定镜像/git 仓库地址来部署服务

## [0.8.0] - 2020-08-11

### Features

- 新增 uni-app 应用模板(#59) @qinmudi
- 支持自动检测 Nuxt SSR 应用
- Nuxt 插件支持自定义 npm 安装命令(#57) @Realybig

### Bugfixes

- 修复插件系统官方插件版本和内核版本不匹配的问题
- 修复部分情况下 env 文件解析失败的问题
- 修复 Node 插件在子目录下 package.json 路径问题

## [0.7.0] - 2020-07-28

### Features

- Website 插件支持注入自定义环境变量 (#50)
- Website 插件自定义 pakcage 安装命令(#46)
- Node 插件支持 Vercel 类型应用(#49)
- Framework 内核支持自定义应用名
- 支持自动检测 Koa 应用（#52）
- 配置文件模板变量支持从进程环境变量传入
- 新增 Omi 应用模板

### Bugfixes

- 修复 --verbose 参数输出 debug 日志失效的问题
- 修复部分 node 版本和 os 版本无法创建插件仓库的问题

## [0.6.0] - 2020-07-28

### Features

- cloudbaserc 配置文件支持模板变量
- 支持指定模式 `mode` 来选择不同的配置
- 提升插件安装和依赖安装速度
- 支持自动检测 Dockerfile 项目生成云应用配置
- 云应用插件支持注入环境变量
- 支持自动检测 Hexo、Gatsbyjs 项目

### Bugfixes

- 修复了函数插件修复默认参数不符的问题
- 修复了设置 HTTPS_PROXY 代理未生效的问题

## [0.5.0] - 2020-07-23

### Features

- Node 插件支持 Egg 框架部署

## [0.4.1] - 2020-07-22

### Bugfixes

- Node 插件优化对依赖的处理
- 修复了 Node8 下运行异常的问题
- 修复了 Website 插件 `ignore` 选项失效的问题

## [0.4.0] - 2020-07-13

### Features

- Node 插件支持异步 app（支持 Nest 应用/Next SSR 场景）
- Node 插件支持非项目根目录 Node 应用
- 新增 Nest 应用模板

### Bugfixes

- Node 插件修复不支持应用当前目录存在 index 文件的 bug

## [0.3] - 2020-06-28

### Features

- 新增 Database 插件支持声明式部署云数据库集合
- Node 插件函数模式新增 VPC、环境变量等高级配置
- Dart 应用模板新增集成云开发 Dart 服务端 SDK
- 新增 React 全栈应用示例模板（静态网站+云函数+云数据库）
- 框架插件系统支持本地构建和本地测试

## [0.3.1] - 2020-07-01

### Bugfixes

- 修复包年包月环境部署非网站资源报错的问题
- 修复数据库插件创建索引失败的问题

## [0.3] - 2020-06-28

### Features

- 新增 Database 插件支持声明式部署云数据库集合
- Node 插件函数模式新增 VPC、环境变量等高级配置
- Dart 应用模板新增集成云开发 Dart 服务端 SDK
- 新增 React 全栈应用示例模板（静态网站+云函数+云数据库）
- 框架插件系统支持本地构建和本地测试

### Docs

- 新增开发贡献指南

### Bugfixes

- 修复自动检测框架模式下修改默认参数保存异常的问题

## [0.2] - 2020-06-19

### Features

- 新增 Container 插件支持云应用部署
- Node 插件新增支持函数和云应用两种模式部署
- 新增 Dart 插件，支持部署 Flutter 后端 Dart 云应用
- 新增 Node.js 云应用模板
- 新增 Aqueduct (Dart Server) 云应用模板
- 新增 2 套 React 全栈应用模板

### Bugfixes

- 修复 Windows 命令行显示的问题
- 修复子目录初始化项目配置路径寻址的问题

## [0.1] - 2020-06-09

### Features

- 实现 Framework Core 功能
- 支持插件机制
- 支持自动检测框架和语言生成插件配置
- 新增 Webstie 插件支持静态网站部署
- 新增 Node 插件支持函数方式部署 Node 应用
- 新增 Nuxt 插件支持 Nuxt SSR 项目
- 新增 Vue 应用模板
- 新增 VuePress 应用模板
- 新增 Nuxt SPA 应用模板
- 新增 Nuxt SSR 应用模板
- 新增 Koa 应用模板
- 新增 Express 应用模板
- 新增 Node.js、PHP、Java 函数应用模板
