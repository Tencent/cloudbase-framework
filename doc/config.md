## 配置说明

本文档是对 `cloudbaserc.json` 中 `framework` 相关字段的说明。

在使用 [CloudBase Framework](https://github.com/TencentCloudBase/cloudbase-framework) 之前，您需要需要创建一个 `cloudbaserc.json` 配置文件，`cloudbaserc.json` 文件是 CloudBase CLI 、CloudBase VSCode 插件和 CloudBase 应用的配置文件，配置文件会关系到云开发如何构建和部署您的应用。

`cloudbaserc.json` 中的 `framework` 字段是 CloudBase Framework 的配置信息， `cloudbaserc.json` 的其他配置请参考 [https://docs.cloudbase.net/cli-v1/config.html](https://docs.cloudbase.net/cli-v1/config.html#zi-duan)。

以下是一个 `cloudbaserc` 配置文件的示例：

```JSON
{
  "envId": "{{env.ENV_ID}}",
  "$schema": "https://framework-1258016615.tcloudbaseapp.com/schema/latest.json",
  "version": "2.0",
  "framework": {}
}
```

CloudBase Framework 配置文件包含以下几类配置信息：

| 类别                  | 描述                                                                               |
| --------------------- | ---------------------------------------------------------------------------------- |
| [项目信息](#项目信息) | 描述您的应用信息                                                                   |
| [插件配置](#插件配置) | 描述您的应用依赖哪些 CloudBase Framework 插件，根据配置来构建和部署您的应用        |
| [生命周期](#生命周期) | 配置在构建部署生命周期前后，需要执行的自定义动作                                   |
| [应用依赖](#应用依赖) | 在云端一键部署场景下，您需要完善应用依赖配置来声明应用依赖的扩展资源和环境变量参数 |
| [模板变量](#模板变量) | 您可以在配置当中使用模板变量来实现动态配置                                         |

## 项目信息

项目信息用来描述您的应用信息

### `name`

**类型**: `String`

**要求**：

- 长度 1-32 位的字符串

- 只支持 A-Z a-z 0-9 - 和\_

应用唯一标识，一个账号下不能有重名的应用名称。

**示例**：

```JSON
{
  "framework": {
    "name": "cloudbase-helloworld"
  }
}
```

## 插件配置

描述您的应用依赖哪些 CloudBase Framework 插件，根据配置来构建和部署您的应用

### `plugins`

**类型**: `Record<string,PluginConfig>`

描述您的应用依赖哪些 CloudBase Framework 插件，以便根据配置来构建和部署您的应用，应用可以使用多个插件，具体插件配置方式参考下文。

**示例**：

```JSON
{
  "framework": {
    "plugins": {}
  }
}
```

#### `plugins.<deploy_name>`

**类型**: `PluginConfig`

单个插件配置信息

由 `PluginConfig` 对象组成:

| 字段     | 描述                                                                                                                             | 类型     |
| -------- | -------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `use`    | 使用的插件 npm 包名，例如 `@cloudbase/framework-plugin-website`支持指定插件版本，例如`@cloudbase/framework-plugin-website@1.3.5` | `String` |
| `inputs` | 插件入参配置，不同的插件，支持的入参不同，请查阅对应插件的 README 或者文档                                                       | `Object` |

目前支持的插件名称请参阅 [https://github.com/TencentCloudBase/cloudbase-framework#目前支持的插件列表](https://github.com/TencentCloudBase/cloudbase-framework#目前支持的插件列表)

**示例**：

```JSON
{
  "framework": {
    "plugins": {
      "client": {
        "use": "@cloudbase/framework-plugin-website",
        "inputs": {
          "buildCommand": "npm run build",
          "outputPath": "dist",
          "cloudPath": "/vue"
        }
      },
      "server": {
        "use": "@cloudbase/framework-plugin-function",
        "inputs": {
          "functionRootPath": "cloudfunctions",
          "functions": [{
            "name": "vue-echo"
          }]
        }
      }
    }
  }
}
```

## 生命周期

配置在构建部署生命周期前后，需要执行的自定义动作

### `hooks`

**类型**: `HoosConfig`

CloudBase Framework 部署前后的钩子配置，可以在这里自定义应用不同生命周期的执行动作

前置钩子，在执行 Framework 完整的构建部署动作之前执行的钩子，可以执行一些命令行命令

配置由以下对象组成:

| 字段         | 描述               | 类型                    |
| ------------ | ------------------ | ----------------------- |
| `prevDeploy` | 前置钩子的配置信息 | `PreDeployHooksConfig`  |
| `postDeploy` | 后置钩子的配置信息 | `PostDeployHooksConfig` |

**示例**：

```JSON
{
  "framework": {
    "hooks": {}
  }
}
```

#### `hooks.preDeploy`

**类型**: `PreDeployHooksConfig`

前置钩子，在执行 Framework 完整的构建部署动作之前执行的钩子，可以执行一些命令行命令

配置由以下 `PreDeployHooksConfig` 对象组成:

| 字段       | 描述                                                         | 类型     |
| ---------- | ------------------------------------------------------------ | -------- |
| `type`     | 前置钩子的类型，目前仅支持 `execCommand`，表示执行命令行命令 | `String` |
| `commands` | 要执行的 `command` 命令列表                                  | `Array`  |

**示例**：

```JSON
{
  "framework": {
    "hooks": {
      "preDeploy": {
        "type": "execCommand",
        "commands": [
          "sudo npm install -g lerna",
          "lerna bootstrap"
        ]
      }
    }
  }
}
```

#### `hooks.postDeploy`

**类型**: `PostDeployHooksConfig`

后置钩子，在执行 Framework 部署之后，在云端调用的钩子，可以调用一些云函数

配置由以下 `PostDeployHooksConfig` 对象组成:

| 字段        | 描述                                                           | 类型                    |
| ----------- | -------------------------------------------------------------- | ----------------------- |
| `type`      | 前置钩子的类型，目前仅支持 `callFunction` 代表在云端执行云函数 | `String`                |
| `functions` | 要调用的云函数列表，支持数组，例如                             | `Array<FunctionConfig>` |

`FunctionConfig` 对象格式如下：

| 字段           | 描述                 | 类型                    |
| -------------- | -------------------- | ----------------------- |
| `functionName` | 调用的云函数的函数名 | `String`                |
| `params`       | 调用云函数的参数信息 | `Record<string,string>` |

**示例**：

```JSON
{
  "framework": {
    "hooks": {
      "postDeploy": {
        "type": "callFunction",
        "functions":[
          {
            "functionName": "echo",
            "params": {
              "foo": "bar"
            }
          }
        ]
      }
    }
  }
}
```

## 应用依赖

在云端一键部署场景下，您需要完善应用依赖配置来声明应用依赖的扩展资源和环境变量参数

### `requirement`

**类型**: `RequirementConfig`

描述项目通过控制台一键安装部署时依赖的其他资源信息、环境变量等业务参数。

`RequirementConfig` 对象格式如下：

| 字段          | 描述                                                                                                                                                                         | 类型                |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| `addons`      | 应用部署过程中用到的外部云上资源，包括 cfs、cynosdb、redis 等                                                                                                                | `AddonsConfig`      |
| `environment` | 应用在构建时和运行时的环境变量配置声明，默认注入计算环境中(云函数、云应用)，也会在云端构建时作为构建部署的环境变量，可以在 `cloudbaserc.json` 中通过 `{{env.ENV_NAME}}` 引用 | `EnvironmentConfig` |

#### `requirement.addons`

**类型**: `AddonsConfig`

应用部署过程中用到的外部云上资源，包括 cfs、cynosdb、redis 等

`AddonsConfig` 对象格式如下：

| 字段     | 描述                                                                                                      | 类型                     |
| -------- | --------------------------------------------------------------------------------------------------------- | ------------------------ |
| `type`   | 资源类型，目前支持 `CFS` 和 `CynosDB`                                                                     | `'CFS'\|'CynosDB'`       |
| `name`   | 资源名称，只支持 a-z 0-9 和 -                                                                             | `String`                 |
| `envMap` | 环境变量映射文件，会将云资源产生的 IP 、PORT 通过右侧定义的名称来映射为对应的环境变量名称，并注入环境变量 | `Record<string, string>` |

**目前支持的资源：**

| 类型      | 描述                                                                                                                               | 导出的环境变量                        |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `CFS`     | 共享文件存储服务。CFS 可以和云托管容器服务搭配使用，为多个计算节点提供弹性高性能共享存储                                           | 无                                    |
| `CynosDB` | 腾讯云数据库 CynosDB（TencentDB for CynosDB） 是腾讯云自研的新一代高性能高可用的企业级分布式云数据库。目前支持数据库引擎 MySQL 5.7 | `IP`、`PORT`、`USERNAME` 、`PASSWORD` |

**示例**：

```JSON

  "framework": {
    "requirement": {
      "addons": [
        {
          "type": "CynosDB",
          "name": "wordpress",
          "envMap": {
            "IP": "WORDPRESS-IP",
            "PORT": "WORDPRESS-PORT",
            "USERNAME": "WORDPRESS-USERNAME",
            "PASSWORD": "WORDPRESS-PASSWORD"
          }
        }
      ]
    }
  }
}
```

#### `requirement.environment`

**类型**:` Record<string,EnvironmentConfig>`

应用在构建时和运行时的环境变量配置声明，默认注入计算环境中(云函数、云应用)，也会在云端构建时作为构建部署的环境变量，可以在 `cloudbaserc.json` 中通过 `{{env.ENV_NAME}}` 引用

配置由环境变量的 key 和相关的环境变量选项的对象组成，环境变量选项的格式`EnvironmentConfig`

`EnvironmentConfig` 对象格式如下：

| 字段          | 描述                             | 类型               |
| ------------- | -------------------------------- | ------------------ |
| `description` | 环境变量描述，会在输入时进行提示 | `String`           |
| `required`    | 是否必填                         | `Boolean`          |
| `default`     | 默认值                           | `String`           |
| `validation`  | 校验规则配置                     | `ValidationConfig` |

`ValidationConfig`对象格式如下：

| 字段           | 描述                 | 类型         |
| -------------- | -------------------- | ------------ |
| `rule`         | 校验规则信息         | `RuleConfig` |
| `errorMessage` | 校验失败时的错误信息 | `String`     |

`RuleConfig`对象格式如下：

| 字段      | 描述                                          | 类型     |
| --------- | --------------------------------------------- | -------- |
| `type`    | 校验规则类型，目前支持`"RegExp"` 代表正则类型 | `String` |
| `pattern` | 正则的 Pattern                                | `String` |
| `flag`    | 正则的 Flag                                   | `String` |

**示例**：

```JSON
{
  "framework": {
    "requirement": {
      "environment": {
        "SECRET_TOKEN": {
          "description": "A secret key for verifying the integrity of signed cookies.",
          "required": true,
          "default": "default_value",
          "validation": {
            "rule": {
              "type": "RegExp",
              "pattern": "[3-9]",
              "flag": "g"
            },
            "errorMessage": "数值范围3-9"
          }
        }
      }
    }
  }
}
```

## 模板变量

配置文件支持动态变量的特性。在 `cloudbaserc.json` 中声明 `"version": "2.0" `即可启用。

动态变量特性允许`cloudbaserc.json` 配置文件中使用动态变量，从环境变量中获取动态的数据。使用`{{}}`包围的值定义为动态变量，可以引用数据源中的值。例如` {{env.ENV_ID}}`:

第一步：在项目根目录下创建 **cloudbaserc.json** 和 **.env** 文件

```纯文本
.
├─cloudbaserc.json
├─.env
```

第二步：在 **.env** 文件内添加变量

```纯文本
ENV_ID=pro-123
DB_NAME=pro_user
```

第三步：在 **cloudbaserc.json** 文件内通过 `env` 注入模板变量

```JSON
{
  "version": "2.0",
  "envId": "{{env.ENV_ID}}",
  "framework": {
    "name": "node-capp",
    "plugins": {
      "node": {
        "use": "@cloudbase/framework-plugin-node",
        "inputs": {
          "name": "node-capp",
          "path": "/node-capp",
          "platform": "container",
          "containerOptions": {
            "envVariables": {
              "env": "{{env.ENV_ID}}",
              "db": "{{env.DB_NAME}}"
            }
          }
        }
      }
    }
  }
}
```

第四步：一键部署应用

```Bash
cloudbase framework deploy
```

### 模式切换

假设你已经完成了以上**模板变量**的配置

第一步：在项目根目录额外添加 **.env.dev** 文件

```纯文本
.
├─cloudbaserc.json
├─.env
├─.env.dev
```

第二步：在 **.env.dev** 文件添加变量

```纯文本
ENV_ID=dev-123
DB_NAME=dev_user
```

第三步：部署应用时使用 `--mode` 指定模式

```Bash
cloudbase framework deploy --mode dev
```

## 完整示例

```JSON
{
  "version": "2.0",
  "envId": "{{env.ENV_ID}}",
  "$schema": "https://framework-1258016615.tcloudbaseapp.com/schema/latest.json",
  "framework": {
    "plugins": {
      "admin": {
        "use": "@cloudbase/framework-plugin-website",
        "inputs": {
          "outputPath": "./packages/admin/dist",
          "installCommand": "echo \"Skip Install\"",
          "buildCommand": "npm run build",
          "cloudPath": "{{env.deployPath}}"
        }
      },
      "init": {
        "use": "@cloudbase/framework-plugin-function",
        "inputs": {
          "functionRootPath": "./packages",
          "functions": [
            {
              "name": "cms-init",
              "timeout": 60,
              "envVariables": {
                "CMS_ADMIN_USER_NAME": "{{env.administratorName}}",
                "CMS_ADMIN_PASS_WORD": "{{env.administratorPassword}}",
                "CMS_OPERATOR_USER_NAME": "{{env.operatorName}}",
                "CMS_OPERATOR_PASS_WORD": "{{env.operatorPassword}}",
                "CMS_DEPLOY_PATH": "{{env.deployPath}}",
                "ACCESS_DOMAIN": "{{env.accessDomain}}"
              },
              "installDependency": true,
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
          "projectPath": "./packages/service",
          "path": "/tcb-ext-cms-service",
          "functionOptions": {
            "timeout": 15,
            "envVariables": {
              "NODE_ENV": "production"
            }
          }
        }
      },
      "db": {
        "use": "@cloudbase/framework-plugin-database",
        "inputs": {
          "collections": [
            {
              "collectionName": "tcb-ext-cms-projects",
              "description": "CMS 系统项目数据（请不要手动修改）",
              "aclTag": "ADMINONLY"
            },
            {
              "collectionName": "tcb-ext-cms-schemas",
              "description": "CMS 系统内容模型数据（请不需要手动修改）",
              "aclTag": "ADMINONLY"
            },
            {
              "collectionName": "tcb-ext-cms-users",
              "description": "CMS 系统系统用户数据，存储 CMS 的用户信息，包括管理员账号信息，角色信息等（请不要手动修改）",
              "aclTag": "ADMINONLY"
            },
            {
              "collectionName": "tcb-ext-cms-webhooks",
              "description": "CMS 系统系统 webhook 集合，存储 CMS 系统的回调接口配置，CMS 系统数据的变更可以通过回调来进行同步 （请不要手动修改）",
              "aclTag": "ADMINONLY"
            },
            {
              "collectionName": "tcb-ext-cms-settings",
              "description": "CMS 系统系统配置集合，存储 CMS 系统的设置（请不要手动修改）",
              "aclTag": "ADMINONLY"
            },
            {
              "collectionName": "tcb-ext-cms-user-roles",
              "description": "CMS 系统系统用户角色配置集合，存储 CMS 系统的自定义用户角色信息（请不要手动修改）",
              "aclTag": "ADMINONLY"
            }
          ]
        }
      }
    },
    "requirement": {
      "addons": [],
      "environment": {
        "administratorName": {
          "description": "管理员账户名，账号名长度需要大于 4 位，支持字母和数字",
          "required": true,
          "default": "admin",
          "validation": {
            "rule": {
              "type": "RegExp",
              "pattern": "[^[a-zA-Z0-9]+[a-zA-Z0-9_-]?[a-zA-Z0-9]+$]",
              "flag": "g"
            },
            "errorMessage": "字母和数字的组合，不能为纯数字，长度范围是 1 ~ 32"
          }
        }
      }
    }
  }
}
```
