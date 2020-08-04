# CloudBase App 项目模板

基于 CloudBase Framework 开发的项目可以打造成 CloudBase App 项目模板，可以基于 CloudBase CLI 命令来一键创建和部署

```bash
# GitHub owner/name
cloudbase init --app-template TencentCloudBase/cloudbase-extension-cms

# 或者完整 git 地址
cloudbase init --app-template https://github.com/TencentCloudBase/cloudbase-extension-cms
```

CloudBase App 项目模板需要满足以下的应用模板 3 要素

## 应用模板 3 要素

1. 可使用 CloudBase Framework 开发部署： 包含配置 cloudbaserc.json，使用 cloudbaserc.json 描述所有的依赖资源（包括数据库集合和权限等信息）
2. 配置文件中通[动态变量](https://docs.cloudbase.net/cli/config.html#dong-tai-bian-liang)方式来引用自定义配置
3. 项目下根目录下存在 `cloudbase-app.json` 描述项目，例如依赖的动态变量信息

## 应用模板示例

例如基于 CloudBase Framework 开发的 CMS 系统

- 使用 CloudBase Framework 描述了应用的组成和依赖的资源如相关的数据库集合等
- 使用 {{env.endId}} 这种动态变量模式引用了应用依赖的动态变量信息

cloudbaserc.json 文件如下所示：

```json
{
  "version": "2.0",
  "envId": "{{env.envId}}",
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

cloudbase-app.json 如下所示
