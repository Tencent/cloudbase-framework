# 环境变量

CloudBase Framework 支持在配置文件 **cloudbaserc.json** 中声明环境变量 `envVariables`，该环境变量可以在应用的运行时中获取到。

目前 CloudBase Framework 所有插件均已支持 `envVariables` 字段，下面分别介绍在云函数、云托管、静态网站部署等插件中注入和读取环境变量的方法。

>

## Vue 应用模板（云函数 + 静态网站部署）

### 声明环境变量

在应用的 **cloudbaserc.json** 配置文件中声明环境变量 `envVariables`

```json
{
  "envId": "fx",
  "functionRoot": "cloudfunctions",
  "framework": {
    "name": "vue",
    "plugins": {
      "client": {
        "use": "@cloudbase/framework-plugin-website",
        "inputs": {
          "buildCommand": "npm run build",
          "outputPath": "dist",
          "cloudPath": "/vue",
          "envVariables": {
            "envId": "fx"
          }
        }
      },
      "server": {
        "use": "@cloudbase/framework-plugin-function",
        "inputs": {
          "functionRootPath": "cloudfunctions",
          "functions": [
            {
              "name": "vue-echo",
              "config": {
                "timeout": 5,
                "envVariables": {
                  "dbName": "user"
                },
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

### 读取环境变量

- 在云函数中通过 `process.env` 来获取环境变量
- 在静态文件中通过读取根目录下的 `/cloudbaseenv.json` 文件的内容来获取环境变量

## Node.js 云托管

### 声明环境变量

在应用的 **cloudbaserc.json** 配置文件中声明环境变量 `envVariables`

```json
{
  "envId": "fx",
  "framework": {
    "name": "node-capp",
    "plugins": {
      "node": {
        "use": "@cloudbase/framework-plugin-node",
        "inputs": {
          "name": "node-capp",
          "path": "/node-capp",
          "platform": "container",
          "envVariables": {
            "dbName": "user"
          }
        }
      }
    }
  }
}
```

### 读取环境变量

- 在云托管中通过 `process.env` 来获取环境变量
