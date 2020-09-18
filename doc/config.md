# 配置

CloudBase Framework 部署需要创建一个 cloudbaserc.json，填写如下配置文件，调用 `cloudbase framework:deploy` 进行部署

```json
{
  "envId": "{{envId}}",
  "framework": {
    "name": "nuxt-ssr",
    "plugins": {
      "client": {
        "use": "@cloudbase/framework-plugin-nuxt",
        "inputs": {
          "entry": "./",
          "path": "/nuxt-ssr",
          "name": "nuxt-ssr",
          "buildCommand": "npm run build"
        }
      },
      "server": {
        "use": "@cloudbase/framework-plugin-function",
        "inputs": {
          "functionRootPath": "cloudfunctions",
          "functions": [
            {
              "name": "nuxt-ssr-echo",
              "timeout": 5,
              "envVariables": {},
              "runtime": "Nodejs10.15",
            }
          ],
          "servicePaths": {
            "nuxt-ssr-echo": "/nuxt-ssr-echo"
          }
        }
      }
    }
  }
}
```

## 字段说明

### `envId`

类型: String

envId 代表环境 ID，是环境的唯一标识。

### `framework`

类型: Object

framework 基础配置。

### `framework.name`

类型: Object

应用唯一标识，一个账号下最好不要有重名的 name。

### `framework.plugins`

类型: Object

framework 使用的插件配置，你可以配置多个插件，插件可以帮你完成 CI、CD 的相关流程。

### `framework.plugins.<deploy_name>`

类型：Object

插件别名，使用`cloudbase framework:deploy <deploy_name>`可以完成插件这个工作流

### `framework.plugins.<deploy_name>.use`

类型：String

使用的插件名称，目前支持的插件列表如下所示：

- framework-plugin-website [web 工程插件]

- framework-plugin-nuxt [nuxt 工程插件]

- framework-plugin-node [node 工程插件]

- framework-plugin-function [云函数工程插件]

- framework-plugin-database [NoSQL 工程插件]

- framework-plugin-dart [dart 工程插件]

- framework-plugin-container [容器工程插件]

### `framework.plugins.<deploy_name>.inputs`

类型：Object

插件入参配置，不同的插件，支持的入参不同，可以点击下面列表前往对应的插件地址查看具体的入参属性：

- [@cloudbase/framework-plugin-website](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-website)

- [@cloudbase/framework-plugin-nuxt](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-nuxt)

- [@cloudbase/framework-plugin-node](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-node)

- [@cloudbase/framework-plugin-function](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-function)

- [@cloudbase/framework-plugin-database](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-database)

- [@cloudbase/framework-plugin-dart](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-dart)

- [@cloudbase/framework-plugin-container](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-container)
