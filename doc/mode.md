# 模板变量 & 模式切换

配置文件 cloudbaserc.json 支持模板变量，并支持在多个模式中切换变量。

## 模板变量

* 第一步：在项目根目录下创建 **cloudbaserc.json** 和 **.env** 文件
```
.
├─cloudbaserc.json
├─.env

```
* 第二步：在 **.env** 文件内添加变量
```dotenv
ENV_ID=pro-123
```
* 第三步：在 **cloudbaserc.json** 文件内注入模板变量
```json
{
  "version": "2.0",
  "envId": "{{envId}}",
  "framework": {
    "name": "egg-starter",
    "plugins": {
      "node": {
        "use": "@cloudbase/framework-plugin-node",
        "inputs": {
          "entry": "app.js",
          "name": "egg-starter",
          "path": "/egg-starter"
        }
      }
    }
  }
}
```
> 注意：`version` 一定要大于 2.0 版本

* 第四步：一键部署应用
```sh
cloudbase framework:deploy
```

## 模式切换

* 假设你已经完成了以上**模板变量**的配置

* 第一步：在项目根目录额外添加 **.env.dev** 文件
```
.
├─cloudbaserc.json
├─.env
├─.env.dev
```
* 第二步：在 **.env.dev** 文件添加变量
```dotenv
ENV_ID=dev-123
```
* 第三步：部署应用时使用 `--mode` 指定模式
```sh
cloudbase framework:deploy --mode dev
```



