<a href="https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-database">![Tencent CloudBase Framework Database Plugin](https://main.qcloudimg.com/raw/41a9bd0e62c638ab40cb8b8cba26696b.jpg)</a>

# Tencent CloudBase Framework Database Plugin

[![Github License](https://img.shields.io/badge/license-Apache--2.0-blue)](LICENSE)
[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-container)](https://www.npmjs.com/package/@cloudbase/framework-plugin-container)
[![issue](https://img.shields.io/github/issues/TencentCloudBase/cloudbase-framework)](https://github.com/TencentCloudBase/cloudbase-framework/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/TencentCloudBase/cloudbase-framework/pulls)
[![star](https://img.shields.io/github/stars/TencentCloudBase/cloudbase-framework?style=social)](https://github.com/TencentCloudBase/cloudbase-framework)

**云开发 CloudBase Framework 框架「Database」插件**： 通过云开发 **[CloudBase Framework](https://github.com/TencentCloudBase/cloudbase-framework)** 框架一键配置云开发数据库集合、索引，使用高性能的 Serverless 化的 NoSQL 数据库服务。可以搭配其他插件如 Website 插件、Node 插件实现云端一体开发。

## 功能特性

## 使用方法

### 步骤一. 准备工作

具体步骤请参照 [准备云开发环境和 CloudBase CLI 命令工具](../../CLI_GUIDE.md)

### 步骤二. 进入项目目录进行初始化

如果是目前已有的后端应用项目

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
      "client": {
        "use": "@cloudbase/framework-plugin-database",
        "inputs": {
          "collections": [
            {
              "collectionName": "test-collection"
            }
          ]
        }
      }
    }
  }
}
```

### 配置参数说明

### `collections`

必填，数据库集合信息，数组类型

| 属性名称       | 类型     | 长度   | 是否必填 | 描述                                                                                                                                                                                          |
| :------------- | :------- | :----- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| collectionName | `String` | 1-64   | 是       | 集合名称                                                                                                                                                                                      |
| description    | `String` | 1-128  | 是       | 描述信息                                                                                                                                                                                      |
| createIndexes  | Array.   | 1-20   | 否       | 创建的索引                                                                                                                                                                                    |
| dropIndexes    | Array.   | 1-20   | 否       | 删除的索引                                                                                                                                                                                    |
| aclTag         | `String` | 1-32   | 否       | 权限标签。包含以下取值： READONLY：所有用户可读，仅创建者和管理员可写 PRIVATE：仅创建者及管理员可读写 ADMINWRITE：所有用户可读，仅管理员可写 ADMINONLY：仅管理员可读写 CUSTOM：自定义安全规则 |
| aclRule        | `String` | 1-1024 | 否       | aclTag 为 CUSTOM 时，安全规则内容                                                                                                                                                             |

#### createIndex 对象

| 属性名称 | 类型          | 长度 | 是否必填 | 描述         |
| :------- | :------------ | :--- | :------- | :----------- |
| name     | `String`      | 1-64 | 是       | 索引名称     |
| unique   | `Boolean`     | -    | 是       | 是否唯一索引 |
| keys     | Array.< key > | 1-20 | 是       | 描述信息     |

**key 对象**

| 属性名称  | 类型     | 长度 | 是否必填 | 描述                                                            |
| :-------- | :------- | :--- | :------- | :-------------------------------------------------------------- |
| name      | `String` | 1-64 | 是       | 字段名                                                          |
| direction | `String` | 1-8  | 是       | 字段排序，可枚举值：-1（降序）、1（升序）、2dsphere（地理位置） |

#### dropIndex 对象

| 属性名称 | 类型     | 长度 | 是否必填 | 描述     |
| :------- | :------- | :--- | :------- | :------- |
| name     | `String` | 1-64 | 是       | 索引名称 |

## 更多插件

请访问 [CloudBase Framework 插件列表](https://github.com/TencentCloudBase/cloudbase-framework#%E7%9B%AE%E5%89%8D%E6%94%AF%E6%8C%81%E7%9A%84%E6%8F%92%E4%BB%B6%E5%88%97%E8%A1%A8) 搭配使用其他插件

## 文档资料

- 云开发官网地址： [https://cloudbase.net/](https://cloudbase.net/)
- 云开发静态网站开通指南：[https://docs.cloudbase.net/hosting/](https://docs.cloudbase.net/hosting/)
- 云开发控制台地址： [https://console.cloud.tencent.com/tcb](https://console.cloud.tencent.com/tcb?tdl_anchor=github&tdl_site=0)
