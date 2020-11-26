---
title: 基于云开发 CloudBase 搭建在线视频会议应用
description: '在线视频会议应用是基于浏览器的能力 WebRTC 以及 腾讯云开发 CloudBase 能力构建而成的应用. 在云开发的助力下, 一个复杂的在线会议应用, 一个人一两天即可完成.'
banner: 'https://main.qcloudimg.com/raw/32b06bb115f94d89e720cce6c9381022.png'
# github 用户名
authorIds:
  - oe
  - binggg
platforms:
  - Web
tags:
  - 实时推送
  - 数据库
  - ClouBase Framework
  - 静态网站托管
---

![](https://main.qcloudimg.com/raw/32b06bb115f94d89e720cce6c9381022.png)

# 基于云开发 CloudBase 搭建在线视频会议应用

在线视频会议应用是基于浏览器的能力 WebRTC 以及 腾讯云开发 CloudBase 能力构建而成的应用. 在云开发的助力下, 一个复杂的在线会议应用, 一个人一两天即可完成.

## 在线体验 Demo

应用体验地址: [Online Meeting Powered by Tencent Cloudbase](https://tcb-demo-10cf5b-1302484483.tcloudbaseapp.com/meeting-simple/)  
项目源码地址: [Github](https://github.com/oe/serverless-zoom-with-webrtc/tree/master/meeting-simple)

> 注: 应用仅供演示之用, 目前仅支持两人视频会议, 功能还不够完善, 还有许多可完善之处.  
> 创建会议后可将会议地址发给他人, 或者在本机另起一浏览器窗口(未避免数据混乱, 可开隐私模式窗口, 或使用另一个浏览器)打开会议地址 来体验

## 在自己的云开发环境中部署

可以在线一键部署或通过本地部署的方式，来独立部署一个自己的在线视频会议应用

### 在线一键部署

只需要点击下方按钮，跳转到腾讯云控制台，即可在云端一键安装一个在线视频会议应用

[![](https://main.qcloudimg.com/raw/95b6b680ef97026ae10809dbd6516117.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=github&tdl_site=0&appUrl=https%3A%2F%2Fgithub.com%2Foe%2Fserverless-zoom-with-webrtc&workDir=meeting-simple&appName=meeting-simple)

### 本地部署

1. 修改 .env 文件中的 ` ENV_ID` 的值 `tcb-demo-10cf5b` 修改为自己的环境 ID
2. 命令行 cd 到本目录中, 执行 `npm run deploy` 即可

## 技术解析

本应用用到的能力、工具、框架有:

1. **[CloudBase Framework](https://github.com/Tencent/cloudbase-framework)** 用于项目基础目录结构生成, 一键部署
2. [Simple Peer](https://github.com/feross/simple-peer) 流行的 WebRTC 库
3. [云开发-云函数](https://docs.cloudbase.net/cloud-function/introduce.html), 包括云函数的定时调用
4. [云开发-数据库](https://docs.cloudbase.net/database/introduce.html)
5. [云开发-静态网站托管](https://docs.cloudbase.net/hosting/introduce.html)
6. [React](https://reactjs.bootcss.com/)
7. [Ant design](https://ant.design)

如果你不清楚项目开发的基本命令, 可阅读本项目使用的[模版的 readme.md](https://github.com/TencentCloudBase/cloudbase-templates/blob/master/react-starter/README.md)

## 背景知识

### Web RTC

1. WebRTC 即 Web 实时通信技术, 由一系列浏览器 API 组成, 包括 _navigator.getUserMedia\*\*,_ _MediaStream**, RTC**相关的全局对象_

2. WebRTC 是一种 P2P 的通信技术, 浏览器之间可以对等连接. 但浏览器之间需要通过一个信令服务器来交换信令后方可建立连接

3. 浏览器的信令信息的获取需要一个 ICE 服务器, 一般默认会使用谷歌的公共服务器

![image-20200901204938345](https://tva1.sinaimg.cn/large/007S8ZIlgy1gibfw2ufgqj30tu0du41w.jpg)

![image-20200901204916919](https://tva1.sinaimg.cn/large/007S8ZIlgy1gibfvpv37vj30p60gajw6.jpg)

## 云开发

云开发（CloudBase）是云端一体化的后端云服务 ，采用 serverless 架构，免去了应用构建中繁琐的服务器搭建和运维。同时云开发提供的静态托管、命令行工具（CLI）、Flutter SDK 等能力降低了应用开发的门槛。使用云开发可以构建完整的小程序/小游戏、H5、Web、移动 App 等应用。

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gibh9r5ingj31hc0u00yz.jpg)

### CloudBase Framework

CloudBase Framework 是云开发官方出品的开源前后端一体化部署工具，无需改动代码，实现前后端一键托管部署，支持常见的框架和语言，支持自动识别并部署。不仅可以部署应用前后端到 Serverless，还可以扩展更多后端能力。

![img](https://main.qcloudimg.com/raw/952b432a3b0688cc2f40e23b09c3fffa.png)

Github 地址： https://github.com/Tencent/cloudbase-framework

![](https://main.qcloudimg.com/raw/a9debe766e8de780f76e20aeb815317d.png)

## 完整搭建步骤：从 0 到 1 实现一个在线会议应用

整个应用的构建, 从项目初始化到最终可以一键部署, 共分为 6 个部分. 为方便读者查阅，主要的代码实现分了 6 次提交, 下述说明中会列出每一步对应的提交 commit.

### 第 1 步 初始化项目和视频页面

#### 注意要点:

1. 在进行操作之前, 请确保已经注册[腾讯云账户](https://console.cloud.tencent.com/tcb/)
2. WebRTC 需要浏览器支持, 只有现代浏览器才支持, 建议使用 [Chrome](https://www.google.cn/chrome/)、Firefox 来体验, 具体兼容性可查看 [caniuse](https://caniuse.com/#search=webrtc)
3. 由于安全策略限制, WebRTC 仅支持 https 协议网站; 其为方便本地开发, 也支持 http 的 `localhost` 及 `127.0.0.1` (不限端口), 不支持其他自定义的本机域名、IP
4. WebRTC 并不具备穿透内网功能, 测试体验时, 确保双方机器都处于公网之中并能访问[云开发](https://www.cloudbase.net)相关域名

#### 操作步骤

1. 初始化项目结构

首先需要全局安装 [Cloudbase CLI](https://docs.cloudbase.net/quick-start/install-cli.html)

```
npm i @cloudbase/cli@latest -g
```

使用以下命令来使用云开发的 react 应用模版创建一个 React 云开发项目

```bash
cloudbase init --template react-starter
```

2. 引入 UI 库 ant-design

```
npm i ant-d @ant-design/icons -S
```

3. 增加 landing 页, 用于检测 WebRTC 能力以及判断用户是否授予摄像头及麦克风访问权限

landing 页面核心代码 `meeting-simple/src/landing/index.js`

```js
import { LoadingOutlined, WarningOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import * as utils from "../utils";
// import * as api from './meeting/api'

export default function Landing(props) {
  // 检测 RTC 支持
  return !utils.isSupportRTC() ? (
    <NotSupport />
  ) : (
    <NotReady setReady={props.setReady} />
  );
}

// 不支持时的显示
function NotSupport() {
  // ...
}

// 支持 RTC 时的显示
function NotReady(props) {
  const [permissionState, setPermissionState] = useState("prompt");
  const [timeCount, setTimeCount] = useState(0);
  const [loadingState, setLoadingState] = useState("init");

  const retry = () => {
    setTimeCount(timeCount + 1);
  };

  // 不同状态时的提示信息，prompt、granted、denied
  const permissionStr = {
    prompt: (
      <p>
        Please allow camera and microphone access to continue, you can turn off
        camera or microphone later in meeting
      </p>
    ),
    denied: (
      <p>
        You should granted camera microphone permissions,{" "}
        <a onClick={retry}>click to retry</a>
      </p>
    ),
    granted: <p>Loading meeting info...</p>,
  };

  useEffect(() => {
    (async () => {
      // 检测权限
      const status = await utils.checkMediaPermission();
      // 设置授权信息
      setPermissionState(status ? "granted" : "denied");
      if (!status) return;
      try {
        // 从浏览器参数拿到会话信息
        const sessID = location.hash.slice(1);
        // if (sessID) {
        //   await api.getSessionInfo(sessID)
        // }
        props.setReady("landing");
      } catch (error) {
        console.warn("failed to get session info", error);
        setLoadingState("Failed to get meeting info: " + JSON.stringify(error));
      }
    })();
  }, [timeCount]);
  const tip =
    permissionStr[permissionState] ||
    (loadingState === "init" ? "loading..." : loadingState);
  return <div className="landing-mask"><!--loading 信息--></div>;
}
```

4. 增加 Video-window 页, 用于支持视频画面显示

Video-window 核心代码 `meeting-simple/src/meeting/video-window/index.js`

```js
import React, { useRef, useEffect } from 'react';
import * as utils from '../../utils';

export default function VideoWindow(props) {
  const videoRef = useRef(null);

  useEffect(() => {
    const updateStream = (stream) => {
      // video 对象对应的dom
      const dom = videoRef.current;
      if (!dom) return;
      // 自己则 mute 静音
      dom.muted = !props.peer;
      if ('srcObject' in dom) {
        dom.srcObject = stream;
        dom.onloadedmetadata = function () {
          dom.play();
        };
        return;
      }
      // 设置实时视频的 stream 地址
      dom.src = URL.createObjectURL(stream);
      dom.play();
    };

    if (props.peer) {
      props.peer.on('stream', updateStream);
      return;
    }
    // 获得 mediaStream
    utils.getMediaStream().then(updateStream);

    return () => {
      if (!props.peer) return;
      props.peer.off('stream', updateStream);
    };
  }, [props.peer]);

  return (
    <video
      ref={videoRef}
      controls={!!props.peer}
      width="640"
      height="480"
    ></video>
  );
}
```

工具方法的核心实现`meeting-simple/src/utils.js`，检测是否支持 WebRTC、

```js
/** 检查是否支持 WebRTC */
export function isSupportRTC() {
  return !!navigator.mediaDevices;
}
// 检测是否有media权限
export async function checkMediaPermission() {
  // 请求获得媒体流输入（包含声音和视频）
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });

  // 判断是否有视频和声音轨道输入
  const result =
    stream.getAudioTracks().length && stream.getVideoTracks().length;

  // 终止媒体流输入
  revokeMediaStream(stream);

  return result;
}

// 终止媒体流
export function revokeMediaStream(stream) {
  if (!stream) return;
  const tracks = stream.getTracks();

  tracks.forEach(function (track) {
    track.stop();
  });
}

let cachedMediaStream = null;
export async function getMediaStream() {
  if (cachedMediaStream) {
    return Promise.resolve(cachedMediaStream);
  }
  // 请求媒体流输入
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true,
  });

  revokeMediaStream(cachedMediaStream);
  cachedMediaStream = stream;

  return cachedMediaStream;
}
```

#### 代码提交记录

本步骤对应的 [git commit](https://github.com/oe/serverless-zoom-with-webrtc/commit/a485865738b6ebbf668a49d0dd7876f7cd6ef17f)

### 第 2 步 支持创建会议

#### 注意要点:

1. 浏览器端调用云开发能力需要借助官方 npm 包 [tcb-js-sdk](https://www.npmjs.com/package/tcb-js-sdk), [官方文档](https://docs.cloudbase.net/api-reference/webv2/initialization.html)
2. 因为视频会议应用无需注册, 即需要匿名使用云开发能力, 调用能力前, 需要在云开发 [登录授权](https://console.cloud.tencent.com/tcb/env/login) 中开启 「匿名登录」
3. 使用云开发能力(不论是在浏览器端、Node 端或其他端)调用数据库时, 操作端 collection 必须存在, 否则会报错. 所以在本步骤应当提前进入[云开发数据库控制台](https://console.cloud.tencent.com/tcb/db/index) 创建视频会议使用的 collection `meeting-simple`
4. 使用 JS sdk 调用云开发能力时, 需保证调用的域名已加入云开发[WEB 安全域名](https://console.cloud.tencent.com/tcb/env/safety)中, 以避免调用时出现跨域问题. 即本地开发使用的域名应增加进 WEB 安全域名 中.

#### 操作步骤

1. 增加 「创建会议」界面
2. 增加云开发能力调用模块 「api.js」, 添加 创建会议方法(通过云开发 js sdk 连接数据库创建记录)

创建会议的前端 API 核心代码 `meeting-simple/src/meeting/api.js`

```js
import tcb from 'tcb-js-sdk';

// 初始化云开发 JSSDK
const app = tcb.init({
  env: 'tcb-demo-10cf5b',
});

// 初始化 auth
const auth = app.auth({
  persistence: 'local',
});

const db = app.database();

// 会议表名称
const MEETING_COLLECTION = 'meeting-simple';

// 匿名登录
async function signIn() {
  if (auth.hasLoginState()) return true;
  await auth.signInAnonymously();
  return true;
}

// 创建会议
export async function createMeeting(meeting) {
  await signIn();
  meeting.createdAt = Date.now();
  // 添加一条会议的记录
  const result = await db.collection(MEETING_COLLECTION).add(meeting);
  return result;
}
```

#### 代码提交记录

本步骤对应的 [git commit](https://github.com/oe/serverless-zoom-with-webrtc/commit/ecc61be1ba59f7910ebcffe425e0c53edf0160b5)

### 第 3 步 实现加入会议功能

#### 操作步骤

1. 增加 「加入会议」界面
2. 在 「api.js」中增加方法(直接调用云开发数据库能力)获取会议信息、加入会议

获取会议信息和加入会议的前端 API 的核心代码 `meeting-simple/src/meeting/api.js`

```js
// 获取会议信息
export async function getMeeting(meetingId) {
  await signIn();
  // 调用 db 查询数据
  const result = await db.collection(MEETING_COLLECTION).doc(meetingId).get();
  if (!result.data || !result.data.length) return;
  const meeting = result.data[0];

  meeting.hasPass = !!meeting.pass;
  delete meeting.pass;
  return meeting;
}

// 加入会议
export async function joinMeeting(data) {
  await signIn();
  // 查询会议信息
  const result = await db.collection(MEETING_COLLECTION).doc(data.id).get();
  if (!result.data || !result.data.length)
    throw new Error('meeting not exists');

  const meeting = result.data[0];
  // 前端对比会议 pass 码来验证，安全性较低，会在第 5 步进行优化
  if (meeting.pass && meeting.pass === data.pass)
    throw new Error('passcode not match');
  return true;
}
```

注:

1. 数据库需要设置成公开访问, 否则匿名用户无法查询到相关信息: 进入数据库找到对应 [collection](https://console.cloud.tencent.com/tcb/database/collection/meeting-simple), 切换至 「权限设置」, 选择 「所有用户可读，仅创建者及管理员可写」并保存

#### 代码提交记录

本步骤对应的 [git commit](https://github.com/oe/serverless-zoom-with-webrtc/commit/c8d9edcfc193e152ea5f3422aa4621c98399f819)

## 第 4 步 实现实时加入会议

#### 操作步骤

1. 增加 simple-peer 来管理 WebRTC 客户端

```js
import Peer from 'simple-peer';
import * as utils from './utils';
import * as api from './api';

export async function createPeer(initiator, meetingId) {
  const peer = new Peer({ initiator });
  const stream = await utils.getMediaStream();
  peer.addStream(stream);

  // peer 接收到 signal 事件时，调用 peer.signal(data) 来建立连接，那么如何拿到 data 信息呢
  peer.on('signal', (e) => {
    console.log('[peer event]signal', e);
    // 调用更新写入数据库
    updateTicket(e, initiator, meetingId);
  });
  peer.on('connect', (e) => {
    console.log('[peer event]connect', e);
  });
  peer.on('data', (e) => {
    console.log('[peer event]data', e);
  });
  peer.on('stream', (e) => {
    console.log('[peer event]stream', e);
  });
  peer.on('track', (e) => {
    console.log('[peer event]track', e);
  });
  peer.on('close', () => {
    console.log('[peer event]close');
  });
  peer.on('error', (e) => {
    console.log('[peer event]error', e);
  });
  return peer;
}

let cachedTickets = [];
let tid = 0;

function updateTicket(signal, isInitiator, meetingId) {
  cachedTickets.push(signal);
  clearTimeout(tid);
  tid = setTimeout(async () => {
    const tickets = cachedTickets.splice(0);
    try {
      // 写入数据库
      const result = await api.updateTicket({
        meetingId,
        tickets,
        type: isInitiator ? 'offer' : 'answer',
      });
      console.warn('[updateTicket] success', result);
    } catch (error) {
      console.warn('[updateTicket] failed', error);
    }
  }, 100);
}

export function signalTickets(peer, tickets) {
  tickets.forEach((item) => {
    peer.signal(item);
  });
}
```

2. 增加云函数 「更新 ticket」(用于更新 WebRTC 客户端的连接信息)并手动部署云函数, 增加对会议记录对监听(即使用数据库的实时推送能力)

用于更新 WebRTC 客户端的连接信息的云函数的核心代码 `meeting-simple/cloudfunctions/update-ticket-meeting-simple/index.js`

```js
const cloud = require("@cloudbase/node-sdk");

   const MEETING_COLLECTION = "meeting-simple";

   exports.main = async (data) => {
  const app = cloud.init({
       env: cloud.SYMBOL_CURRENT_ENV,
     });

     const collection = app.database().collection(MEETING_COLLECTION);

     try {
    // 查询会议信息
       const result = await collection.doc(data.meetingId).get();
       if (!result.data || !result.data.length)
         throw new Error("meeting not exists");
       const meeting = result.data[0];

       const changed = {};
    changed[data.type] = meeting[data.type] ||

       // 若新的tickets中包含 offer 或 answer, 则已经存储的tickets信息无效
    if (data.tickets.some((tk) => ["offer", "answer"].includes(tk.type))) {
         changed[data.type] = data.tickets;
       } else {
         changed[data.type].push(...data.tickets);
       }

       // 另一方信息已经被接受使用, 已无效, 清空之, 避免 客户端 watch 时使用无效数据
    changed[data.type === "offer" ? "answer" : "offer"] = null;

       // 更新会议信息
    const res = await collection.doc(data.meetingId).update(changed);
       return {
         code: 0,
         data: res,
       };
     } catch (error) {
       return {
         code: 1,
         message: error.message,
       };
     }
   };
```

更新票据和监听会议信息变更的前端 API 核心代码 meeting-simple/src/meeting/api.js

```js
// 更新票据
export async function updateTicket(data) {
  await signIn();
  const res = await app.callFunction({
    name: 'update-ticket-meeting-simple',
    data,
  });
  return res;
}

let watcher = null;
export async function watchMeeting(meetingId, onChange) {
  await signIn();

  // 如果有监听，关闭监听
  watcher && watcher.close();

  // 新建数据库监听
  watcher = db
    .collection(MEETING_COLLECTION)
    .doc(meetingId)
    .watch({
      onChange: (snapshot) => {
        console.error(snapshot);

        if (
          !snapshot.docChanges ||
          !snapshot.docChanges.length ||
          !snapshot.docChanges[0].doc
        )
          return;

        // 回调最新的数据库文档信息
        onChange(snapshot.docChanges[0].doc);
      },
      onError: (err) => {
        console.log('watch error', err);
      },
    });
}
```

3. 优化会议信息的获取提升体验

#### 注意

1. 监听数据库变化亦需要将数据库设置为公开访问, 即上述第三步中的注意事项 2 所述
2. 匿名用户无法修改其他匿名用户创建的记录. 根据数据库安全策略, 虽同为匿名用户, 但不同客户端的匿名用户标志不一样, 故不能操作他人的记录. 而云函数有用管理员级别的数据库操作权限, 故 「更新 ticket」功能采用了云函数来编写

#### 代码提交记录

本步骤对应的 [git commit](https://github.com/oe/serverless-zoom-with-webrtc/commit/607512a28d697e6c2d60efe795d449a483fe40b8)

### 第 5 步 提升非公开会议访问的安全性, 优化数据库使用

#### 操作步骤

1. 将会议密码分表存储

修改“加入会议”的前端 API 核心代码 `meeting-simple/src/meeting/api.js`

```js
// 加入会议
export async function joinMeeting(data) {
  await signIn();
  // 加入会议改为使用调用云函数校验，保证密码安全
  const result = await app.callFunction({
    name: 'join-meeting-meeting-simple',
    data,
  });
  if (result.result.code) {
    throw new Error(result.result.message);
  }

  return true;
}
```

负责加入会议时进行密码校验的云函数的核心代码 `meeting-simple/cloudfunctions/join-meeting-meeting-simple/index.js`

```js
const tcb = require('@cloudbase/node-sdk');
const MEETING_COLLECTION = 'meeting-simple';
const MEETING_PASS_COLLECTION = 'meeting-simple-pass';
const app = tcb.init({
  env: tcb.SYMBOL_CURRENT_ENV,
});
const db = app.database();

exports.main = async function (evt) {
  try {
    const result = await db.collection(MEETING_COLLECTION).doc(evt.id).get();
    if (!result.data || !result.data.length)
      return { code: 1, message: 'meeting not exists' };
    const meeting = result.data[0];

    if (meeting.hasPass) {
      // 查询会议密码
      const passResult = await db
        .collection(MEETING_PASS_COLLECTION)
        .where({ meetingId: evt.id })
        .get();
      if (!passResult.data || !passResult.data.length)
        return { code: 2, message: 'passcode not found' };
      const passInfo = passResult.data[0];
      // 对比会议密码
      if (passInfo.pass !== evt.pass)
        return {
          code: 3,
          message: 'passcode not match',
        };
    }
    return { code: 0 };
  } catch (error) {
    return {
      code: 3,
      message: error.message,
    };
  }
};
```

2. 数据库 collection 定期清理旧的无用记录

清理数据的云函数的核心实现`meeting-simple/cloudfunctions/autoclear-meeting-meeting-simple/index.js`

```js
const tcb = require('@cloudbase/node-sdk');
const MEETING_COLLECTION = 'meeting-simple';
const MEETING_PASS_COLLECTION = 'meeting-simple-pass';
const app = tcb.init({
  env: tcb.SYMBOL_CURRENT_ENV,
});
const db = app.database();
/**
 * 定时触发, 清理两天前的会议记录
 *
{
    "triggers": [
        {
            "name": "clear-time-trigger",
            "type": "timer",
            "config": "0 0 2 * * * *"
        }
    ]
}
 */

exports.main = async function () {
  const now = Date.now();
  // 2天前
  const threshold = now - 2 * 24 * 60 * 60 * 1000;
  const _ = db.command;
  try {
    // 查询创建时间两天前的会议记录，进行删除
    await db
      .collection(MEETING_COLLECTION)
      .where({
        createdAt: _.lte(threshold),
      })
      .remove();

    // 查询创建时间两天前的密码记录，进行删除
    await db
      .collection(MEETING_PASS_COLLECTION)
      .where({
        createdAt: _.lte(threshold),
      })
      .remove();
  } catch (error) {
    console.log('failed to batch remove', error);
  }
};
```

#### 注意:

1. 定期清理数据库使用了云函数的[定时触发器](https://docs.cloudbase.net/cloud-function/timer-trigger.html)

#### 代码提交记录

本步骤对应的 [git commit](https://github.com/oe/serverless-zoom-with-webrtc/commit/1cd2ebff769d06b29a34b245984d8fc61df17444)

### 第 6 步 使用 cloudbase framework 一键部署

1. 增加静态部署功能, 使用了 [website 插件](https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-website)
2. 增加部署云函数功能, 包括云函数定时调用的设置, 使用了[function 插件](https://github.com/Tencent/cloudbase-framework/blob/master/packages/framework-plugin-function/README.md)
3. 增加数据 collection 的创建, 包括 collection 访问权限的设置, 使用了 [database 插件](https://github.com/Tencent/cloudbase-framework/blob/master/packages/framework-plugin-database/README.md)

在 `meeting-simple/.env` 文件中声明环境变量信息

```
PUBLIC_URL=./
ENV_ID=tcb-demo-10cf5b
```

在 `meeting-simple/cloudbaserc.json` 文件中声明静态资源、云函数和数据库等各个资源的构建和部署信息

```json
{
  "envId": "{{env.ENV_ID}}",
  "$schema": "https://framework-1258016615.tcloudbaseapp.com/schema/latest.json",
  "version": "2.0",
  "functionRoot": "cloudfunctions",
  "framework": {
    "plugins": {
      "client": {
        "use": "@cloudbase/framework-plugin-website",
        "inputs": {
          "buildCommand": "npm run build",
          "outputPath": "build",
          "cloudPath": "/meeting-simple",
          "envVariables": {
            "REACT_APP_ENV_ID": "{{env.ENV_ID}}"
          }
        }
      },
      "db": {
        "use": "@cloudbase/framework-plugin-database",
        "inputs": {
          "collections": [
            {
              "collectionName": "meeting-simple",
              "aclTag": "READONLY"
            },
            {
              "collectionName": "meeting-simple-pass"
            }
          ]
        }
      },
      "server": {
        "use": "@cloudbase/framework-plugin-function",
        "inputs": {
          "functionRootPath": "cloudfunctions",
          "functions": [
            {
              "name": "autoclear-meeting-meeting-simple",
              "triggers": [
                {
                  "name": "clear-time-trigger",
                  "type": "timer",
                  "config": "0 0 2 * * * *"
                }
              ]
            },
            { "name": "join-meeting-meeting-simple" },
            { "name": "create-meeting-meeting-simple" },
            { "name": "update-ticket-meeting-simple" }
          ]
        }
      }
    }
  }
}
```

执行 ClouBase Framework 的一键部署命令

```bash
cloudbase framework deploy
```

![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gib81yq9zlj30sq0gp44r.jpg)

更多 CloudBase Framework 插件可阅读[CloudBase Framework 官方文档](https://github.com/Tencent/cloudbase-framework#%E7%9B%AE%E5%89%8D%E6%94%AF%E6%8C%81%E7%9A%84%E6%8F%92%E4%BB%B6%E5%88%97%E8%A1%A8)

#### 代码提交记录

本步骤对应的 [git commit](https://github.com/oe/serverless-zoom-with-webrtc/commit/ec4c008e187b4b93d98fb351ffce2cd64e4c447d)

## 总结

在本次实战案例里面，我们通过了解了 WebRTC 的基本使用，通过在线会议系统的实战了解了基于云开发开发一个应用的完整流程，学会使用了数据库实时推送能力的使用、匿名用户使用数据库的安全策略问题及云函数定时调用功能，掌握了使用 CloudBase Framework 一键部署前后端应用这一工具来快速交付。

---

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
