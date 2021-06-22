​	

# CloudBase Framework Development Contribution Guide

## Become a Contributor

Thank you for your interest in becoming a CloudBase Framework community contributor!

You can choose the following ways to contribute:

- [Contribute a technical article](https://github.com/Tencent/cloudbase-framework/blob/master/community/posts/README.md)
- Contribute apply template
- Contribute code, submit Pull Request
- Response Bug，submit Issue
- Deliver technical speech at technical meeting

We will add you to[our list of contributors](https://github.com/Tencent/cloudbase-framework#contributors-）

## Overall Structure

Cloud Development CloudBase Framework is based on cloud development underlying resources and cloud development resource orchestration management, and it includes CLI tool layer, application framework layer, and CI/CD layer as a whole.

- The CLI layer is adapted to mainstream application frameworks, can be seamlessly integrated with one click, and provides functions such as development and one-click deployment
- The application framework layer provides SDKs and components for different languages and frameworks, while abstracting the underlying cloud resources
- The CI/CD layer can implement functions such as cloud deployment, code platform integration, grayscale release, and upgrade rollback

![](https://main.qcloudimg.com/raw/6cc6e73df6be8a1a402739bc37946187.png)

## Roadmap

![](https://main.qcloudimg.com/raw/258fe3cbd8f73f52ea64fb5880930604.png)

🚀 Indicates the function that has been implemented

| Milestone                                                    | Status |
| ------------------------------------------------------------ | ------ |
| The core functions of the framework support plug-in mechanism and adapt to Cloudbase CLI | 🚀      |
| Develop Website plugin to support the deployment of front-end static projects | 🚀      |
| Automatic detection of front-end frameworks (mainstream frameworks such as Vue/React) Use Website plugin | 🚀      |
| Develop Nuxt plugin to support Nuxt SSR project              | 🚀      |
| Develop Function plugin to support automatic deployment functions | 🚀      |
| Develop Node Api Plugin to support one-click deployment of Node applications | 🚀      |
| Plug-in supports compiling into SAM description              | 🚀      |
| Automatically detect that major Node frameworks such as Express/ KOA use the Node API Plugin | 🚀      |
| Cloud Development full stack framework support               |        |
| Node Api Plugin supports modeling and code generation        |        |
| Combine CI/CD functions of GitHub Action, Coding and other platforms |        |
| Support part of the back-end containerized construction, providing another option for service functional construction | 🚀      |
| Develop SAM Plugin to support SAM extension plug-ins, and the framework can introduce third-party SAM extensions (such as CMS) |        |
| Develop Flutter Plugin to support one-click deployment of Flutter's Dart backend | 🚀      |

## Development Script

### Local development

```
npm install 
npm run dev:all
```

### Local test

```
npm run link
# Use the native CloudBase Framework in the project
CLOUDBASE_FX_ENV=dev cloudbase framework deploy
```

### Perform a complete end-to-end deployment test

The following script will deploy the templates supported by CloudBase CLI one by one

```
# Note that $SecretId $SecretKey $EnvId needs to be replaced with a real value
cloudbase login --apiKeyId $SecretId --apiKey $SecretKey
CLOUDBASE_FX_ENV=dev envId=$EnvId node scripts/local-e2e.js
```

## Submit Code Specifications

Follow the [Angular submission information specification](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines) proposed by `Angular`

Please use `npm run commit` to submit the code, the submission format is as follows:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

Each submission can include header, body and footer, and each submission **must include header content**

The information submitted each time does not exceed `100` characters

Detailed documentation：[AngularJS Git Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#)

## Header Settings

The format of the header is specified as the submission type, scope (optional) and subject

### Type of submission

The submission type is specified as one of the following:

1. `build`：Modifications to the build system or external dependencies
2. `ci`：Modifications to CI configuration files or scripts
3. `docs`：Modifications to the document
4. `feat`：Add new features
5. `fix`：Fix `bug`
6. `pref`：Code changes to improve performance
7. `refactor`：Neither fixing bug nor feature adding code refactoring
8. `style`：Modifications that do not affect the meaning of the code, such as spaces, formatting, missing semicolons, etc.
9. `test`：Add actual tests or correct existing tests

### Scope

The scope can be any content that specifies where to submit changes

### Subject

The subject includes a concise description of this modification, with the following guidelines

1. Use imperative, present tense: "change" is not "changed"
2. Don't capitalize the first letter
3. Don't add a period at the end

## Text Settings

Similar to subject setting, use imperative and present tense

Should include the motivation for the modification and the comparison with the previous behavior

## Footer Settings

### Breaking changes

Incompatible modification refers to the modification of `API` or environment variables that are incompatible with the previous version in this submission.

All incompatible modifications must be mentioned in the footer as a breaking change block, starting with `BREAKING CHANGE:`, followed by a space or two newline characters. The rest of the information is the description of the modification, the reason for the modification, and the modification, annotation

```
BREAKING CHANGE: isolate scope bindings definition has changed and
    the inject option for the directive controller injection was removed.

    To migrate the code follow the example below:

    Before:

    ...
    ...

    After:

    ...
    ...

    The removed `inject` wasn't generaly useful for directives so there should be no code using it.
```

### Quoting the submitted question

If the purpose of this submission is to modify the `issue`, you need to quote the `issue` in the footer

Start with the keyword `Closes`, such as

```
Closes #234
```

If you modify multiple `bugs`, separate them with commas

```
Closes #123, #245, #992
```

## Roll Back Settings

When this submission includes a rollback (`revert`) operation, then the header starts with `"revert:"`, and at the same time add `"This reverts commit hash"` to the body, where the value of `hash` means before being rolled back's submission

```
revert:<type>(<scope>): <subject>
<BLANK LINE>
This reverts commit hash
<other-body>
<BLANK LINE>
<footer>
```

