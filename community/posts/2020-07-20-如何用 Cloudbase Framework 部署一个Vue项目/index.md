---
title: 如何用 Cloudbase Framework 部署一个Vue项目
description: 无需修改业务代码，就能将 Vue 应用前后端一键托管部署在云开发平台~
# github 用户名
authorIds:
  - Mu Qin
href: https://zhuanlan.zhihu.com/p/167795243
platforms:
  - Web
tags:
  - Vue
  - ClouBase Framework
  - 静态网站托管
  - 云托管
---

# 如何用 Cloudbase Framework 部署一个 Vue 项目

> 无需修改业务代码，就能将 Vue 应用前后端一键托管部署在云开发平台~

Cloudbase Framework 是云开发官方出品的前后端一体化部署工具。目前已经 **[开源](https://github.com/TencentCloudBase/cloudbase-framework)** 。

关于 Cloudbase Framework 的介绍，bookerzhao（赵兵）发布过一篇 [《**云开发推出「前后端一体化部署工具」CloudBase Framework》**](https://zhuanlan.zhihu.com/p/159302477)。想必大家看完，一定都磨刀霍霍。今天就给大家带来一篇实战文章，如何用 Cloudbase Framework 部署一个 Vue 项目。

## 准备工作

### 第一步：确保本地安装了 Node.js

node 版本需要在 10 以上，如果没有安装，请前往 [官网](https://nodejs.org/en/) 安装，建议选择 LTS 版本。

### 第二步：拥有腾讯云账号、[开通环境](https://cloud.tencent.com/document/product/876/41391)，获得**环境 ID**

### 第三步：安装 Cloudbase CLI

```javascript
npm i -g @cloudbase/cli
```

检查是否安装成功。如果有版本输出，就代表安装成功了。

```
cloudbase -v
```

cloudbase 命令可以简写成 tcb（Tencent CloudBase 的简称）。

`tcb -h `看看 cloudbase 有哪些能力。

![](https://main.qcloudimg.com/raw/73f09ba1440d87f732ba14b1e4820c72.png)

总结下来，大概是这几方面：

- 腾讯云账号登录、退出
- 云开发环境配置
- 应用配置初始化与部署
- 云函数相关
- 文件上传、下载、删除、权限设置
- HTTP Service 相关

### 第四步：登录 Cloudbase

输入以下命令，会在浏览器打开腾讯云的授权页面，点击“确认授权”即可。

```
cloudbase login
```

![](https://main.qcloudimg.com/raw/743959176c0c7afe2b464117d912fe7b.png)

准备工作都做好以后，我们就可以着手部署相关的工作了。

## 部署 Vue 应用

总的来说，用 Cloudbase Framework 部署一个 Vue 应用，只需要两步。第一步：初始化项目配置；第二步，部署。

> **现有项目**

如果你的项目已经存在，在项目根目录，执行以下命令，生成项目配置。

```
cloudbase
```

选择关联环境后，会在项目根目录，生成一个 cloudbasrc.json 文件。云开发环境 ID 会被写进这个文件。

```json
{ "envId": "static-176d4a" }
```

接下来，输入以下命令，进行部署。

```
cloudbase framework:deploy
```

![](https://main.qcloudimg.com/raw/831e938cf46b4f3c160787b3c3fa8ca5.png)

**这个命令会做以下几件事：**

1）安装插件 [@cloudbase/framework-plugin-website](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-website)。在 cloudbaserc.json 里，你会发现执行这个命令后，新增了这个插件。

![](https://main.qcloudimg.com/raw/92f36b98595d0fbcc35b59583f6d1fe7.png)

2）读取云开发环境 ID

3）读取 publicPath，并将应用资源托管到`/`下。因为 my-vue-app 是用 vue-cli 创建的项目，所以 publicPath 默认为"/"

4）打包

5）安装 node_modules

6）部署

部署成功后，访问地址：https://static-176d4a.tcloudbaseapp.com/

![](https://main.qcloudimg.com/raw/77ecab6adb0899fafb0fed05a8f34006.png)

> **新项目**

### 第一步：初始化项目

执行以下命令，Cloudbase 除了会帮你生成项目配置外，还会初始化项目。

```
cloudbase init --template=vue
```

执行命令后，会让你选择关联环境、选择云开发模板（Vue 应用）、输入项目名称。这里，我们的项目名是 cloudbase-example。

**需要注意的是，cloudbase 默认会创建一个全栈 Vue 应用，如果你只想要一个静态 Vue 应用，需要手动去掉云函数部分的代码。**

进入创建好的项目根目录，浏览文件结构你会发现和 cloudbase 相关的，除了 cloudbaserc.json 以外，还有一个 cloudfunctions 目录。这个目录就是云函数所在的目录。在 cloudfunctions 目录下有一个名为 vue-echo 的函数，这个云函数，稍后会用到。

![``](https://main.qcloudimg.com/raw/0ef39afcb5dc86a880f3110e6dcab964.png)

cloudebaserc.json 里，会默认安装两个插件。之前提到的 [@cloudbase/framework-plugin-website ](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-website) 和 云函数部署相关的 [@cloudbase/framework-plugin-function](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-function)

![](https://main.qcloudimg.com/raw/a2acd68f20a7defeb9cc326df91fa273.png)

### 第二步（可跳过）：本地开发。

执行`npm i`, 安装 node_modules。

执行`npm run dev 。`本地运行时，默认监听端口是 5000，publicPath 是 `/vue`。这些配置项均可在 package.json 里修改。

部署云函数： `tcb functions:deploy vue-echo`

![](https://main.qcloudimg.com/raw/075ba1d5112abe0a7e891cc502eb1029.png)

点击“调用 hello world 云函数”按钮时，会调用 callFunction 这个方法。

![](https://main.qcloudimg.com/raw/2d677c81537af4afeab5c4335ac12297.png)

而这个方法，会去调用名为“vue-echo” 的云函数。这个云函数做的就是“echo”的工作，返回一个对象，key 名为“event”, value 是你传入的对象 `{ "foo": "bar" }`

![](https://main.qcloudimg.com/raw/d1caddd5e0ec78542b8882631ea63619.png)

点击按钮，试试。你会发现返回结果已经展现在页面里了：

![](https://main.qcloudimg.com/raw/37966754986ba2556369f58c49276c0a.png)

关于 cloudbase 的云函数，之后的文章会进一步说明，这里就不赘述了。

###

### 第三步：部署

默认 cloudPath 是 `/vue`。如果要修改静态资源路径，请在 cloudbaserc.json 里修改 cloudPath。

输入以下命令，进行部署。

```
cloudbase framework:deploy
```

部署成功

![](https://main.qcloudimg.com/raw/aa57d8d728455aec30e74d41b2fe529f.png)

## 待优化的地方

在体验过程中，用户反馈了这些问题，我们之后会逐步优化。

1）初始化新项目时，支持自动安装 node_modules

目前执行`cloudbase init --template=vue` 时，是不会执行`npm install`的脚本来安装 node_modules 的。

2）初始化项目，支持仅初始化静态 Vue 应用。

目前执行`cloudbase init --template=vue` 时，只支持初始化全栈 Vue 应用，不支持仅初始化静态 Vue 应用。这对于不想用云函数的团队来说，很不方便。

3） 优化静态网站托管缓存

将 cloudPath 从 `/a` 更改到 `/b` 时， `/a` 依然能请求到静态资源。而我们期望的是“覆盖”： `/a` 下不能请求到静态资源。

如果你在部署过程中，遇到了问题，或者希望我们能支持新功能，欢迎 issues 反馈~~

当然，也欢迎更多的小伙伴加入，共建社区生态。

Github 开源地址：https://github.com/TencentCloudBase/cloudbase-framework

欢迎给我们点个 star，帮助我们做得更好。
