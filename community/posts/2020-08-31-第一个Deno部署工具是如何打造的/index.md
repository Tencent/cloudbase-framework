---
title: 第一个Deno部署工具是如何打造的？
description: '近期试用了下 CloudBase Framework ，参与了一下 deno 插件的开发，没想到作为第一个 deno 部署工具被 justjavac 大神点赞了，开心~~ 撰文分享下开发感受。'
# github 用户名
authorIds:
  - TabSpace
href: https://cloudbase.net/community/share/articles/60173c665f44d8e900438bb57ee9d9f8.html
platforms:
  - Web
tags:
  - 云开发
  - Deno
  - ClouBase Framework
  - typescript
---

# CloudBase Framework + Deno + oak 云开发初体验

先上截图留念

![jc](https://main.qcloudimg.com/raw/0088a8c388c686417725944841a45030.jpg)

![cloudbase-framework-plugin-deno](https://camo.githubusercontent.com/a6491076185a1d84a24bb7d9c31bc41c27f23c81/68747470733a2f2f6d61696e2e71636c6f7564696d672e636f6d2f7261772f37303432393931316535336135363336366333396531316635353936653739302e6a7067)当 CloudBase Framework 正式推出后，一直觉得 deno 和云开发应该是绝配，所以尝试为其贡献了 deno 插件与模板，并调研感受了下 deno 开发过程。

相关产出：

- cloudbase-framework deno 插件 [framework-plugin-deno](https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-deno)
- [简易在线示例](https://test-1gxe3u9377a09734.service.tcloudbase.com/deno-app/)
- 简易在线示例代码 [deno 模板](https://github.com/TencentCloudBase/cloudbase-templates/tree/master/deno)

开始着手 deno 插件开发时，CloudBase Framework 插件开发的文档暂缺，不过好在其他插件代码清晰易懂，可以参考其他插件进行开发。

考虑到 deno 运行状态，应该就是需要打通容器部署环节，于是根据 CloudBase Framework 作者建议，参考了 [framework-plugin-node](https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-node) 和 [framework-plugin-dart](https://github.com/Tencent/cloudbase-framework/tree/master/packages/framework-plugin-dart) 两款插件的代码来进行开发。

整个 CloudBase Framework deno 插件开发，主要需要编写代码的文件就 3 个:

- [assets/Dockerfile](https://github.com/Tencent/cloudbase-framework/blob/master/packages/framework-plugin-deno/assets/Dockerfile)
- [src/index.ts](https://github.com/Tencent/cloudbase-framework/blob/master/packages/framework-plugin-deno/src/index.ts)
- [src/builder.ts](https://github.com/Tencent/cloudbase-framework/blob/master/packages/framework-plugin-deno/src/builder.ts)

## 调研基本示例

由于需要进行容器部署，所以在 dockerhub 找了个 docker image [aredwood/deno](https://hub.docker.com/r/aredwood/deno) 作为参考镜像进行改造。来编写 CloudBase Framework 插件所需 的 Dockerfile 。

为方便验证 Dockerfile 和 deno 应用如何整合，构建了一个简单项目来验证镜像构建流程：[deno-docker](https://github.com/TabSpace/deno-docker)

deno 生态有一个类似 node koa 的应用框架 [oak](https://github.com/oakserver/oak) 直接使用它的官方示例，存为一个 `entry.ts` ，很快就完成了本地示例的搭建。执行示例也非常简单 `deno run entry.ts`。

## 开发 CloudBase Framework 插件

接下来考虑如何部署的问题，开始开发 CloudBase Framework deno 插件，`src/index.ts` 主要需要提供一个插件类给 CloudBase Framework 命令行组件使用。这个类需要继承自 `@cloudbase/framework-core` 的 Plugin。

参考其他插件写法，Plugin 是抽象类，需要自行实现抽象类的各个方法。其中在 build 方法中，需要构建中间产物，主要是编译过后的 Dockerfile 和需要包装到镜像的文件，然后通过 `framework-plugin-container` 提供 docker container 构建产物。

```js
import { plugin as ContainerPlugin } from '@cloudbase/framework-plugin-container';
/*** code：other ***/
class DenoPlugin extends Plugin {
  /*** code: 初始化处理 ***/
  async build() {
    // 构建 deno 中间产物
    this.buildOutput = await this.denoBuilder.build(
      this.resolvedInputs.projectPath || '.',
      {
        /*** code: 给 buider 提供选项 ***/
      }
    );

    // 提供 containerPlugin 对象
    const container = this.buildOutput.containers[0];
    this.containerPlugin = new ContainerPlugin(
      'container',
      this.api,
      resolveInputs(
        { localAbsolutePath: container.source },
        this.resolvedInputs
      )
    );

    // 构建 container 最终产物
    await this.containerPlugin.build();
  }
  /*** code: other ***/
}
```

而 deploy 方法看来主要是在部署之后，提供最终部署结果的日志呈现。参考其他 2 个插件，大部分代码改动主要用来做配置项的处理和日志的区别，整体与其他插件相比，改动不大。

```js
class DenoPlugin extends Plugin {
  async deploy() {
    /*** code: 日志处理 ***/
    // 实际部署能力调用
    await this.containerPlugin.deploy();
    await this.denoBuilder.clean();
    /*** code: 日志处理 ***/
  }
}
```

在 `src/builder.ts` 中，主要扩展 Builder 类，提供中间产物构建方法。其中 build 方法，参考其他插件，给出容器构建所需的固定返回即可。

```js
import { Builder } from '@cloudbase/framework-core';
/*** code: other ***/
export class DenoBuilder extends Builder {
  /*** code: 初始化 ***/
  async build(localDir: string, options: BuilderBuildOptions) {
    /*** code: 选项处理，路径处理 ***/
    // 生成中间产物需要调用的方法
    await Promise.all([
      this.generator.generate(path.join(__dirname, '../assets'), appDir, spec),
      fs.copy(path.join(projectDir, localDir), appDir),
    ]);

    // 对于容器部署，是固定的返回
    return {
      containers: [
        {
          name: containerName,
          options: {},
          source: appDir,
        },
      ],
      routes: [
        {
          path: options.path,
          targetType: 'container',
          target: containerName,
        },
      ],
    };
  }
}
```

`this.generator.generate` 方法调用时，Dockerfile 会作为 [ejs](https://github.com/mde/ejs) 模板被进行编译，传递的选项将会作为编译参数。结合这个能力，可以实现 docker image 的精细配置。

## 本地部署调试

调试 CloudBase Framework deno 插件时，需参考 [cloudebase-framework 贡献指南](https://github.com/Tencent/cloudbase-framework/blob/master/CONTRIBUTING.md) 提供的本地调试流程。

本地需要部署的代码，需要提供一个 `cloudbaserc.json` 作为部署配置。如果是开发模板，需要配置属性 `"envId": "{{envId}}"`。`cloudbaserc.json` 参考 [CloudBase Framework 配置文档](https://docs.cloudbase.net/framework/config.html) 来配置属性。其中 inputs 属性将作为参数传递给插件。

以我个人模板调试为例，插件编写完毕后，需要在插件目录执行 `npm run build` 编译插件代码。然后在 cloudbase-framework 根目录执行 `npm run link` 实现插件的本地指向。最后在模板目录执行 `CLOUDBASE_FX_ENV=dev cloudbase framework deploy -e test-1gxe3u9377a09734` 来进行部署。

test-1gxe3u9377a09734 为我个人的 envId，将会替换 `cloudbaserc.json` 中的 "{{envId}}" 部分。

## deno 开发体验

### 开发

deno 可以直接运行 typescript，示例代码跑在开发模式，报错时可以直接看到清晰的调用栈，这弥补了 typescript 在 node 开发中的弊端。好感度 +1 !

### 部署

初次部署时经常碰到部署失败，经过沟通与调试，发现问题主要出在 docker image 编译和 app 应用执行环节中，由于网络环境问题，部分远程文件未能成功加载或者缓存。

再次审视 deno 项目介绍与说明，发现最佳实践是进行本地打包（或者 ci 打包）后提供无依赖的入口文件。

deno 提供了 `deno bundle` 命令，可以将代码打包为一个 js 文件来执行。然后找到 [denon](https://github.com/denosaurs/denon) 这个工具，直接解决了开发部署配置问题，其类似 `nodemon` 。舒服的是，包括 deno 应用的执行权限，环境变量，都可以在它的配置文件中配置。所以直接修改了 CloudBase Framework deno 插件，使用 denon 来提供启动应用能力。

使用先打包，后部署的方案后，云开发部署 deno 应用的成功率大幅上升。

### 依赖

值得一提的是，虽然示例应用简陋，但是依然能感受到 deno 打包执行流畅易用。好感度 +1！

脱离了 node_modules 这层设计，deno 内置的打包部署这方面的体验远超 node 开发。本地应用开发设计时，推荐使用固定版本的文件引用方式，这样可以避免依赖更新导致的应用 bug。

```ts
/* @see https://github.com/oakserver/oak/blob/main/application.ts */
import { reset } from 'https://deno.land/std@0.62.0/fmt/colors.ts';
```

### 模板引擎

在使用 [dejs](https://github.com/syumai/dejs) 模板时，发现示例中的 `cwd()` 不能使用。

```ts
(async () => {
  const output = await renderFile(`${cwd()}/views/main.ejs`);
  await copy(output, stdout);
})();
```

需要改为 `Deno.cwd()` ：

```ts
(async () => {
  const output = await renderFile(`${Deno.cwd()}/views/main.ejs`);
  await copy(output, stdout);
})();
```

而嵌套模板代码直接报错，只提示文件未找到，却并未给出更详细提示。

```ejs
<%- await include('views/header.ejs') %>
<h1>hello, world!</h1>
<%- await include('views/footer.ejs') %>
```

反复调试后发现，需改为：

```ejs
<%- await include(`${Deno.cwd()}/views/header.ejs`) %>
<h1>hello, world!</h1>
<%- await include(`${Deno.cwd()}/views/footer.ejs`) %>
```

### IO

在 deno 应用中，使用 fetch 方法获取远程资源时，该方法与浏览器规范实现一致，使用起来莫名亲切。由于 deno 默认直接读取了环境变量的 http_proxy，node 开发中碰到的内网代理配置问题，在 deno 开发中也不再存在。好感度 +1 ！

### 总结

联系到 deno 的愿景是设计一款服务端运行的浏览器，忽然有了一些大胆的想法，想来在 ssr，测试，web 资源编辑与创建方面，deno 未来可能会有一些独到的优势。总体来说，即便 deno 并非 node 的替代者，依靠其顺滑的开发部署体验，未来极有可能分走 node 相当一部分使用场景。而这个项目在 github 上的 start 数量，与社区参与人数的快速上涨，也证明其具有相当大的潜力。

![Deno is coming!](https://main.qcloudimg.com/raw/236ff94b42f9872c71057fd045ebf30d.jpg)

## 附录

参考资料

- [awesome-deno](https://github.com/denolib/awesome-deno)
- [awesome-deno-cn](https://github.com/olivewind/awesome-deno-cn)
- [Deno 运行时入门教程](https://www.ruanyifeng.com/blog/2020/01/deno-intro.html)
- [Deno 并不是下一代 Node.js](https://juejin.im/post/6844903616143179784)
- [了不起的 Deno 入门与实战](https://juejin.im/post/6844904162321252360)
- [通俗易懂的 Deno 入门教程](https://segmentfault.com/a/1190000023061419)
- [Deno 入门手册：附大量 TypeScript 代码实例](https://chinese.freecodecamp.org/news/the-deno-handbook-with-examples/)
