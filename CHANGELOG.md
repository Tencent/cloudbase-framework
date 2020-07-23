# Changelog

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
