# 模板

## 模板介绍

模板是 cloudbase framework 为开发者提供的一个可以开箱即用的种子工程，你可以通过一个命令选择你要创建的工程类型，就可以直接进行开发了。

## 使用模板快速创建应用

你可以通过`cloudbase init --template <template_name>` or `cloudbase init`都可以一键生成你想要创建的种子项目。

```bash
cloudbase init --template vue
✔ 选择关联环境 · static - [static-xxxxx:按量计费]
✔ 请输入项目名称 · vue
✔ 初始化项目vue成功！

ℹ 👉 执行命令 cd vue 进入项目文件夹
ℹ 👉 开发完成后，执行命令 cloudbase framework deploy 一键部署
```

or

```bash
cloudbase init
✔ 选择关联环境 · static - [static-xxxxx:按量计费]
? 选择云开发模板 …
❯ Vue 应用
  React 应用
  React 自定义配置应用
  ……
```

## 已支持的模板

| 项目链接                                                                                                                                                                                                              | 名称                          | 应用示例介绍                            | 基于模板创建项目                                                                                                                                                                                                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <a href="https://gitee.com/TencentCloudBase/cloudbase-templates/tree/gitee/vue"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/9892a3212a49bdd65ba499f2da62ac23.png"></a>             | Vue 应用                      | Vue + 云函数 + 静态网站部署             | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=gitee&tdl_site=0&appUrl=https%3A%2F%2Fgitee.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=vue&appName=vue)                         |
| <a href="https://gitee.com/TencentCloudBase/cloudbase-templates/tree/gitee/react-starter"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/d94d993269048beb4827b2612ed53692.png"></a>   | React 应用                    | React + 云函数 + 静态网站部署           | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=gitee&tdl_site=0&appUrl=https%3A%2F%2Fgitee.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=react-starter&appName=react-starter)     |
| <a href="https://gitee.com/TencentCloudBase/cloudbase-templates/tree/gitee/react-demo"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/d94d993269048beb4827b2612ed53692.png"></a>      | React 全栈应用                | React + 云函数 + 静态网站部署+ 云数据库 | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=gitee&tdl_site=0&appUrl=https%3A%2F%2Fgitee.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=react-demo&appName=react-demo)           |
| <a href="https://gitee.com/TencentCloudBase/cloudbase-templates/tree/gitee/nuxt-spa"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/4a2bb546f6d59133976dccd1ac962378.png"></a>        | Nuxt SPA 应用                 | Nuxt SPA + 云函数 + 静态网站部署        | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=gitee&tdl_site=0&appUrl=https%3A%2F%2Fgitee.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=nuxt-spa&appName=nuxt-spa)               |
| <a href="https://gitee.com/TencentCloudBase/cloudbase-templates/tree/gitee/nuxt-ssr"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/338ce75aaf22e407a02d8b5f096212d0.png"></a>        | Nuxt SSR 应用                 | Nuxt SSR + 服务端部署 + 静态网站部署    | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=gitee&tdl_site=0&appUrl=https%3A%2F%2Fgitee.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=nuxt-ssr&appName=nuxt-ssr)               |
| <a href="https://gitee.com/TencentCloudBase/cloudbase-templates/tree/gitee/koa-starter"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/bc7e3f2989fcf65b2fe8ad37ea3f69a9.png"></a>     | Koa 应用                      | Koa + 服务端部署                        | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=gitee&tdl_site=0&appUrl=https%3A%2F%2Fgitee.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=koa-starter&appName=koa-starter)         |
| <a href="https://gitee.com/TencentCloudBase/cloudbase-templates/tree/gitee/express-starter"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/ce7fa0617399ac5e7f7bdbef5efb29d9.png"></a> | Express 应用                  | Express + 服务端部署                    | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=gitee&tdl_site=0&appUrl=https%3A%2F%2Fgitee.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=express-starter&appName=express-starter) |
| <a href="https://gitee.com/TencentCloudBase/cloudbase-templates/tree/gitee/nest-starter"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/79fdd61df8b2154ccaa479301fcc57a6.png"></a>    | Nest 应用                     | Nest + 服务端部署                       | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=gitee&tdl_site=0&appUrl=https%3A%2F%2Fgitee.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=nest-starter&appName=nest-starter)       |
| <a href="https://gitee.com/TencentCloudBase/cloudbase-templates/tree/gitee/egg-starter"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/9b26c345d8180b1003954d5a7b28f41f.png"></a>     | Egg 应用                      | Egg + 服务端部署                        | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=gitee&tdl_site=0&appUrl=https%3A%2F%2Fgitee.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=egg-starter&appName=egg-starter)         |
| <a href="https://gitee.com/TencentCloudBase/cloudbase-templates/tree/gitee/node-starter"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/7b50431d8cef29d9ebb82c4ff2e6032c.png"></a>    | Node.js 云函数示例            | Node.js 云函数                          | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=gitee&tdl_site=0&appUrl=https%3A%2F%2Fgitee.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=node-starter&appName=node-starter)       |
| <a href="https://gitee.com/TencentCloudBase/cloudbase-templates/tree/gitee/php-starter"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/63782b30178cf5666fdd1e15501aba9b.png"></a>     | PHP 云函数示例                | PHP 云函数                              | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=gitee&tdl_site=0&appUrl=https%3A%2F%2Fgitee.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=php-starter&appName=php-starter)         |
| <a href="https://gitee.com/TencentCloudBase/cloudbase-templates/tree/gitee/java-starter"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/20510a20be999a59458204afcf0fe205.png"></a>    | Java 云函数示例               | Java 云函数                             | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=gitee&tdl_site=0&appUrl=https%3A%2F%2Fgitee.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=java-starter&appName=java-starter)       |
| <a href="https://gitee.com/TencentCloudBase/cloudbase-templates/tree/gitee/vuepress"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/230c115bee4300384fa557710daa2928.jpg"></a>        | VuePress 网站应用             | VuePress + 静态网站部署                 | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=gitee&tdl_site=0&appUrl=https%3A%2F%2Fgitee.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=vuepress&appName=vuepress)               |
| <a href="https://gitee.com/TencentCloudBase/cloudbase-templates/tree/gitee/node"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/82da2591cd2aed610d7f91f9dd881930.png"></a>            | Node.js 云托管                | Node.js + 云托管部署                    | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=gitee&tdl_site=0&appUrl=https%3A%2F%2Fgitee.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=node&appName=node)                       |
| <a href="https://gitee.com/TencentCloudBase/cloudbase-templates/tree/gitee/dart"><img width="200" style="max-width:none;" src="https://main.qcloudimg.com/raw/2d1c438165480b9a7937e3b81c4873e3.jpg"></a>            | Aqueduct (Dart Server) 云托管 | Aqueduct (Dart Server) + 云托管部署     | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=gitee&tdl_site=0&appUrl=https%3A%2F%2Fgitee.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=dart&appName=dart)                       |

## 模板开发指南

1. 首先 fork 一下[CloudBase Templates](https://github.com/TencentCloudBase/cloudbase-templates)这个工程。

2. 比如创建一个 koa 的模板，可以使用 koa init 初始化一个工程

3. 然后把你的基础建设相关的东西搭建完成

4. 你的工程里面创建一个 cloudbaserc.json，把你的开发、构建、部署的工作流配置完成

- 修改配置文件环境 id 为 "{{envId}}"
- 按照官方示例 README 格式修改 README 格式，可以参考 https://github.com/TencentCloudBase/cloudbase-templates/blob/master/express-starter/README.md
- 在页面上加入 Github 地址 以及部署工具信息 https://framework.service.tcloudbase.com/express-starter/

5. 提交 PR 合并到官网模板仓库后

6. 就可以通过 cloudbase init --template <your_template_name>创建属于你的种子工程了。

cloudbaserc.json 的更多帮助可以点击[前往](https://gitee.com/TencentCloudBase/cloudbase-framework/blob/gitee/doc/config.md)
