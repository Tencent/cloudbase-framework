# CloudBase CLI 命令行工具使用指南

## 1. 开通云开发环境

开发者可以根据下面的身份角色参考指引进行开通和创建。

- [微信小程序开发者](#wx-miniprogram)
- [腾讯云开发者](#tencent-cloud)
- [QQ 小程序开发者](#qq-miniprogram)

#### <span id="wx-miniprogram"></span>微信小程序开发者

##### 开通云开发环境

- 注册小程序账号：在微信公共平台进行申请并提交相应资料。[前往注册](https://mp.weixin.qq.com/)
- 下载微信开发者工具：简单高效地开发和调试小程序，并可预览和发布。 [前往下载](https://developers.weixin.qq.com/miniprogram/dev/devtools/nightly.html)
- 开通云开发：在开发者工具中点击“云开发” 按钮开通，开通后会自动开通环境

##### 切换按量计费

- 下载最新的[ Nightly Build 版本的微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/nightly.html), 登录微信开发者工具-云开发控制台

- 在【云开发控制台】-【设置】-【环境设置】-【支付方式】中点击切换【按量付费】即可。

注意：这里需要先保证腾讯云账户中是有充值金额的哦~

![](https://main.qcloudimg.com/raw/bc4f7048d2bf3e85e4adf46cc8f2cb1c.png)

#### <span id="tencent-cloud"></span>腾讯云开发者

##### 开通并创建按量付费环境

- 注册腾讯云账号，并完成实名认证

- 进入[云开发控制台](https://console.cloud.tencent.com/tcb)，授权开通云开发

- 点击进入控制台[创建按量计费环境](https://console.cloud.tencent.com/tcb/env/index?action=CreateEnv)（温馨提示，无资源消耗时，按量计费不产生任何费用）

##### 切换包年包月计费方式为按量计费

如果已经开通过云开发环境，需要在计费模式中切换计费方式为按量计费

- 登录腾讯云云开发控制台

- 在[云开发 CloudBase 控制台-环境-资源购买](https://console.cloud.tencent.com/tcb/env/resource) 中的【计费模式】中点击【切换按量付费】即可。

![](https://main.qcloudimg.com/raw/3d01c3ab51c8bc195c6ea8d435363ad5.jpg)

#### <span id="qq-miniprogram"></span>QQ 小程序开发者

##### 开通环境

在 QQ 小程序开发者工具工具栏左侧，点击 “云开发” 按钮即可打开云控制台、根据提示开通云开发、创建云环境

##### 切换为按量计费

- 在[云开发 CloudBase 控制台-环境-资源购买](https://console.cloud.tencent.com/tcb/env/resource) 中的【计费模式】中点击【切换按量付费】即可。

![](https://main.qcloudimg.com/raw/3d01c3ab51c8bc195c6ea8d435363ad5.jpg)



注：首次开通云开发环境后，需等待大约 3 分钟方可正常使用

## 2.下载安装云开发命令行工具

云开发官方提供命令行工具（CLI）：cloudbase/cli。可以使用 CLI 进行云开发资源管控、函数部署等。下面是安装过程：

**第 1 步：确保安装了 Node.js 和 npm**  
如果本机没有安装 Node.js , 建议从[ **Node.js 官网**](https://nodejs.org/zh-cn/)下载二进制文件直接安装，建议选择版本为 LTS。

**第 2 步：安装 cloudbase/cli**  
现在，可以使用 npm 来安装 cloudbase/cli 了，打开命令行终端，输入如下命令：

```bash
npm i -g @cloudbase/cli
```

**第 3 步：测试安装是否成功**<br />如果安装过程没有错误提示，一般就是安装成功了。下面，我们可以继续输入命令：

```bash
cloudbase -v
```

如果看到输出版本号，说明已经安装成功。

## 3. 登录云开发

在命令行输入命令

```bash
cloudbase login
```

在打开的浏览器页面内完成登录腾讯云控制台进行授权

登录方式请选择微信公众号登录，使用自己的小程序账号进行登录授权

![](https://main.qcloudimg.com/raw/f3b7cbdc3d8ca3f3c212203a4b84782a.png)

在登录完成后，在云开发授权页面点击授权
