# Changelog

## [1.5.6] - 2021-01-08

### Features

- 新增 支持多地域部署
- 新增 支持 Serverless DB (MySQL)
- 新增 配置文件语法校验功能
- 新增 本地构建日志和构建状态上报
- 新增 云端构建缓存功能，提升云端构建速度
- 新增 ThinkJS、Daruk 应用模板
- 优化 本地开发部署云端应用体验

### Bugfixes

- 修复 Next 插件配置不存在部署失败问题(#140) @fanyegong
- 修复 云函数插件不支持定时触发器、VPC 设置等问题
- 修复 云数据库插件 AclRule 配置问题

## [1.4.0] - 2020-11-25

### Features

- 新增 新的云端应用形态
- 新增 10 个开源应用上架应用中心
- 新增 requirement 配置描述外部资源依赖和环境变量
- 新增 CFS/cynosdb 等 Addon 功能创建外部存储资源
- 新增 构建时/运行时的全局环境变量
- 新增 本地二次部署云端项目
- 新增 aqueduct 自动检测
- 容器插件支持低成本/高可用模式
- 容器插件支持 customLogs、initialDelaySeconds、versionRemark 配置
- 容器插件支持挂载 CFS 持久化存储来共享存储
- 容器插件支持继承云端规格配置
- 云函数插件支持配置代码保护密钥
- 云函数插件/容器插件支持自动创建新版本
- 小程序插件支持通过 base64 字符串传入私钥
- 优化规范底层 SAM 描述规范

### Bugfixes

- 修复静态托管插件部分情况部署失败的问题
- 修复云函数插件部署 Java 云函数失败的问题
- 修复 Node 插件返回 binary 的问题

## [1.3.1] - 2020-10-21

### Features

- 新增登录插件，支持一键配置登录配置 @lt5c
- Function 插件新增支持配置安全规则 @lt5c
- Website 插件底层优化 @binggg
- 优化应用入口信息展示

### Bugfixes

- 修复 website 插件边界问题报错 #98

## [1.2.10] - 2020-09-25

### Features

- 新增小程序插件，可以一键预览/上传小程序应用 @lt5c
- Website 插件配置优化 @lt5c
- Framework run 命令优化，支持 cloudbase framework run 来执行开发等自定义命令 @lt5c
- 新增 Hooks 功能支持应用部署前后执行自定义命令和调用函数
- Nuxt 插件支持内存、超时时间、环境变量配置 (#90) @liulinboyi
- Deno 插件集成构建功能(#87) @TabSpace

## [1.1.10] - 2020-09-16

### Features

- Function 插件支持 Go 语言
- Function 插件底层部署使用 SAM 优化
- Function 插件和 Container 插件支持创建新版本和版本描述
- 新增 Go 函数模板

### Bugfixes

- 修复函数部署偶现失败的问题
- 修复 Node 8.9 兼容问题

## [1.0.0] - 2020-08-25

### Features

- 新增 智能部署命令 @henghenchhptg
- 新增 基于 JSON Schema 的配置语法智能提示
- 新增 Next 插件 (#70) @fanyegong
- 新增 Next SSR 应用模板 (#70) @fanyegong
- 支持 App Entrypoint
- Deno 插件应用进程改为默认使用 denon 来管理 (#69) @TabSpace
- Container 插件调整云托管最大副本数

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
- 支持自动检测 Dockerfile 项目生成云托管配置
- 云托管插件支持注入环境变量
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

- 新增 Container 插件支持云托管部署
- Node 插件新增支持函数和云托管两种模式部署
- 新增 Dart 插件，支持部署 Flutter 后端 Dart 云托管
- 新增 Node.js 云托管模板
- 新增 Aqueduct (Dart Server) 云托管模板
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
