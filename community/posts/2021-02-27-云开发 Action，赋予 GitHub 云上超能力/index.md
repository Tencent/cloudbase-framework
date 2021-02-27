---
title: 云开发 Action，赋予 GitHub 云上超能力
description: 如果你对使用 GitHub 自动构建和部署云开发项目感兴趣，欢迎随我来共同尝鲜 V2 版云开发 Action
banner: './banner.jpg'
authorIds:
  - beetcb
href: https://beetcb.com/action-github
platforms:
  - GitHub Action
tags:
  - GitHub Action
  - CI/CD
  - ClouBase Framework
---

![Tencent CloudBase Github Action V2](https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fb31b1940-685a-470f-9989-c6fc8b5f724b%2Ftcbaction.jpg?table=block&id=093c3dbf-1fb7-4693-a867-e33cc02b0f11&cache=v2)

## Hello 👋

我是来自社区的 [@beetcb](https://github.com/beetcb) ，前几天有幸参与了 [Tencent CloudBase Github Action V2](https://github.com/TencentCloudBase/cloudbase-action) ( AKA 云开发 Atcion) 的代码与文档贡献。如果你对**使用 GitHub 自动构建和部署云开发项目**感兴趣，欢迎随我来共同尝鲜 V2 版云开发 Action：

[TencentCloudBase/cloudbase-action](https://github.com/TencentCloudBase/cloudbase-action)

## 我们为何需要在意 GitHub Actions ?

[GitHub Actions](https://github.com/features/actions) 是 GitHub 推出的一项解放双手、自动化开发流程的 CI/CD 服务。举个直观的例子，我们在浏览许多开源项目的时候，Git Commit 右边经常出现小红叉、小绿勾：

![https://docs.github.com/assets/images/help/pull_requests/commit-list-statuses.png](https://docs.github.com/assets/images/help/pull_requests/commit-list-statuses.png)

那么这个项目一定使用了 GitHub Actions (或其他 CI/CD 服务)。

这表明了很多项目对 GitHub Actions 的高度依赖，它在社区也是被高度认可的 👍。拿腾讯云开发来说，通过在项目中引入云开发 Action，即时便拥有了更优雅的自动化开发流程：

- 一体化：开发、代码审查、Issue、PR、构建、部署都不用离开 GitHub，使专注变为常态 :
- 一键部署 › 自动部署：使用或了解过 [CloudBase Framework](https://github.com/Tencent/cloudbase-framework) 的用户都知道一键部署这个非常方便的服务，再加上云开发 Action，每次代码变更 (`push` `pr` `star` ...) 就可触发一键部署，不再需要人工干预
- 对私密型数据更好的保护：密钥一经上传到 GitHub Secrets 之后，便不可能以任何形式明文查看该密钥，这比本地的 `.env` 安全地多 🔐

## 云开发 Action V1 的局限

我曾使用过 V1 版本来部署我的博客项目，十分方便，这也是我第一次上手云开发。随着对云开发的熟悉，回过头来也不难发现 V1 项目的局限：只支持静态部署并且缺乏维护，可能是兵哥 ([@binggg](https://github.com/binggg)) 很忙吧 🙉。

## 打破局限，拥抱 V2

发现了 V1 的局限，我尝试寻找一种解决方案，`cloudbase-manager-node` 是我的第一个尝试：

[TencentCloudBase/cloudbase-manager-node](https://github.com/TencentCloudBase/cloudbase-manager-node)

这也是 V1 的解决方案，它也支持很多对其它云开发项目的管理。幸运的是，[cloudbase-framework](https://github.com/Tencent/cloudbase-framework) 及时出现在我的脑中：

[Tencent/cloudbase-framework](https://github.com/Tencent/cloudbase-framework)

它是云开发官方出品的前后端一体化部署工具，并配有丰富的插件；使用一个简单的配置文件，并结合 [CloudBase CLI](https://github.com/TencentCloudBase/cloudbase-cli) 工具，即可一键部署。

有了 [cloudbase-framework](https://github.com/Tencent/cloudbase-framework) ，我们就可以避免在 Action 中的二次开发，相反，用一套更加成熟的部署方案来替代

## 开发 V2 的过程

此次 V2 的开发 GitHub Action 真的很简单，这都要感谢 [cloudbase-framework](https://github.com/Tencent/cloudbase-framework) 提供的一键部署能力。总结下来，把~~大象~~应用装进~~冰箱~~云开发只要三部：

```bash
npm install -g @cloudbase/cli
tcb login --apiKeyId "$SECRET_ID" --apiKey "$SECRET_KEY"
tcb framework deploy -e "$ENV_ID"
```

**安装 → 登录 → 部署，**就是如此简单！

由于此过程不包含任何代码上的逻辑，所以我们并没有使用任何编程语言来实现这些过程；经过考量，我们选择了执行这些命令最快的地方 — `SHELL` ，用 GitHub 文档的术语来说，它是一个 `composite run steps action` ，核心的功能实现后，剩下的就是体验上的优化：

- 输出的简化：剔除部署时输出的无用信息，减少无用日志的输出
- 步骤分组：我们将三个关键的步骤分为三组，并追踪并高亮正在执行的命令，让用户更清楚当前的状态
- 文档优化：利用一个简单的云函数部署，手把手教你配置 ( 就在下面，点它点它 👇 )

[TencentCloudBase/cloudbase-action](https://github.com/TencentCloudBase/cloudbase-action#tencent-cloudbase-github-action)

## 欢迎贡献

相信你看完此篇文章，对 V2 能有更清晰的认识，也更有信心来参与到本项目中来。本项目遵循 [All Contributors](https://allcontributors.org/docs/zh-cn/overview) 规范，任何形式的贡献都会被加入贡献者名单，欢迎你的贡献 💗

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
