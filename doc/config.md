# 配置

CloudBase Framework 部署需要创建一个 cloudbaserc.json，填写如下配置文件，调用 `cloudbase framework deploy` 进行部署

```json
{
  "envId": "{{env.ENV_ID}}",
  "$schema": "https://framework-1258016615.tcloudbaseapp.com/schema/latest.json",
  "version": "2.0",
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
              "runtime": "Nodejs10.15"
            }
          ],
          "servicePaths": {
            "nuxt-ssr-echo": "/nuxt-ssr-echo"
          }
        }
      }
    }
  },
  "hooks": {
    "preDeploy": {
      "type": "execCommand",
      "commands": ["echo 1", "echo 2", "echo 3", "echo 4"]
    },
    "postDeploy": {
      "type": "callFunction",
      "functions": [
        {
          "functionName": "nuxt-ssr-echo",
          "params": {
            "foo": "bar"
          }
        },
        {
          "functionName": "nuxt-ssr-echo",
          "params": {
            "foo2": "bar2"
          }
        }
      ]
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

插件别名，使用`cloudbase framework deploy <deploy_name>`可以完成插件这个工作流

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

- [@cloudbase/framework-plugin-website](https://gitee.com/TencentCloudBase/cloudbase-framework/tree/gitee/packages/framework-plugin-website)

- [@cloudbase/framework-plugin-nuxt](https://gitee.com/TencentCloudBase/cloudbase-framework/tree/gitee/packages/framework-plugin-nuxt)

- [@cloudbase/framework-plugin-node](https://gitee.com/TencentCloudBase/cloudbase-framework/tree/gitee/packages/framework-plugin-node)

- [@cloudbase/framework-plugin-function](https://gitee.com/TencentCloudBase/cloudbase-framework/tree/gitee/packages/framework-plugin-function)

- [@cloudbase/framework-plugin-database](https://gitee.com/TencentCloudBase/cloudbase-framework/tree/gitee/packages/framework-plugin-database)

- [@cloudbase/framework-plugin-dart](https://gitee.com/TencentCloudBase/cloudbase-framework/tree/gitee/packages/framework-plugin-dart)

- [@cloudbase/framework-plugin-container](https://gitee.com/TencentCloudBase/cloudbase-framework/tree/gitee/packages/framework-plugin-container)

## `framework.hooks`

类型: Object

framework 部署阶段前后的钩子配置，可以在这里自定义应用不同声明周期的执行

示例

```json
{
  "envId": "{{env.ENV_ID}}",
  "$schema": "https://framework-1258016615.tcloudbaseapp.com/schema/latest.json",
  "version": "2.0",
  "framework": {
    "name": "nuxt-ssr",
    "plugins": {}
  },
  "hooks": {
    "preDeploy": {
      "type": "execCommand",
      "commands": ["echo 1", "echo 2", "echo 3", "echo 4"]
    },
    "postDeploy": {
      "type": "callFunction",
      "functions": [
        {
          "functionName": "nuxt-ssr-echo",
          "params": {
            "foo": "bar"
          }
        },
        {
          "functionName": "nuxt-ssr-echo",
          "params": {
            "foo2": "bar2"
          }
        }
      ]
    }
  }
}
```

### `framework.hooks.preDeploy`

类型: Object

前置钩子，在执行 Framework 完整的构建部署动作之前执行的钩子，可以执行一些命令行命令

#### `framework.hooks.preDeploy.type`

类型: String

前置钩子的类型，目前仅支持 'execCommand' 表示执行命令行命令

#### `framework.hooks.preDeploy.commands`

类型: 数组

要执行的命令，支持数组形式，如 `["echo 1", "echo 2", "echo 3", "echo 4"]`

### `framework.hooks.postDeploy`

类型: Object

后置钩子，在执行 Framework 部署之后，在云端调用的钩子，可以调用一些云函数

#### `framework.hooks.postDeploy.type`

类型: String

前置钩子的类型，目前仅支持 'callFunction' 代表在云端执行云函数

#### `framework.hooks.postDeploy.functions`

类型: 数组

要调用的云函数列表，支持数组，例如

```json
[
  {
    "functionName": "nuxt-ssr-echo",
    "params": {
      "foo": "bar"
    }
  },
  {
    "functionName": "nuxt-ssr-echo",
    "params": {
      "foo2": "bar2"
    }
  }
]
```
