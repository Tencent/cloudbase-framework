import { IFrameworkPluginContainerInputs } from "@cloudbase/framework-plugin-container";

/**
 * 导出接口用于生成 JSON Schema 来进行智能提示
 */
export interface IFrameworkPluginNodeInputs {
  /**
   * Node 运行时版本
   *
   *
   *
   * @default "Nodejs10.15"
   */
  runtime?: "Nodejs10.15" | "Nodejs8.9";
  /**
   *
   *
   * Node 服务入口文件，相对于`projectPath`,需要导出 app 或者 server 的实例，同时也支持导出异步获取 app 的 `tcbGetApp` 方法，方法的返回值为 app 或者 server 的实例。
   *
   * 如 koa 服务的 `app.js`
   *
   * ```javascript
   * const Koa = require("koa");
   * const { router } = require("./routes/");
   *
   * const app = new Koa();
   *
   * app.use(router.routes());
   *
   * module.exports = app;
   * ```
   *
   * nest 服务的 `app.js`
   *
   * ```js
   * const express = require("express");
   * const { NestFactory } = require("@nestjs/core");
   * const { ExpressAdapter } = require("@nestjs/platform-express");
   * const { AppModule } = require("./dist/app.module");
   *
   * const expressApp = express();
   * const adapter = new ExpressAdapter(expressApp);
   *
   * exports.tcbGetApp = async () => {
   *   const app = await NestFactory.create(AppModule, adapter);
   *   await app.init();
   *   return expressApp;
   * };
   * ```
   * @default app.js
   *
   */
  entry?: string;
  /**
   * 访问子路径
   * @default /node-app
   */
  path: string;
  /**
   * 服务名，会生成同名云函数或者云应用
   * @default node-app
   */
  name: string;
  /**
   * 指定 Node 服务所在目录，相对于当前项目根目录
   * @default .
   */
  projectPath?: string;
  /**
   * 指定构建命令，比如`npm run build`
   */
  buildCommand?: string;
  /**
   * 底层使用平台，支持 `container`（ serverless 云应用） 和 `function` （云函数）
   * @default function
   */
  platform?: "function" | "container";
  /**
   *
   * 云应用自定义选项
   *
   * 选填，当 `platform` 选择 `container` 时，可以支持自定义更多高级设置，例如 CPU 内存等
   * 例如
   *
   * ```json
   * {
   *   "use": "@cloudbase/framework-plugin-node",
   *   "inputs": {
   *     "entry": "app.js",
   *     "path": "/nodeapp",
   *     "name": "nodeapp",
   *     "platform": "container",
   *     "containerOptions": {
   *       "cpu": 2,
   *       "mem": 2
   *     }
   *   }
   * }
   * ```
   *
   * 具体配置信息请参考 [@cloudbase/framework-plugin-container](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-container#cpu) 配置
   *
   *
   */
  containerOptions?: IFrameworkPluginContainerInputs;
  /**
   * 函数选项
   *
   * 选填，当 `platform` 选择 `function` 时，可以支持自定义更多高级设置，例如 VPC 环境变量等
   *
   * 例如
   *
   * ```json
   * {
   *   "use": "@cloudbase/framework-plugin-node",
   *   "inputs": {
   *     "entry": "app.js",
   *     "path": "/nodeapp",
   *     "name": "nodeapp",
   *     "platform": "function",
   *     "functionOptions": {
   *       "timeout": 5,
   *       "envVariables": {
   *         "TEST_ENV": 1
   *       },
   *       "vpc": {
   *         "vpcId": "xxx",
   *         "subnetId": "xxx"
   *       }
   *     }
   *   }
   * }
   * ```
   *
   * 具体配置信息请参考 [@cloudbase/framework-plugin-function](https://github.com/TencentCloudBase/cloudbase-framework/blob/master/packages/framework-plugin-function/README.md#functions) 配置
   */
  functionOptions?: any;
  /**
   * 当 `platform` 选择 `function` 时，可以支持自动为函数包上一层 express
   *
   * 例如
   *
   * ```json
   * {
   *   "envId": "fx",
   *   "framework": {
   *     "plugins": {
   *       "server": {
   *         "use": "@cloudbase/framework-plugin-node",
   *         "inputs": {
   *           "entry": "./api/index.js",
   *           "path": "/api",
   *           "name": "github-stats-api",
   *           "wrapExpress": true
   *         }
   *       },
   *       "pin": {
   *         "use": "@cloudbase/framework-plugin-node",
   *         "inputs": {
   *           "entry": "./api/pin.js",
   *           "path": "/api/pin",
   *           "name": "github-stats-pin",
   *           "wrapExpress": true
   *         }
   *       }
   *     }
   *   }
   * }
   * ```
   */
  wrapExpress?: boolean;
  installDeps: boolean;
}

export interface IFrameworkPluginWebsiteInputs {
  /**
   * 安装命令，如`npm install`，没有可不传
   *
   * @default npm install --prefer-offline --no-audit --progress=false
   */
  installCommand?: string;
  /**
   * 构建命令，如`npm run build`，没有可不传
   *
   */
  buildCommand?: string;
  /**
   * 网站静态文件的路径
   *
   * @default dist
   */
  outputPath?: string;
  /**
   * 静态资源部署到云开发环境的路径，默认为根目录。
   *
   * @default /
   */
  cloudPath?: string;
  /**
   * 静态资源部署时忽略的文件路径，支持通配符
   *
   * @default [".git", ".github", "node_modules", "cloudbaserc.js"]
   */
  ignore?: string[];
  /**
   * 环境变量键值对，会被注入到静态网站根目录下的 `/cloudbaseenv.json`
   *
   */
  envVariables?: Record<string, string>;
  /**
   * 执行 cloudbase framework:run 时，运行的默认指令
   */
  runCommand?: string;
}
