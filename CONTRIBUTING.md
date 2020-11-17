# CloudBase Framework 开发贡献指南

## 成为贡献者

感谢您有兴趣成为 CloudBase Framework 社区贡献者！

您可以选择如下的贡献方式：

- [贡献一篇技术文章](./community/posts/README.md)
- [贡献应用模板](./doc/app.md)
- 贡献代码，提交 Pull Request
- 反馈 bug，提交 Issue
- 在技术会议上发表技术演讲

我们会将您加入[我们的贡献者名单](https://github.com/TencentCloudBase/cloudbase-framework#contributors-）

## 整体架构

云开发 CloudBase Framework 基于云开发底层资源和云开发资源编排管理，整体包含 CLI 工具层、应用框架层和 CI/CD 层。

- CLI 层针对主流应用框架进行了适配，可以一键无缝集成，并提供开发、一键部署等功能
- 应用框架层提供了针对不同语言和框架的 SDK 和组件，同时对底层云资源进行抽象
- CI/CD 层可以实现云端部署、代码平台集成、灰度发布和升级回滚等功能

![](https://main.qcloudimg.com/raw/e7c525c09ce3197996924a2b70ac0c87.png)

## Roadmap

![](https://main.qcloudimg.com/raw/7fcf4e7822f89fc3807ccc68424e6fe5.png)

🚀 表示已经实现的功能

| 里程碑                                                                 | 状态 |
| ---------------------------------------------------------------------- | ---- |
| 框架核心功能支持插件机制，适配 Cloudbase CLI                           | 🚀   |
| 开发 Website plugin 支持部署前端静态项目                               | 🚀   |
| 自动检测前端框架 (Vue/React 等主流框架) 使用 Website plugin            | 🚀   |
| 开发 Nuxt plugin 支持 Nuxt SSR 项目                                    | 🚀   |
| 开发 Function plugin 支持自动部署函数                                  | 🚀   |
| 开发 Node Api Plugin 支持一键部署 Node 应用                            | 🚀   |
| 插件支持编译成 SAM 描述                                                | 🚀   |
| 自动检测 Express/ Koa 等主流 Node 框架使用 Node Api Plugin             | 🚀   |
| 云开发全栈框架支持                                                     |      |
| Node Api Plugin 支持建模和代码生成                                     |      |
| 结合 Github Action、Coding 等平台的 CI/CD 功能                         |      |
| 支持后端部分容器化构建，提供服务函数化构建的另一个选项                 | 🚀   |
| 开发 SAM Plugin 支持 SAM 扩展插件，框架可引入第三方 SAM 扩展（如 CMS） |      |
| 开发 Flutter Plugin 支持 Flutter 的 Dart 后端一键部署                  | 🚀   |

## 开发脚本

### 本地开发

```bash
npm run dev:all
```

### 本地测试

```bash
npm run link
# 在项目中使用本地 CloudBase Framework
CLOUDBASE_FX_ENV=dev cloudbase framework deploy
```

### 执行完整端到端部署测试

下面的脚本会将 CloudBase CLI 支持的模板逐一进行部署

```bash
# 注意 $SecretId $SecretKey $EnvId 需要换成真实的值
cloudbase login --apiKeyId $SecretId --apiKey $SecretKey
CLOUDBASE_FX_ENV=dev envId=$EnvId node scripts/local-e2e.js
```

## 提交代码规范

遵循`Angular`提出的[Angular 提交信息规范](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)

请使用 `npm run commit` 进行提交代码，提交格式如下：

    <type>(<scope>): <subject>
    <BLANK LINE>
    <body>
    <BLANK LINE>
    <footer>

每次提交可以包含页眉(`header`)、正文(`body`)和页脚(`footer`)，每次提交**必须包含页眉内容**

每次提交的信息不超过`100`个字符

详细文档：[AngularJS Git Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#)

## 页眉设置

页眉的格式指定为提交类型(`type`)、作用域(`scope`，可选)和主题(`subject`)

### 提交类型

提交类型指定为下面其中一个：

1. `build`：对构建系统或者外部依赖项进行了修改
2. `ci`：对 CI 配置文件或脚本进行了修改
3. `docs`：对文档进行了修改
4. `feat`：增加新的特征
5. `fix`：修复`bug`
6. `pref`：提高性能的代码更改
7. `refactor`：既不是修复`bug`也不是添加特征的代码重构
8. `style`：不影响代码含义的修改，比如空格、格式化、缺失的分号等
9. `test`：增加确实的测试或者矫正已存在的测试

### 作用域

范围可以是任何指定提交更改位置的内容

### 主题

主题包括了对本次修改的简洁描述，有以下准则

1. 使用命令式，现在时态：“改变”不是“已改变”也不是“改变了”
2. 不要大写首字母
3. 不在末尾添加句号

## 正文设置

和主题设置类似，使用命令式、现在时态

应该包含修改的动机以及和之前行为的对比

## 页脚设置

### Breaking changes

不兼容修改指的是本次提交修改了不兼容之前版本的`API`或者环境变量

所有不兼容修改都必须在页脚中作为中断更改块提到，以`BREAKING CHANGE`:开头，后跟一个空格或者两个换行符，其余的信息就是对此次修改的描述，修改的理由和修改注释

    BREAKING CHANGE: isolate scope bindings definition has changed and
        the inject option for the directive controller injection was removed.

        To migrate the code follow the example below:

        Before:

        。。。
        。。。

        After:

        。。。
        。。。

        The removed `inject` wasn't generaly useful for directives so there should be no code using it.

### 引用提交的问题

如果本次提交目的是修改`issue`的话，需要在页脚引用该`issue`

以关键字`Closes`开头，比如

    Closes #234

如果修改了多个`bug`，以逗号隔开

    Closes #123, #245, #992

## 回滚设置

当此次提交包含回滚(`revert`)操作，那么页眉以`"revert:"`开头，同时在正文中添加`"This reverts commit hash"`，其中`hash`值表示被回滚前的提交

    revert:<type>(<scope>): <subject>
    <BLANK LINE>
    This reverts commit hash
    <other-body>
    <BLANK LINE>
    <footer>
