# CloudBase Framework

🚀 CloudBase Framework is a front-end and back-end integrated deployment tool officially produced by CloudBase

**No need to change the code, one-click hosting and deployment of the front and back ends, based on the Serverless architecture, accelerating access, flexible and free of operation and maintenance.**

[Official Website](https://cloudbase.net) / [Document](https://docs.cloudbase.net/) / [Community](https://cloudbase.net/community.html) / [Q&A](https://support.qq.com/products/148793)

[![Github License](https://img.shields.io/badge/license-Apache--2.0-blue)](/TencentCloudBase-cloudbase-framework/TencentCloudBase/cloudbase-framework/blob/master/LICENSE) [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-core)](https://www.npmjs.com/package/@cloudbase/framework-core) [![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/) [![download](https://img.shields.io/npm/dw/@cloudbase/cli)](https://www.npmjs.com/package/@cloudbase/cli) [![issue](https://img.shields.io/github/issues/TencentCloudBase/cloudbase-framework)](https://github.com/TencentCloudBase/cloudbase-framework/issues) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/TencentCloudBase/cloudbase-framework/pulls) [![](https://github.com/TencentCloudBase/cloudbase-framework/workflows/Baseline-Init/badge.svg)](https://github.com/TencentCloudBase/cloudbase-framework/actions?query=workflow%3ABaseline-Init) [![star](https://img.shields.io/github/stars/TencentCloudBase/cloudbase-framework?style=social)](https://github.com/TencentCloudBase/cloudbase-framework)

## Table of Contents

- [Quick Start](#quick-start)
- [Project Example](#examples)
- [Plugin](#plugins)
- [Configuration Example](#conf)
- [Overall Structure](#architect)
- [Roadmap](#roadmap)
- [Contribution Guide](#contribute)
- [License](#license)
- [Changelog](#changelog)
- [Online Group](#qq)

## Quick Start

1.  **Install CLI**

```bash
npm install -g @cloudbase/cli@latest
```

2.  **Login**

```bash
cloudbase login
```

3.  **Initialize an application**

```bash
cloudbase init
```

4.  **Deploy the application**

```bash
cloudbase framework deploy
```

**Deploy a project created by Vue CLI with one click**

![](https://6678-fx-1259727701.tcb.qcloud.la/ezgif-4-ee79409c8665.gif)

## Project Example

|                                                                                                                                                                                              | name                                     | Application example introduction                                     | Create project based on template                                                                                                                                                                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [![](https://main.qcloudimg.com/raw/9892a3212a49bdd65ba499f2da62ac23.png)](https://github.com/TencentCloudBase/cloudbase-templates/tree/master/vue)                                          | Vue application                          | Vue + cloud functions + static website deployment                    | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=github&tdl_site=0&appUrl=https%3A%2F%2Fgithub.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=vue&appName=vue)                         |
| [![](https://main.qcloudimg.com/raw/d94d993269048beb4827b2612ed53692.png)](https://github.com/TencentCloudBase/cloudbase-templates/tree/master/react-starter)                                | React application                        | React + cloud functions + static website deployment                  | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=github&tdl_site=0&appUrl=https%3A%2F%2Fgithub.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=react-starter&appName=react-starter)     |
| [![](https://main.qcloudimg.com/raw/d94d993269048beb4827b2612ed53692.png)](https://github.com/TencentCloudBase/cloudbase-templates/tree/master/react-demo)                                   | React full stack application             | React + cloud functions + static website deployment + cloud database | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=github&tdl_site=0&appUrl=https%3A%2F%2Fgithub.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=react-demo&appName=react-demo)           |
| [![](https://main.qcloudimg.com/raw/4a2bb546f6d59133976dccd1ac962378.png)](https://github.com/TencentCloudBase/cloudbase-templates/tree/master/nuxt-spa)                                     | Nuxt SPA application                     | Nuxt SPA + cloud function + static website deployment                | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=github&tdl_site=0&appUrl=https%3A%2F%2Fgithub.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=nuxt-spa&appName=nuxt-spa)               |
| [![](https://main.qcloudimg.com/raw/338ce75aaf22e407a02d8b5f096212d0.png)](https://github.com/TencentCloudBase/cloudbase-templates/tree/master/nuxt-ssr)                                     | Nuxt SSR application                     | Nuxt SSR + server deployment + static website deployment             | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=github&tdl_site=0&appUrl=https%3A%2F%2Fgithub.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=nuxt-ssr&appName=nuxt-ssr)               |
| [![](https://main.qcloudimg.com/raw/bc7e3f2989fcf65b2fe8ad37ea3f69a9.png)](https://github.com/TencentCloudBase/cloudbase-templates/tree/master/koa-starter)                                  | Koa application                          | Koa + server deployment                                              | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=github&tdl_site=0&appUrl=https%3A%2F%2Fgithub.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=koa-starter&appName=koa-starter)         |
| [![](https://main.qcloudimg.com/raw/ce7fa0617399ac5e7f7bdbef5efb29d9.png)](https://github.com/TencentCloudBase/cloudbase-templates/tree/master/express-starter)                              | Express app                              | Express + server deployment                                          | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=github&tdl_site=0&appUrl=https%3A%2F%2Fgithub.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=express-starter&appName=express-starter) |
| [![](https://main.qcloudimg.com/raw/79fdd61df8b2154ccaa479301fcc57a6.png)](https://github.com/TencentCloudBase/cloudbase-templates/tree/master/nest-starter)                                 | Nest app                                 | Nest + server deployment                                             | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=github&tdl_site=0&appUrl=https%3A%2F%2Fgithub.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=nest-starter&appName=nest-starter)       |
| [![](https://main.qcloudimg.com/raw/9b26c345d8180b1003954d5a7b28f41f.png)](https://github.com/TencentCloudBase/cloudbase-templates/tree/master/egg-starter)                                  | Egg application                          | Egg + server deployment                                              | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=github&tdl_site=0&appUrl=https%3A%2F%2Fgithub.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=egg-starter&appName=egg-starter)         |
| [![](https://main.qcloudimg.com/raw/7b50431d8cef29d9ebb82c4ff2e6032c.png)](https://github.com/TencentCloudBase/cloudbase-templates/tree/master/node-starter)                                 | Node.js cloud function example           | Node.js cloud function                                               | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=github&tdl_site=0&appUrl=https%3A%2F%2Fgithub.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=node-starter&appName=node-starter)       |
| [![](https://main.qcloudimg.com/raw/63782b30178cf5666fdd1e15501aba9b.png)](https://github.com/TencentCloudBase/cloudbase-templates/tree/master/php-starter)                                  | PHP cloud function example               | PHP cloud functions                                                  | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=github&tdl_site=0&appUrl=https%3A%2F%2Fgithub.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=php-starter&appName=php-starter)         |
| [![](https://main.qcloudimg.com/raw/20510a20be999a59458204afcf0fe205.png)](https://github.com/TencentCloudBase/cloudbase-templates/tree/master/java-starter)                                 | Java cloud function example              | Java cloud functions                                                 | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=github&tdl_site=0&appUrl=https%3A%2F%2Fgithub.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=java-starter&appName=java-starter)       |
| [![](https://main.qcloudimg.com/raw/230c115bee4300384fa557710daa2928.jpg)](https://github.com/TencentCloudBase/cloudbase-templates/tree/master/vuepress)                                     | VuePresss website application            | VuePresss + static website deployment                                | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=github&tdl_site=0&appUrl=https%3A%2F%2Fgithub.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=vuepress&appName=vuepress)               |
| [![](https://main.qcloudimg.com/raw/82da2591cd2aed610d7f91f9dd881930.png)](https://github.com/TencentCloudBase/cloudbase-templates/tree/master/node)                                         | Node.js cloud application                | Node.js + Serverless cloud application deployment                    | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=github&tdl_site=0&appUrl=https%3A%2F%2Fgithub.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=node&appName=node)                       |
| [![](https://main.qcloudimg.com/raw/2d1c438165480b9a7937e3b81c4873e3.jpg)](https://github.com/TencentCloudBase/cloudbase-templates/tree/master/dart)                                         | Aqueduct (Dart Server) cloud application | Aqueduct (Dart Server) + Serverless cloud application deployment     | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=github&tdl_site=0&appUrl=https%3A%2F%2Fgithub.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=dart&appName=dart)                       |
| [![](https://user-images.githubusercontent.com/11473889/88882843-4f2b7780-d265-11ea-8fcf-49cb297240c7.png)](https://github.com/TencentCloudBase/cloudbase-templates/tree/master/omi-starter) | Omi application                          | Omi + cloud function + static website deployment                     | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=github&tdl_site=0&appUrl=https%3A%2F%2Fgithub.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=omi-starter&appName=omi-starter)         |
| [![](https://main.qcloudimg.com/raw/721bfc09d7e0a2ccd49b40ac6287f8ac.png)](https://github.com/TencentCloudBase/cloudbase-templates/tree/master/uni-app-starter)                              | uni-app application                      | uni-app + cloud function + static website deployment                 | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=github&tdl_site=0&appUrl=https%3A%2F%2Fgithub.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=uni-app-starter&appName=uni-app-starter) |
| [![](https://main.qcloudimg.com/raw/918830a5ad3321fd0524eaef4c0e4c1e.png)](https://github.com/TencentCloudBase/cloudbase-templates/tree/master/next-ssr)                                     | Next SSR application                     | Next SSR + server deployment + static website deployment             | [![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=github&tdl_site=0&appUrl=https%3A%2F%2Fgithub.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=next-ssr&appName=next-ssr)               |

## Template

Cloud Development CloudBase Framework supports template projects and provides template projects in multiple languages and frameworks. You can create an out-of-the-box project with just one command, and integrate the workflow of development, construction, and deployment.

The template can be customized freely. You can create a template project in any language and framework according to your needs, and generate your initial project with one click through the template project. The original project can be easily transformed into a cloudbase template project. You only need to create one cloudbaserc.json, fill in the necessary configuration.

For more template related introduction, you can click [to go](https://github.com/TencentCloudBase/cloudbase-framework/blob/master/doc/template.md)

## Plugin

Cloud Development CloudBase Framework supports a plug-in mechanism and provides plug-ins for a variety of application frameworks and cloud resources. It only requires very little configuration or even zero configuration to integrate existing applications and cloud development CloudBase Framework framework.

The plug-in can handle the process of construction, deployment, development, and debugging of some independent units in the application. For example, the website plug-in can handle units such as static websites, and the node plug-in can handle node applications such as koa and express. Plug-ins can be used in combination.

The configuration of the plug-in is written in the cloudbaserc file. Currently, only JSON files are supported, and YAML will be supported in the future.

The configuration of the plug-in can be filled in manually or automatically generated. Currently, the front-end framework supports automatic identification and filling of plug-ins.

### Automatic detection and generation plug-in configuration process

- `cloudbase init --without-template` generates project configuration·

- `cloudbase framework deploy` automatically detects and generates plug-in configuration files and deploys

### List of currently supported plugins

|                                                                                                                                                                                     | Plug-in                                                                                                            | The latest version                                                                                                                                        | Plug-in introduction                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| [![](https://main.qcloudimg.com/raw/abbc0f23ee92e8f4665ab316b6126d33.jpg)](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-website)   | [@cloudbase/framework-plugin-website](/TencentCloudBase-cloudbase-framework/packages/framework-plugin-website)     | [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-website)](https://www.npmjs.com/package/@cloudbase/framework-plugin-website)     | One-click deployment of website applications                                                                            |
| [![](https://main.qcloudimg.com/raw/80526dcba2f27ed2619ac43b9b623d5a.jpg)](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-node)      | [@cloudbase/framework-plugin-node](/TencentCloudBase-cloudbase-framework/packages/framework-plugin-node)           | [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-node)](https://www.npmjs.com/package/@cloudbase/framework-plugin-node)           | One-click deployment of Node applications (supports low-level deployment as functions or serverless cloud applications) |
| [![](https://main.qcloudimg.com/raw/6d48ab8bc29c38558cd258b28b14f94e.jpg)](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-nuxt)      | [@cloudbase/framework-plugin-nuxt](/TencentCloudBase-cloudbase-framework/packages/framework-plugin-nuxt)           | [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-nuxt)](https://www.npmjs.com/package/@cloudbase/framework-plugin-nuxt)           | One-click deployment of Nuxt SSR application                                                                            |
| [![](https://main.qcloudimg.com/raw/2cd529a816464f59684515f73b0a5622.jpg)](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-function)  | [@cloudbase/framework-plugin-function](/TencentCloudBase-cloudbase-framework/packages/framework-plugin-function)   | [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-nuxt)](https://www.npmjs.com/package/@cloudbase/framework-plugin-function)       | One-click deployment function resources                                                                                 |
| [![](https://main.qcloudimg.com/raw/7e5e467a45bdfb5f5f4cc2eb27ea71bb.jpg)](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-container) | [@cloudbase/framework-plugin-container](/TencentCloudBase-cloudbase-framework/packages/framework-plugin-container) | [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-container)](https://www.npmjs.com/package/@cloudbase/framework-plugin-container) | One-click deployment of cloud application container services                                                            |
| [![](https://main.qcloudimg.com/raw/fabde81e6232f0eccf4914721ee2a55c.jpg)](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-dart)      | [@cloudbase/framework-plugin-dart](/TencentCloudBase-cloudbase-framework/packages/framework-plugin-dart)           | [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-dart)](https://www.npmjs.com/package/@cloudbase/framework-plugin-dart)           | One-click deployment of Dart cloud applications                                                                         |
| [![](https://main.qcloudimg.com/raw/41a9bd0e62c638ab40cb8b8cba26696b.jpg)](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-database)  | [@cloudbase/framework-plugin-database](/TencentCloudBase-cloudbase-framework/packages/framework-plugin-database)   | [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-database)](https://www.npmjs.com/package/@cloudbase/framework-plugin-database)   | One-click declarative deployment cloud development NoSQL cloud database                                                 |
| [![](https://main.qcloudimg.com/raw/484de9a30676fb6ede6078622eea0274.png)](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-next)      | [@cloudbase/framework-plugin-next](/TencentCloudBase-cloudbase-framework/packages/framework-plugin-next)           | [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-next)](https://www.npmjs.com/package/@cloudbase/framework-plugin-next)           | One-click deployment of Next SSR application                                                                            |
| [![](https://main.qcloudimg.com/raw/3de9cef4b6ac7c72f9519f13d063fc13.jpg)](https://github.com/TencentCloudBase/cloudbase-framework/tree/master/packages/framework-plugin-mp)        | [@cloudbase/framework-plugin-mp](/TencentCloudBase-cloudbase-framework/packages/framework-plugin-mp)               | [![Npm version](https://img.shields.io/npm/v/@cloudbase/framework-plugin-mp)](https://www.npmjs.com/package/@cloudbase/framework-plugin-mp)               | One-click deployment of Wechat MiniProgram                                                                              |

## Configuration example

For example, a Vue full-stack project, including website front-end and cloud functions

You can manually create a `cloudbaserc.json` under the project, fill in the following configuration file, and call `cloudbase framework deploy` for deployment

Or run directly

- `cloudbase init --without-template`

- `cloudbase framework deploy` for automatic detection and deployment

```json
{
  "envId": "{{envId}}",
  "framework": {
    "plugins": {
      "client": {
        "use": "@cloudbase/framework-plugin-website",
        "inputs": {
          "buildCommand": "npm run build",
          "outputPath": "dist"
        }
      },
      "server": {
        "use": "@cloudbase/framework-plugin-function",
        "inputs": {
          "functionRootPath": "cloudfunctions",
          "functions": [
            {
              "name": "helloworld",
              "config": {
                "timeout": 5,
                "envVariables": {},
                "runtime": "Nodejs10.15",
                "memorySize": 128
              }
            }
          ]
        }
      }
    }
  }
}
```

For more detailed configuration parameter descriptions, you can view the configuration documentation, click [Go](https://docs.cloudbase.net/framework/config.html)

## Overall Structure

Cloud Development CloudBase Framework is based on cloud development underlying resources and cloud development resource orchestration management, and it includes CLI tool layer, application framework layer and CI/CD layer as a whole.

- The CLI layer is adapted to mainstream application frameworks, can be seamlessly integrated with one click, and provides functions such as development and one-click deployment
- The application framework layer provides SDKs and components for different languages and frameworks, while abstracting the underlying cloud resources
- The CI/CD layer can implement functions such as cloud deployment, code platform integration, gray release, and upgrade rollback

## Roadmap

🚀 Indicates the function that has been implemented

| milestone                                                                                                                  | status |
| -------------------------------------------------------------------------------------------------------------------------- | ------ |
| The core functions of the framework support plug-in mechanism and adapt to Cloudbase CLI                                   | 🚀     |
| Develop Website plugin to support the deployment of front-end static projects                                              | 🚀     |
| Automatic detection of front-end frameworks (mainstream frameworks such as Vue/React) Use Website plugin                   | 🚀     |
| Develop Nuxt plugin to support Nuxt SSR project                                                                            | 🚀     |
| Develop Function plugin to support automatic function deployment                                                           | 🚀     |
| Develop Node Api Plugin to support one-click deployment of Node applications                                               | 🚀     |
| Plug-in supports compiling into SAM description                                                                            | 🚀     |
| Automatically detect Express/ Koa and other mainstream Node frameworks using Node Api Plugin                               |        |
| Cloud development full stack framework support                                                                             |        |
| Node Api Plugin supports modeling and code generation                                                                      |        |
| Combine the CI/CD functions of Github Action, Coding and other platforms                                                   |        |
| Support part of the back-end containerized construction, providing another option for service functional construction      | 🚀     |
| Develop SAM Plugin to support SAM extension plug-ins, the framework can introduce third-party SAM extensions (such as CMS) |        |
| Develop Flutter Plugin to support one-click deployment of Flutter's Dart backend                                           | 🚀     |

## Contribution Guide

Welcome everyone to participate in the development of CloudBase Framework and contribute

Please refer to the development of the contribution of [Development Contribution Guidelines](https://github.com/TencentCloudBase/cloudbase-framework/blob/master/CONTRIBUTING.md) document

## Changelog

Please refer to the [changelog](https://github.com/TencentCloudBase/cloudbase-framework/blob/master/CHANGELOG.md) file for the version change log of CloudBase Framework

## License

For open source agreement documents, please refer to [Apache License 2.0](https://github.com/TencentCloudBase/cloudbase-framework/blob/master/LICENSE)

## <a name="qq"></a> Online Group

<table>
  <tr>
   <td>
      Wechat Group
      <br>
      <img src="https://main.qcloudimg.com/raw/59a8ddf87b7423c6a56058534bc3fd90.png" width="100px;" alt=""/>
    </td>
    <td>
      QQ Group
      <br>
      <img src="https://main.qcloudimg.com/raw/52e3e5062e01cc9058689138c9e8f02f.jpg" width="100px;" alt=""/>
    </td>
  </tr>
</table>

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-15-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://bookerzhao.com"><img src="https://avatars2.githubusercontent.com/u/7686861?v=4" width="100px;" alt=""/><br /><sub><b>Booker Zhao</b></sub></a><br /><a href="#infra-binggg" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=binggg" title="Tests">⚠️</a> <a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=binggg" title="Code">💻</a> <a href="#plugin-binggg" title="Plugin/utility libraries">🔌</a></td>
    <td align="center"><a href="https://twitter.com/_WeijiaWang_"><img src="https://avatars0.githubusercontent.com/u/10933333?v=4" width="100px;" alt=""/><br /><sub><b>Weijia Wang</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=starkwang" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/chhpt"><img src="https://avatars2.githubusercontent.com/u/19288423?v=4" width="100px;" alt=""/><br /><sub><b>hengechang</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=chhpt" title="Code">💻</a> <a href="#infra-chhpt" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="https://github.com/lt5c"><img src="https://avatars0.githubusercontent.com/u/9676050?v=4" width="100px;" alt=""/><br /><sub><b>Zijie Zhou</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=lt5c" title="Code">💻</a> <a href="#plugin-lt5c" title="Plugin/utility libraries">🔌</a> <a href="#talk-lt5c" title="Talks">📢</a></td>
    <td align="center"><a href="http://www.qinmudi.cn/"><img src="https://avatars1.githubusercontent.com/u/2224413?v=4" width="100px;" alt=""/><br /><sub><b>erikqin</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=qinmudi" title="Code">💻</a> <a href="#maintenance-qinmudi" title="Maintenance">🚧</a> <a href="#example-qinmudi" title="Examples">💡</a></td>
    <td align="center"><a href="https://www.xiaoxili.com/"><img src="https://avatars3.githubusercontent.com/u/6348297?v=4" width="100px;" alt=""/><br /><sub><b>Hanqin</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/issues?q=author%3Ashenghanqin" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/zemzheng"><img src="https://avatars3.githubusercontent.com/u/650956?v=4" width="100px;" alt=""/><br /><sub><b>Zem</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=zemzheng" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/magentaqin"><img src="https://avatars0.githubusercontent.com/u/30370223?v=4" width="100px;" alt=""/><br /><sub><b>magenta</b></sub></a><br /><a href="#blog-magentaqin" title="Blogposts">📝</a> <a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=magentaqin" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/SmartCodeDavid"><img src="https://avatars0.githubusercontent.com/u/30002112?v=4" width="100px;" alt=""/><br /><sub><b>TIANXIANG LAN</b></sub></a><br /><a href="#content-SmartCodeDavid" title="Content">🖋</a></td>
    <td align="center"><a href="https://github.com/fanyegong"><img src="https://avatars0.githubusercontent.com/u/12660343?v=4" width="100px;" alt=""/><br /><sub><b>liyuanfeng</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=fanyegong" title="Code">💻</a></td>
    <td align="center"><a href="https://www.ixiqin.com/"><img src="https://avatars1.githubusercontent.com/u/13283837?v=4" width="100px;" alt=""/><br /><sub><b>白宦成</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=bestony" title="Code">💻</a></td>
    <td align="center"><a href="https://yiliang.site"><img src="https://avatars0.githubusercontent.com/u/11473889?v=4" width="100px;" alt=""/><br /><sub><b>易良</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=yiliang114" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/shryzhang"><img src="https://avatars1.githubusercontent.com/u/18062954?v=4" width="100px;" alt=""/><br /><sub><b>Sherry Zhang</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=shryzhang" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Realybig"><img src="https://avatars3.githubusercontent.com/u/10878451?v=4" width="100px;" alt=""/><br /><sub><b>RealyBig</b></sub></a><br /><a href="https://github.com/TencentCloudBase/cloudbase-framework/commits?author=Realybig" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://evecalm.com"><img src="https://avatars2.githubusercontent.com/u/1655294?v=4" width="100px;" alt=""/><br /><sub><b>Saiya</b></sub></a><br /><a href="#talk-oe" title="Talks">📢</a> <a href="https://github.com/TencentCloudBase/cloudbase-framework/issues?q=author%3Aoe" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
