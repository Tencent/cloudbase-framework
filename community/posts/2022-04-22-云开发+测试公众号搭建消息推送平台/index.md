---
title: 2022-04-22-云开发+测试公众号搭建消息推送平台
description: '本文基于 web 端实时更新的 todolist 案例，详细介绍了云开发数据库实时推送能力的使用。整个案例使用 CloudBase Framework 前后端一体化部署工具，一站式完成项目的创建、开发以及部署。'
banner: './banner.jpg'
# github 用户名
authorIds:
  - yuwuwu
href: https://juejin.cn/post/7089314780804022280
platforms:
  - Web
tags:
  - ClouBase Framework
  - node
  - 微信模板消息
---


## 背景

我个人平时在写一些脚本时会接入微信消息通知以及搭建个人服务器部署服务，而前者需要认证主体为非个人的公众号，后者也需要购买各种云服务器，这两者都是有一定成本的。公众号的问题可以使用腾讯官方提供的测试号解决，而服务器一直是蹭双十一付费购买的。直到我接触到腾讯云开发，云开发不需要我搭建服务器、数据库，而且每个月都有免费的调用额度，可以省去服务器的费用。我就开始将自己的服务都逐渐迁移到腾讯云上。

这次主要写的是<b>云函数 + 测试公众号搭建一个微信消息推送平台</b>类似于 [server酱](https://sct.ftqq.com/upgrade?fr=sc)，因为server酱对所有开发者开放，所以会对使用者有一些请求次数上限的限制,非会员日上限仅5次，我才会自己搭建一个消息推送平台。本文也同样适用于有企业主体的公众号搭建模板消息模块。

## 开发准备工作

### 1. 申请测试公众号

从官网[https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login](https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=sandbox/login)微信扫码登录就可以注册自己的测试公众号。

### 2. 准备云开发环境

#### 2.1 创建云开发环境

登录 腾讯云官网 > 控制台 > 云开发 > 开通云开发，然后点击左上角新建按钮。

我在这里选择的是express应用；然后按照图示创建一个云开发环境。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/788e4a1438024ce895ff35bbf1690fbc~tplv-k3u1fbpfcp-watermark.image?)
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ec52543737842d1a927728026a10347~tplv-k3u1fbpfcp-watermark.image?)
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f55ef06a0644a2793bce78a0feb53a4~tplv-k3u1fbpfcp-watermark.image?)

#### 2.2 安装cloudbase/cli

cloudbase/cli是官方提供的云开发脚手架，他可以帮助使用者快速方便的管理云开发的项目和资源。
```
npm i -g @cloudbase/cli
```

#### 2.3 登录云开发

在命令行输入以下命令会打开浏览器页面，在页面内登录自己的账号,然后点击确认授权。

```
cloudbase login
```

#### 2.4 创建部署云函数
创建云函数的话可以通过 云函数 > 新建云函数 创建，也可以通过cli工具创建，这里主要讲解第二种方案。

输入以下命令创建项目，地域与关联环境需要与2.1步骤创建时信息一致，只有关联了环境才可以一键部署。执行完成后就会创建一个基于`express`的项目模板。

```
cloudbase new [project-name]
```
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/94a293072e374e30a96ea66e2dea2aeb~tplv-k3u1fbpfcp-watermark.image?)

进入项目根目录下，执行以下命令部署云函数。部署完成后回到云函数控制台，会发现刚才创建的环境下多了一个云函数。
```
cloudbase framework deploy
```
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1bc72768fe384f3d8efd8d2d5f13863d~tplv-k3u1fbpfcp-watermark.image?)

如果想要修改云函数的函数ID/名称，可以通过修改`cloudbaserc.json`文件`inputs.name`字段实现。
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b079524010f4db98594487d6dc8ce7e~tplv-k3u1fbpfcp-watermark.image?)

## 开发

我们需要调用微信的api，所以必须遵守微信的一些验签传参规则。下图是我梳理出的调用微信业务的流程。
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9198e46f42a40a6968b0e8eeb776075~tplv-k3u1fbpfcp-watermark.image?)

### 1. 微信接口配置

项目根目录下创建`utils`文件夹和`utils/wxConfig.js`文件，用来存放微信公众号的配置。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ee6a50d3bac42ba9bd1839f818255cc~tplv-k3u1fbpfcp-watermark.image?)
`appId`和`secret`可以从测试公众号后台获取，`token`是一个自定义的字符串，用来验证微信服务器响应的。
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/120e55c9dab14205a3c9aaee39804cb8~tplv-k3u1fbpfcp-watermark.image?)


编辑`routes/index.js`:

ps:需要安装sha1依赖,对参数加密。`npm install sha1`
```js
const express = require("express");
const config = require("../utils/wxConfig.js")
const sha1 = require('node-sha1')
const router = express.Router();

// 验证消息来自微信服务器
router.get("/", function (req, res, next) {
	const token = config.token
	const signature = req.query.signature
	const nonce = req.query.nonce
	const timestamp = req.query.timestamp
	const str = [token, timestamp, nonce].sort().join('')
	const sha = sha1(str)
	if (sha === signature) {
		const echostr = req.query.echostr; //获取微信请求参数echostr
		res.send(echostr + ''); //正常返回请求参数echostr
	} else {
		res.send('验证失败');
	}
});
```
这个接口的业务流程为微信官方提供的固定写法。写完这个接口后部署云函数,我们就可以配置测试公众号后台的“接口配置信息”和“js接口安全域名”了。其中token填写的就是上一步`utils/wxConfig.js`中自定义的token;域名则来自 云函数后台 > 云函数 > http访问服务。需要注意的是接口配置的URL就是上一步写的验证微信服务器消息接口的访问地址，而js接口安全域名只需要填写域名。
```
cloudbase framework deploy
```
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59c2f6ae8692484f8faf59416c4a5554~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d2740d874886436995abbbc09f31d9c8~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9754c1aef15f46df8b55fa1d890ff344~tplv-k3u1fbpfcp-watermark.image?)


### 2. 获取用户openid

根据我梳理出的微信业务流程图可以看出来，获取用户openid需要先获取用户的code,而code是用户授权后，微信以回调函数的方式返回的，所以我们要先处理微信授权。

#### 2.1 微信授权接口

在测试公众号 > 体验接口权限表 > 网页服务 > 网页账号 > 修改  弹出的弹窗内填写授权回调域名，域名跟上一步的js接口安全域名一样。
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e318a1490f95440f840479e37c8e8099~tplv-k3u1fbpfcp-watermark.image?)
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9bdf289d2e9642b899717774df12cb94~tplv-k3u1fbpfcp-watermark.image?)

编辑`routes/index.js`:

ps:需要安装urlencode依赖，对回调地址编码处理`npm install urlencode`

```js
// 网页授权回调获取code
router.get("/authorize", function (req, res, next) {
	const appid = config.appid
	const redirect_uri = urlencode("https://send-wx-message-xxxxxxxxxxx.ap-shanghai.app.tcloudbase.com/express-starter/getUserInfo")
	res.redirect(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=STATE&connect_redirect=1#wechat_redirect`)
});
```
通过重定向调用微信的授权接口，授权成功后微信又会重定向到redirect_uri并且携带用户`code`，这个`code`只能被使用1次，并且有有效期。

#### 2.2 获取openId

上一步中，微信会重定向到我们的回调地址，所以我们需要再继续写一个get接口，获取到回调中的code参数，去微信服务器换取openid。

防止`routes/index.js`里代码太多，可读性差，在根目录下创建`models/wxApi.js`,将调用微信的请求都放到这个文件下（个人习惯）
```js
//routes/index.js
// 根据code当前用户查询信息
router.get("/getUserInfo", async (req, res, next)=> {
	try {
		const {appid,secret} = config
		const code =  req.query.code
		const res_getOpenid = await getOpenid(appid,secret,code)
        if(res_getOpenid.openid){
			res.render("index", { title: "复制key" ,openid:res_getOpenid.openid});
		}else{
			res.render("error", { res_getOpenid});
		}
	} catch (error) {
		res.render("error", { errcode:500,errmsg: error });
	}
	
});
```
ps:需要安装axios依赖,发起请求。`npm install axios`
```js
//models/wxApi.js
const axios = require("axios");

module.exports = {
    getOpenid: async (appid, secret, code) => {
        const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`
        const { data } = await axios({
            url: url
        })
        return data
    },
}
```
最终我返回了一个页面，可以让用户在页面内复制自己的`openId`。
![xiaoguo.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f0fdfac29a3642c1a9bdf8a319441c3d~tplv-k3u1fbpfcp-watermark.image?)

### 3. 推送微信模板消息

推送模板消息主要依赖`access_token`和`模板消息Id`,所以我们主要分为这两步。

```js
//routes/index.js
// 推送模板消息
router.post("/sendMessage",async  (req, res, next)=> {
	try {
		const {openid,title,desc} = req.body
		const {appid,secret} = config
		const res_getAccessToken = await getAccessToken(appid,secret)
		if(res_getAccessToken.errcode > 0){
			res.send(res_getAccessToken)
			return
		}
		const res_sendWxMessage = await sendWxMessage(openid,res_getAccessToken.access_token,title,desc)
		if(res_sendWxMessage.errcode > 0){
			res.send(res_sendWxMessage)
			return
		}
		res.send({
			errcode:0,
			errmsg:'ok'
		})
	} catch (error) {
		res.send( { errcode:500,errmsg: error });
	}
})
```
#### 3.1 获取access_token

```js
//models/wxApi.js
    getAccessToken: async (appid, secret) => {
        const accessTokenJson = global.accessTokenJson || {}
        const nowTime = new Date().getTime()
        // 提前半小时刷新access_token
        if (accessTokenJson.access_token && (nowTime - accessTokenJson.createTime < (accessTokenJson.expires_in - 1800) * 1000)) {
            return accessTokenJson
        } else {
            const { data } = await axios({
                url: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`
            })
            if (data.access_token) {
                    global.accessTokenJson = {...data,createTime:nowTime}
            }
            return data
        }

    },
```


因为微信提供的获取`access_token`接口有调用上限，并且`access_token`有效期为2个小时，所以需要对`access_token`进行缓存，这里我采用的方案是将`access_token`写入global，并记录写入时间，获取时先查看global的数据是否过期。

#### 3.2 推送模板消息

首先创建消息模板，测试公众号后台 > 模板消息接口 > 新增测试模板,标题和内容都可以自定义，但是只有内容支持变量，变量需要遵守一定的格式 “{{变量.DATA}}”。提交后获取到模板id。
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c833b1544f834674a40e9ec3ffb93dc4~tplv-k3u1fbpfcp-watermark.image?)
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1b9e9c897fd548f29dd6dcf8224858c3~tplv-k3u1fbpfcp-watermark.image?)

```js
//models/wxApi.js
    sendWxMessage: async (openid, access_token, title, desc) => {
        const json = {
            touser: openid,
            template_id: 'Hzz2IF_rF59sOBDdVtrXntuTC4E98XLGUl6_PGUYBHg',
            topcolor: "#FF0000",
            data: {
                title: {
                    value: title,
                    color: "#173177"
                },
                desc: {
                    value: desc,
                    color: '#173177'
                }
            }
        }
        const { data } = await axios({
            method: "post",
            url: `https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${access_token}`,
            data: json
        })
        return data
    }
}
```
微信模板消息接口入参为固定格式，`touser`是接收人的openid， `template_id`是消息模板id， `data`里的内容为创建模板消息内容时的变量名。

完成这一步整个功能就开发完了，我们再部署一下云函数，调用消息推送接口，微信上就会收到来自订阅号的消息。
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec2f0523e62745a294e19640eaef7d69~tplv-k3u1fbpfcp-watermark.image?)
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1eec4429729347bfb227cb7bb2c3bd9d~tplv-k3u1fbpfcp-watermark.image?)
## 结尾
这段项目代码也适用于正式公众号项目的开发，但是如果在正式项目中使用的话要注意信息的加密以及并发的问题，可以使用加密方式对用户openid进行混淆加密以及将access_token存入redis中，定时刷新redis中的token。

另外，在迁移腾讯云时暴露出一个问题，我之前存储`access_token`的方案是通过`fs`读写json文件的方案实现的，但是腾讯云函数写文件一直失败，查阅资料发现文件权限都是只读的，无法写入，改为了使用Node global对象去实现。

完整代码查看[https://github.com/yuwuwu/blog-code](https://github.com/yuwuwu/blog-code/tree/master/node%E6%90%AD%E5%BB%BA%E6%B6%88%E6%81%AF%E6%8E%A8%E9%80%81/send-wx-message),欢迎点个star⭐️。


## CloudBase Framework 开源项目介绍

🚀 CloudBase Framework 是云开发开源的云原生前后端一体化部署工具，支持主流前后端框架，前后端一键托管部署在云端一体化平台，支持支持小程序、Web、Flutter、后端服务等多个平台。

Github 开源地址：[https://github.com/Tencent/cloudbase-framework](https://github.com/Tencent/cloudbase-framework)

欢迎给 CloudBase Framework 一个 🌟 star

## CloudBase Framework 核心贡献者计划

欢迎大家参与 CloudBase Framework 的开发工作，成为我们的贡献者，我们将会在云开发社区展示贡献者的作品和信息，同时也会有惊喜奖励。

您可以选择如下的贡献方式：

- 贡献技术文章：[https://github.com/Tencent/cloudbase-framework/tree/master/community/posts](https://github.com/Tencent/cloudbase-framework/tree/master/community/posts)
- 贡献应用：[https://github.com/Tencent/cloudbase-framework/blob/master/doc/app.md](https://github.com/Tencent/cloudbase-framework/blob/master/doc/app.md)
- 贡献代码，提交 Pull Request
- 反馈 bug，提交 Issue
- 在技术会议上发表技术演讲

CloudBase Framework 的发展离不开社区的积极贡献，这是我们的核心贡献者列表，再次感谢大家的贡献：[https://github.com/Tencent/cloudbase-framework#contributors-](https://github.com/Tencent/cloudbase-framework#contributors-)