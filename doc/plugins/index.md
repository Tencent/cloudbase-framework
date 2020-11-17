# 插件

[CloudBase Framework](https://github.com/TencentCloudBase/cloudbase-framework) 支持插件机制，提供了多种应用框架和云资源的插件。

插件可以处理应用中的一些独立单元的构建、部署、开发、调试等流程。例如 website 插件可以处理静态网站等单元，node 插件可以处理 koa 、express 等 node 应用。

插件的配置写在 `cloudbaserc.json` 文件中，具体请参考配置说明中的 插件配置可以手动填写，也可以自动生成。

目前针对部分框架/语言支持自动识别生成配置。

## 自动检测生成插件配置

可以在项目目录下直接运行 `cloudbase` 命令进行自动检测生成插件配置文件并部署

```
cloudbase


✔ 是否使用云开发部署当前项目 <Projects/test/test-vue> ？ (Y/n) · true
✔ 选择关联环境 · webpage - [webpage:按量计费]
   ______ __                   __ ____
  / ____// /____   __  __ ____/ // __ ) ____ _ _____ ___
 / /    / // __ \ / / / // __  // __  |/ __ `// ___// _ \
/ /___ / // /_/ // /_/ // /_/ // /_/ // /_/ /(__  )/  __/
\_________\____/ \__,_/ \__,_//_____/ \__,_//____/ \___/       __
   / ____/_____ ____ _ ____ ___   ___  _      __ ____   _____ / /__
  / /_   / ___// __ `// __ `__ \ / _ \| | /| / // __ \ / ___// //_/
 / __/  / /   / /_/ // / / / / //  __/| |/ |/ // /_/ // /   / ,<
/_/    /_/    \__,_//_/ /_/ /_/ \___/ |__/|__/ \____//_/   /_/|_|


 CloudBase Framework  info     Version v1.2.10
 CloudBase Framework  info     Github: https://github.com/TencentCloudBase/cloudbase-framework

 CloudBase Framework  info     EnvId webpage
? 检测到当前项目包含 Vue.js 项目

  🔨 构建脚本 `npm run build`
  📦 本地静态文件目录 `dist`

  是否需要修改默认配置 No
? 请输入应用唯一标识(支持大小写字母数字及连字符, 同一账号下不能相同) test-vue
? 是否需要保存当前项目配置，保存配置之后下次不会再次询问 Yes
 CloudBase Framework  info     📦 install plugins
```

## 手动填写插件配置

可以查看 配置说明 和对应插件的文档来填写配置。

**示例**：

```json
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

## 官方插件列表

<!-- START mdmod {replace: plugins} -->

| 插件链接 | 插件 | 最新版本 | 插件介绍 |
| -------- | ---- | -------- | -------- |
| <a href="https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-website"><img width="200" src="https://main.qcloudimg.com/raw/abbc0f23ee92e8f4665ab316b6126d33.jpg"></a>  | [@cloudbase/framework-plugin-website](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-website) |[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-website)](https://www.npmjs.com/package/@cloudbase/framework-plugin-website) | 一键部署网站应用|
| <a href="https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-node"><img width="200" src="https://main.qcloudimg.com/raw/80526dcba2f27ed2619ac43b9b623d5a.jpg"></a>  | [@cloudbase/framework-plugin-node](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-node) |[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-node)](https://www.npmjs.com/package/@cloudbase/framework-plugin-node) | 一键部署 Node 应用（支持底层部署为函数或者 云托管）|
| <a href="https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-nuxt"><img width="200" src="https://main.qcloudimg.com/raw/6d48ab8bc29c38558cd258b28b14f94e.jpg"></a>  | [@cloudbase/framework-plugin-nuxt](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-nuxt) |[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-nuxt)](https://www.npmjs.com/package/@cloudbase/framework-plugin-nuxt) | 一键部署 Nuxt SSR 应用|
| <a href="https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-function"><img width="200" src="https://main.qcloudimg.com/raw/2cd529a816464f59684515f73b0a5622.jpg"></a>  | [@cloudbase/framework-plugin-function](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-function) |[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-function)](https://www.npmjs.com/package/@cloudbase/framework-plugin-function) | 一键部署函数资源|
| <a href="https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-container"><img width="200" src="https://main.qcloudimg.com/raw/7e5e467a45bdfb5f5f4cc2eb27ea71bb.jpg"></a>  | [@cloudbase/framework-plugin-container](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-container) |[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-container)](https://www.npmjs.com/package/@cloudbase/framework-plugin-container) | 一键部署云托管容器服务|
| <a href="https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-dart"><img width="200" src="https://main.qcloudimg.com/raw/fabde81e6232f0eccf4914721ee2a55c.jpg"></a>  | [@cloudbase/framework-plugin-dart](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-dart) |[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-dart)](https://www.npmjs.com/package/@cloudbase/framework-plugin-dart) | 一键部署 Dart 应用|
| <a href="https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-database"><img width="200" src="https://main.qcloudimg.com/raw/41a9bd0e62c638ab40cb8b8cba26696b.jpg"></a>  | [@cloudbase/framework-plugin-database](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-database) |[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-database)](https://www.npmjs.com/package/@cloudbase/framework-plugin-database) | 一键声明式部署云开发 NoSQL 云数据库|
| <a href="https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-deno"><img width="200" src="https://main.qcloudimg.com/raw/70429911e53a56366c39e11f5596e790.jpg"></a>  | [@cloudbase/framework-plugin-deno](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-deno) |[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-deno)](https://www.npmjs.com/package/@cloudbase/framework-plugin-deno) | 一键部署 Deno 应用|
| <a href="https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-next"><img width="200" src="https://main.qcloudimg.com/raw/484de9a30676fb6ede6078622eea0274.png"></a>  | [@cloudbase/framework-plugin-next](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-next) |[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-next)](https://www.npmjs.com/package/@cloudbase/framework-plugin-next) | 一键部署 Next SSR 应用|
| <a href="https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-mp"><img width="200" src="https://main.qcloudimg.com/raw/3de9cef4b6ac7c72f9519f13d063fc13.jpg"></a>  | [@cloudbase/framework-plugin-mp](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-mp) |[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-mp)](https://www.npmjs.com/package/@cloudbase/framework-plugin-mp) | 一键部署微信小程序应用|
| <a href="https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-auth"><img width="200" src="https://main.qcloudimg.com/raw/8f7534f7f3a3f3a8df2cf861040f6a8c.jpg"></a>  | [@cloudbase/framework-plugin-auth](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-auth) |[![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-auth)](https://www.npmjs.com/package/@cloudbase/framework-plugin-auth) | 一键设置登录配置|
<!-- 新增/删除/修改插件信息，请修改 community/plugins/index.json，然后执行 npm run build:markdown-->

<!-- END mdmod -->
