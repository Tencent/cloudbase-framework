# CloudBase App 应用

基于 CloudBase Framework 开发的项目可以打造成 CloudBase App 应用，可以基于 CloudBase CLI 命令来一键创建部署，也可以生成一键部署按钮来在云端一键部署。

一键部署按钮可以让公开的 Git 项目一键部署到云开发 CloudBase 上，大大简化用户部署的门槛，方便用户快速使用和体验应用。一键部署功能支持 Github，Gitlab，Coding，Gitee 等 Git 仓库地址。

下面是部署按钮的示例，可以尝试点击来一键部署一个 Vue 全栈项目。

[![](https://main.qcloudimg.com/raw/95b6b680ef97026ae10809dbd6516117.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=gitee&tdl_site=0&appUrl=https%3A%2F%2Fgitee.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=vue&appName=example-app)

您可以为自己的项目生成一个自定义的部署按钮，只需要填写表单来生成代码片段，然后就可以嵌入到您的 Git 仓库 README 页面、博客、文章等其他可以展示链接的地方，让用户可以快速一键部署和复制一个前后端应用。

一键部署按钮生成页面：[https://docs.cloudbase.net/framework/deploy-button.html](https://docs.cloudbase.net/framework/deploy-button.html)

## 应用模板列表

<https://github.com/TencentCloudBase/cloudbase-templates>

## 应用开发指南

CloudBase App 项目需要满足以下的应用 3 要素

1. 可使用 CloudBase Framework 开发部署： 包含配置 cloudbaserc.json，使用 cloudbaserc.json 描述所有的依赖资源（包括数据库集合和权限等信息）
2. 配置文件中通[动态变量](https://docs.cloudbase.net/cli/config.html#dong-tai-bian-liang)方式来引用自定义配置
3. 项目代码中的环境 id 等自定义信息需要从`.env`变量中获取而不是固定

参考应用案例：[基于云开发 CloudBase 搭建的在线视频会议应用](https://github.com/oe/serverless-zoom-with-webrtc/tree/master/meeting-simple)

## 应用开发文档

- 如何在云函数、云托管、网站应用中注入自定义环境变量： https://gitee.com/TencentCloudBase/cloudbase-framework/blob/gitee/doc/env-variables.md
- cloudbaserc 文件中的模板变量说明：https://gitee.com/TencentCloudBase/cloudbase-framework/blob/gitee/doc/mode.md
- cloudbaserc 文件配置文档：https://gitee.com/TencentCloudBase/cloudbase-framework/blob/gitee/doc/config.md

## 应用模板示例

例如基于 CloudBase Framework 开发的 CMS 系统

- 使用 CloudBase Framework 描述了应用的组成和依赖的资源如相关的数据库集合等
- 使用 {{env.ENV_ID}} 这种动态变量模式引用了应用依赖的动态变量信息

cloudbaserc.json 文件如下所示：

```json
{
  "version": "2.0",
  "$schema": "https://framework-1258016615.tcloudbaseapp.com/schema/latest.json",
  "envId": "{{env.ENV_ID}}",
  "framework": {
    "plugins": {
      "admin": {
        "use": "@cloudbase/framework-plugin-website",
        "inputs": {
          "outputPath": "./packages/tcb-ext-cms-admin/build",
          "cloudPath": "/tcb-cms"
        }
      },
      "init": {
        "use": "@cloudbase/framework-plugin-function",
        "inputs": {
          "functionRootPath": "./packages",
          "functions": [
            {
              "name": "tcb-ext-cms-init",
              "config": {
                "timeout": 60,
                "envVariables": {
                  "CMS_ADMIN_USER_NAME": "{{env.administratorName}}",
                  "CMS_ADMIN_PASS_WORD": "{{env.administratorPassword}}",
                  "CMS_OPERATOR_USER_NAME": "{{env.operatorName}}",
                  "CMS_OPERATOR_PASS_WORD": "{{env.operatorPassword}}",
                  "CMS_DEPLOY_PATH": "{{env.deployPath}}"
                },
                "installDependency": true
              },
              "handler": "index.main"
            }
          ]
        }
      },
      "service": {
        "use": "@cloudbase/framework-plugin-node",
        "inputs": {
          "name": "tcb-ext-cms-service",
          "entry": "app.js",
          "projectPath": "./packages/tcb-ext-cms-service",
          "path": "/tcb-ext-cms-service",
          "buildCommand": "npm run build",
          "functionOptions": {
            "timeout": 5,
            "envVariables": {
              "NODE_ENV": "production",
              "CMS_CUSTOM_LOGIN_JSON": "{{env.customLoginJson}}"
            }
          }
        }
      },
      "db": {
        "use": "@cloudbase/framework-plugin-database",
        "inputs": {
          "collections": [
            {
              "collectionName": "tcb-ext-cms-contents",
              "description": "CMS 系统内容配置数据，CMS 所有的系统内容类型配置、字段配置等信息都存储在该集合内（请不要手动修改",
              "aclTag": "ADMINONLY"
            },
            {
              "collectionName": "tcb-ext-cms-users",
              "description": " CMS 系统用户数据，存储 CMS 的用户信息，包括管理员和运营者的账号信息，包括角色信息，用户，加密存储的密码等（请不要手动修改）",
              "aclTag": "ADMINONLY"
            },
            {
              "collectionName": "tcb-ext-cms-webhooks",
              "description": "CMS 系统 webhook 集合，存储 CMS 系统的回调接口配置，CMS 系统数据的变更可以通过回调来进行同步 （请不要手动修改）",
              "aclTag": "ADMINONLY"
            }
          ]
        }
      }
    }
  }
}
```
