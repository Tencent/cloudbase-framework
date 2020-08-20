<a href="https://github.com/TencentCloudBase/cloudbase-templates"><img src="https://ugd.gtimg.com/next-ssr.png"></a>

# Next SSR 应用示例

这个目录是基于云开发的一个 [Next-SSR](https://nextjs.org/) 应用示例，包含 Next + 云函数 + 静态网站部署，可以基于 **[CloudBase Framework](https://github.com/TencentCloudBase/cloudbase-framework)** 框架将项目一键部署到云开发环境

## 部署一个 Next SSR 应用

### 步骤一. 准备工作

具体步骤请参照 [准备云开发环境和 CloudBase CLI 命令工具](https://github.com/TencentCloudBase/cloudbase-framework/blob/master/CLI_GUIDE.md)

### 步骤二. 初始化应用示例

在命令行执行

```
cloudbase init --tempate next-ssr
```

### 步骤三. 一键部署

进入到项目目录，在命令行执行

```
cloudbase framework:deploy
```

## 开发命令及配置

### 本地开发

```
npm run dev
```

### 上线部署

```
npm run deploy
```

### Lint

```
npm run lint
```

### CloudBase Framework 相关开发配置

查看 [CloudBase Framework 配置](https://github.com/TencentCloudBase/cloudbase-framework).

### Next 相关开发配置

查看 [Configuration Reference](https://nextjs.org/docs/api-reference/next.config.js/introduction).


