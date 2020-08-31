---
title: 如何用云开发快速搭建实时 TodoList 应用
description: "本文基于 web 端实时更新的 todolist 案例，详细介绍了云开发数据库实时推送能力的使用。整个案例使用 CloudBase Framework 前后端一体化部署工具，一站式完成项目的创建、开发以及部署。"
# github 用户名
authorIds:
  - shryzhang
href: https://juejin.im/post/6859930183030292488
platforms:
  - Web
tags:
  - 实时推送
  - 数据库
  - ClouBase Framework
  - 静态网站托管
---

[TOC]

# 效果展示

![enter image description here](http://7368-shryzhang-test-13eb29-1258821855.tcb.qcloud.la/CloudBase-Framework/watch-todolist.gif)

示例地址：http://cloud.qinmudi.cn/watch-todolist

<br>

# 项目开发

# 1.开发前准备

## 1.1 腾讯云 CloudBase 的按量计费环境

我们要部署静态网站，因此，需要提前准备按量计费环境。

## 1.2 项目创建

使用 CloudBase Framework 创建一个 vue 应用。

具体操作，参见：[如何用 Cloudbase Framework 部署一个 Vue 项目？](https://zhuanlan.zhihu.com/p/167795243)

<br>

# 2.项目开发

## 2.1 创建数据库集合

两种创建方式，任选。

### 2.1.1 手动创建

打开云开发控制台，手动创建 watch-todos 集合
![enter image description here](http://7368-shryzhang-test-13eb29-1258821855.tcb.qcloud.la/CloudBase-Framework/collection_create.png?sign=82c3859e25604b9feee9b10893abad9e&t=1592310772)

### 2.1.2 插件方式创建

配置 cloudbaserc.json

    {
      "envId": "your envId",
      "framework": {
        "plugins": {
          "client": {
            "use": "@cloudbase/framework-plugin-website",
            "inputs": {
              "buildCommand": "npm run build",
              "outputPath": "dist",
              "cloudPath": "/watch-todolist"
            }
          },
          "database": {
            "use": "@cloudbase/framework-plugin-database",
            "inputs": {
              "collections": [
                {
                  "collectionName": "watch-todos"
                }
              ]
            }
          }
        }
      }
    }

请注意 database 部分的配置。
这里，"database"是自定义的名称，你可以配置成任何你喜欢的名字~
之后，在 package.json 中，相应配置部署的 script 脚本即可。
比如，我们这里配置了：

    {
      "scripts": {
        "deploy:database": "cloudbase framework:deploy database"
      }
    }

配置完成后，执行：

```shell
yarn deploy:database
```

or

```shell
npm run deploy:database
```

进行部署，云数据库中，就会自动生成 watch-todos 集合。

## 2.2 tcb-js-sdk 引入

```shell
yarn add tcb-js-sdk
```

or

```shell
npm install tcb-js-sdk
```

## 2.3 创建 tcb 接入层

![enter image description here](http://7368-shryzhang-test-13eb29-1258821855.tcb.qcloud.la/CloudBase-Framework/tcb.png?sign=82c3859e25604b9feee9b10893abad9e&t=1592310772)

### 2.3.1 用户登录与数据库实例获取

【注】
获取数据库实例，必须先进行登录授权，否则无法获取。

为了便于演示，这里采用匿名登录方式。

具体实现如下：

【step1】云开发控制台开启匿名登录：

![enter image description here](http://7368-shryzhang-test-13eb29-1258821855.tcb.qcloud.la/CloudBase-Framework/anonymous_login.png?sign=82c3859e25604b9feee9b10893abad9e&t=1592310772)

【step2】tcb/index.js

```javascript
import tcb from "tcb-js-sdk";
import $config from "../../cloudbaserc";

// 初始化
const app = tcb.init({
  env: $config.envId,
});

const auth = app.auth();

let db = null;

async function login() {
  await auth.signInAnonymously();
  // 匿名登录成功检测登录状态isAnonymous字段为true
  const loginState = await auth.getLoginState();
  console.log(loginState.isAnonymousAuth); // true
  return app.database();
}

function getDB() {
  if (!db) {
    db = login();
  }
  return db;
}

export default getDB;
```

### 2.3.2 增删改查逻辑开发

tcb/service.js

```javascript
import $getDB from "./index";

// 正确数据
const data = {
  code: 0,
  data: null,
  msg: "success",
};

// 操作失败数据
function getFailData(msg) {
  return {
    code: -1000,
    data: null,
    msg,
  };
}

// 发生错误数据
function getErrorData(err) {
  return {
    code: -4000,
    data: null,
    msg: err.message,
  };
}

// 数据库集合获取
async function getCollection() {
  const db = await $getDB();
  return db.collection("watch-todos");
}

// 增加
async function addItem(params) {
  const addRes = Object.assign({}, data);

  try {
    const myCollection = await getCollection();
    const res = await myCollection.add(params);
    // 如果插入出错
    if (!res.id) {
      return getFailData("add fail");
    }
  } catch (e) {
    return getErrorData(e);
  }
  return addRes;
}

// 删除
async function deleteItem({ _id }) {
  const deleteRes = Object.assign({}, data);
  try {
    const myCollection = await getCollection();
    const res = await myCollection.doc(_id).remove();
    // 如果没有成功删除
    if (res.deleted === 0) {
      return getFailData("delete fail");
    }
  } catch (e) {
    return getErrorData(e);
  }
  return deleteRes;
}

// 修改
async function updateItem(params) {
  const updateRes = Object.assign({}, data);
  const { _id, checked, color, starred, text } = params;

  try {
    const myCollection = await getCollection();
    const res = await myCollection.doc(_id).update({
      checked,
      color,
      starred,
      text,
    });
    // 如果没有成功更新
    if (res.updated === 0) {
      return getFailData("update fail");
    }
  } catch (e) {
    return getErrorData(e);
  }
  return updateRes;
}

// 查询
async function getList() {
  const listRes = Object.assign({}, data);
  try {
    const myCollection = await getCollection();
    const dbData = await myCollection.get();
    listRes.data = {
      page: 1,
      limit: 10,
      total: 100,
      list: dbData.data,
    };
  } catch (e) {
    return getErrorData(e);
  }
  return listRes;
}

export default {
  addItem,
  deleteItem,
  updateItem,
  getList,
};
```

## 2.4 页面注册 watcher 实时监听

这是 demo 中的 App.vue

```javascript
import $getDB from './tcb';
import $service from './tcb/service';

methods: {
    // 拉取数据列表
  async getList() {
    const res = await $service.getList();
    if (res && res.code === 0) {
      this.todoList = [...res.data.list];
    }
  },
  // 注册数据库变动的实时监听
    async registerTcbWatcher() {
      const getList = this.getList;
      const db = await $getDB();
      this.watcher = db
        .collection('watch-todos')
        .where({
          // query...
        })
        .watch({
          onChange(snapshot) {
            console.log('snapshot', snapshot);
            getList();
          },
          onError(err) {
            console.error('the watch closed because of error', err);
          },
        });
    },
  },
created() {
  this.registerTcbWatcher();
},
destroyed() {
  // 关闭数据库变动的实时监听
  this.watcher.close();
},
```

## 2.5 页面样式美化 + cloudfunctions 文件夹删除（我们没有使用到云函数）

## 2.6 本地预览

```shell
yarn dev
```

or

```shell
npm run dev
```

访问 http://localhost:8080/watch-todolist

<br>

# 3.项目部署

## 3.1 配置 cloudbaserc.json

1）配置 envId（要使用按量计费环境，因为我们要部署的是一个静态网站）
2）删除 server 相关配置（删不删都行，删掉减少冗余）
3）配置你自己的 cloudPath（这里以 /watch-todolist 为例）

    {
      "envId": "your envId",
      "framework": {
        "name": "vue",
        "plugins": {
          "client": {
            "use": "@cloudbase/framework-plugin-website",
            "inputs": {
              "buildCommand": "npm run build",
              "outputPath": "dist",
              "cloudPath": "/watch-todolist"
            }
          }
        }
      }
    }

## 3.2 执行部署

    yarn deploy

<br>

# 4.项目访问

根据你的配置，访问：
http://your_domain/your_path

查看我们的示例，访问：
http://cloud.qinmudi.cn/watch-todolist

打开两个窗口，同时访问。
一个窗口进行增删改操作，另一窗口观察效果~

<br>

<hr>

# 【附：示例代码的本地运行与上线部署】

## 1.示例源码地址

https://github.com/oteam-sources/watch-todolist.git

## 2.本地预览

### 2.1 git clone

```shell
git clone https://github.com/oteam-sources/watch-todolist.git
```

### 2.2 配置 cloudbaserc.json

配置自己的 envId。

### 2.3 部署 database

```shell
yarn deploy:database
```

### 2.4 本地启动

```shell
yarn dev
```

or

```shell
npm run dev
```

### 2.5 本地预览

浏览器访问：http://localhost:8080/watch-todolist/

## 3.一键部署我们的示例：

### 3.1 执行部署

```shell
yarn deploy
```

or

```shell
npm run deploy
```

### 3.2 线上预览

浏览器访问

![enter image description here](http://7368-shryzhang-test-13eb29-1258821855.tcb.qcloud.la/CloudBase-Framework/deploy-success.jpg)

预览部署后的示例~

以上，来自 CloudBase Framework Oteam 团队。 欢迎更多的小伙伴加入，共建社区生态~

<br>

Github 开源地址
https://github.com/TencentCloudBase/cloudbase-framework
