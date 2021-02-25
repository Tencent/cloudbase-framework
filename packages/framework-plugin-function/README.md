<a href="https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-function">![Tencent CloudBase Framework Function Plugin](https://main.qcloudimg.com/raw/2cd529a816464f59684515f73b0a5622.jpg)</a>

# Tencent CloudBase Framework Function Plugin

[![Github License](https://img.shields.io/badge/license-Apache--2.0-blue)](LICENSE)
[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-function)](https://www.npmjs.com/package/@cloudbase/framework-plugin-function)
[![issue](https://img.shields.io/github/issues/Tencent/cloudbase-framework)](https://github.com/Tencent/cloudbase-framework/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/Tencent/cloudbase-framework/pulls)
[![star](https://img.shields.io/github/stars/Tencent/cloudbase-framework?style=social)](https://github.com/Tencent/cloudbase-framework)

**云开发 CloudBase Framework 框架「Function」插件**： 通过云开发 **[CloudBase Framework](https://github.com/Tencent/cloudbase-framework)** 框架将项目下的云函数一键部署到云开发环境，提供生产环境可用的自动弹性伸缩的高性能事件驱动的函数计算服务。可以搭配其他插件如 Website 插件、Node 插件实现云端一体开发。

## 功能特性

- 节约成本: 资源伸缩，弹性扩缩容，灵活计费，极大节约资源成本
- 极简配置：自动检测框架，无须配置
- 语言支持:
  - `Node.JS`
  - `PHP`
  - `Java`

## 使用方法

### 步骤一. 准备工作

具体步骤请参照 [准备云开发环境和 CloudBase CLI 命令工具](../../CLI_GUIDE.md)

### 步骤二. 进入项目目录进行初始化

如果目前已有函数应用项目

```bash
cloudbase
```

如果想全新开始一个项目，可以直接执行 init 来从模板开始一个项目

```bash
cloudbase init
```

### 步骤三. 一键部署

```bash
cloudbase framework deploy
```

## 配置

默认情况下不需要任何配置即可使用，以下配置参数针对有特殊需求的场景

### 配置示例

`cloudbase init` 之后会创建云开发的配置文件 `cloudbaserc.json`，可在配置文件的 plugins 里修改和写入插件配置

```json
{
  "envId": "{{envId}}",
  "framework": {
    "plugins": {
      "function": {
        "use": "@cloudbase/framework-plugin-function",
        "inputs": {
          "functionRootPath": "./cloudfunctions",
          "publishIncludeList": "{{env.publishIncludeList}}",
          "functionDefaultConfig": {
            "timeout": 5,
            "envVariables": {
              "FOO": "bar"
            },
            "runtime": "Nodejs10.15",
            "memorySize": 128
          },
          "functions": [
            {
              "name": "helloworld",
              "envVariables": {
                "ABC": "xyz"
              }
            }
          ],
          "servicePaths": {
            "helloworld": "/helloworld"
          }
        }
      }
    }
  }
}
```

### 配置参数说明

### `functionRootPath`

函数根目录

### `functionDefaultConfig`

云函数默认配置, 配置格式和单个函数配置格式相同

CloudBaseFramework 1.6.1 以后支持, 单个函数的配置会在该默认配置的基础上进行 merge

### `functions`

函数配置数组，每个函数的配置格式要求如下：

|       字段        | 是否必填 |                                         类型                                          | 描述                                                                                                                            |
| :---------------: | :------: | :-----------------------------------------------------------------------------------: | ------------------------------------------------------------------------------------------------------------------------------- |
|       name        |    是    |                                        String                                         | 云函数名称，即为函数部署后的名称                                                                                                |
|     triggers      |    否    | [`Array`](https://docs.cloudbase.net/cli/functions/configs.html#cloudfunctiontrigger) | 触发器配置                                                                                                                      |
|      handler      |    否    |                                        String                                         | 函数处理方法名称，名称格式支持“文件名称.函数名称”形式                                                                           |
|      ignore       |    否    |                                `String/Array<String>`                                 | 部署/更新云函数代码时的忽略文件，支持 glob 匹配规则                                                                             |
|      timeout      |    否    |                                        Number                                         | 函数超时时间（1 - 60S）                                                                                                         |
|   envVariables    |    否    |                                        Object                                         | 包含环境变量的键值对对象                                                                                                        |
|        vpc        |    否    |           [VPC](https://docs.cloudbase.net/cli/functions/configs.html#vpc)            | 私有网络配置                                                                                                                    |
|      runtime      |    否    |                                        String                                         | 运行时环境配置，可选值： `Nodejs8.9, Nodejs10.15 Php7, Java8,Go1`                                                               |
|    memorySize     |    否    |                                        Number                                         | 函数内存，默认值为 256，可选 128、256、512、1024、2048                                                                          |
| installDependency |    否    |                                        Boolean                                        | 是否云端安装依赖，目前仅支持 Node.js                                                                                            |
| functionDistPath  |    否    |                                        String                                         | 函数产物路径，相对于函数根目录 functionRootPath，例如 Go 语言可指定二进制文件路径，Java 可以指定 jar 包文件地址                 |
|      aclRule      |    否    |                                  Record<string, any>                                  | 1.3 版本以后支持，安全规则配置，例如 `{ invoke: true }`，请参考 https://docs.cloudbase.net/cloud-function/security-rules.html   |
|    codeSecret     |    否    |                                        String                                         | 1.4.0 版本以后支持，代码保护密钥，传入此参数将保护代码，在控制台/IDE 中无法看到代码明文，格式为 36 位大小字母和数字             |
|     publicNet     |    否    |                                        String                                         | 1.6.14 版本以后支持，是否可以在云函数中访问公网，默认情况开启，配置云函数 VPC 后，默认公网访问会关闭 ，取值['ENABLE','DISABLE'] |
|        eip        |    否    |                                        String                                         | 1.6.14 版本以后支持，是否开启 eip 固定外网 ip 能力，免费环境不可用，取值['ENABLE','DISABLE']                                    |

**注：`runtime` 默认为 `Nodejs10.15`，使用 Node 运行时可不填，使用 Php 和 Java 则必填。**

#### [#](https://docs.cloudbase.net/cli/functions/configs.html#cloudfunctiontrigger)CloudFunctionTrigger

|  名称  | 是否必填 |  类型  |                         描述                          |
| :----: | :------: | :----: | :---------------------------------------------------: |
|  name  |    是    | String |                      触发器名称                       |
|  type  |    是    | String |               触发器类型，可选值：timer               |
| config |    是    | String | 触发器配置，在定时触发器下，config 格式为 cron 表达式 |

#### [#](https://docs.cloudbase.net/cli/functions/configs.html#vpc)VPC

|   名称   | 是否必填 |  类型  |    描述     |
| :------: | :------: | :----: | :---------: |
|  vpcId   |    是    | String |   VPC Id    |
| subnetId |    是    | String | VPC 子网 Id |

### `servicePaths`

服务路径配置

如

```json
{
  "hello-world": "/helloworld"
}
```

### `bumpVersion`

可选，是否自动创建新版本

选择自动创建新版本，可以在控制台进行流量的灰度和控制，不选择的情况下会自动原位更新

### `publishIncludeList`

1.6.16 版本以后支持,如果指定，则只发布列表中的函数

字符串格式，格式如 'fn1,fn2'

## 更多插件

请访问 [CloudBase Framework 插件列表](https://github.com/Tencent/cloudbase-framework#%E7%9B%AE%E5%89%8D%E6%94%AF%E6%8C%81%E7%9A%84%E6%8F%92%E4%BB%B6%E5%88%97%E8%A1%A8) 搭配使用其他插件

## 文档资料

- 云开发官网地址： [https://cloudbase.net/](https://cloudbase.net/)
- 云开发静态网站开通指南：[https://docs.cloudbase.net/hosting/](https://docs.cloudbase.net/hosting/)
- 云开发控制台地址： [https://console.cloud.tencent.com/tcb](https://console.cloud.tencent.com/tcb?tdl_anchor=github&tdl_site=0)
