import { ICloudBaseConfig } from "../types";
import { isObject } from "../utils/type-check";
import { detect } from "../detect-frameworks";
import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs";
import path from "path";
import { ConfigParser } from "@cloudbase/toolbox";

chalk.level = 1;

const FRAMEWORK_CONFIG_FILENAME = "cloudbase-framework.json";

export default async function resolveConfig(
  projectPath: string,
  config: ICloudBaseConfig | undefined
) {
  // 针对 cloudbaserc.js 等脚本文件，会创建一份单独的 json 配置文件
  const independentFrameworkConfig = await readFrameworkConfig(projectPath);

  let finalFrameworkConfig = independentFrameworkConfig || config?.framework;

  if (!finalFrameworkConfig) {
    const detectedFrameworks = await detect(projectPath, config);
    let plugins: any = {};

    if (detectedFrameworks.length) {
      for (let item of detectedFrameworks) {
        const answer = await promptModify(item);

        let inputs;

        if (answer.isModifyConfig) {
          inputs = await modifyFrameworkConfig(item.config);
        } else {
          inputs = {};
          if (isObject(item.config)) {
            inputs = Object.entries(item.config).reduce(
              (prev: any, cur: any) => {
                prev[cur[0] as string] = cur[1].value;
                return prev;
              },
              {} as any
            );
          }
        }
        plugins[item.key] = {
          use: item.plugin,
          inputs,
        };
      }
    }

    let name: string = path.basename(projectPath);

    const nameAnswer = await inquirer.prompt({
      type: "input",
      name: "name",
      message:
        "请输入应用唯一标识(支持大小写字母数字及连字符, 同一账号下不能相同)",
      default: name,
    });

    finalFrameworkConfig = {
      name: nameAnswer.name,
      plugins,
    };

    // 是否写入配置文件
    const answer = await promptWriteConfig();
    if (answer.isWriteConfig) {
      await writeConfig(projectPath, config, finalFrameworkConfig);
    }
  }

  // 应用 addon 等配置信息设置
  const extraData = await getExtraData();

  return { ...finalFrameworkConfig, ...extraData };
}

// 获取 addon 等额外配置
async function getExtraData() {
  let extraData = {};

  // 如果是云端构建，优先从环境变量中读取
  if (process.env.CLOUDBASE_CIID) {
    extraData = {
      repo: jsonParse(process.env.TCB_CODE_REPO),
      tags: jsonParse(process.env.TCB_TAGS),
      environment: jsonParse(process.env.TCB_ENVIRONMENT), // 环境变量
      network: jsonParse(process.env.TCB_NETWORK_CONFIG), // 网络配置
      addons: jsonParse(process.env.TCB_ADDON_CONFIG), // 云上关联的资源
    };
  }

  // @todo 如果远程存在配置，读取远程配置

  return extraData;
}

function jsonParse(str: string | undefined) {
  let json;
  try {
    json = str ? JSON.parse(str) : undefined;
  } catch (e) {
    throw new Error(`JSON 格式错误: ${str}`);
  }
  return json;
}

function promptModify(framework: any) {
  return inquirer.prompt({
    type: "confirm",
    name: "isModifyConfig",
    message: `检测到当前项目包含 ${framework.name} 项目

${formatFrameworkConfig(framework.config)}

  是否需要修改默认配置`,
    default: false,
  });
}

function promptWriteConfig() {
  return inquirer.prompt({
    type: "confirm",
    name: "isWriteConfig",
    message: `是否需要保存当前项目配置，保存配置之后下次不会再次询问`,
  });
}

function formatFrameworkConfig(config: any) {
  if (!isObject(config)) {
    return "";
  }
  return Object.entries(config)
    .map(
      ([, config]) =>
        `  ${(config as any).desc} \`${chalk.green((config as any).value)}\``
    )
    .join("\n");
}

function modifyFrameworkConfig(frameworkConfig: any = {}) {
  return inquirer.prompt(
    Object.entries(frameworkConfig).map(([name, config]) => {
      return {
        type: "input",
        name,
        message: (config as any).desc,
        default: (config as any).value,
      };
    })
  );
}

async function writeConfig(
  projectPath: string,
  config: any,
  frameworkConfig: any
) {
  const configJsonPath = path.join(projectPath, "cloudbaserc.json");

  if (fs.existsSync(configJsonPath)) {
    const parser = new ConfigParser({
      configPath: configJsonPath,
    });
    parser.update("framework", frameworkConfig);
  } else {
    fs.writeFileSync(
      path.join(projectPath, FRAMEWORK_CONFIG_FILENAME),
      JSON.stringify(frameworkConfig, null, 4)
    );
  }
}

function readFrameworkConfig(projectPath: string) {
  let config;
  try {
    config = JSON.parse(
      fs.readFileSync(path.join(projectPath, FRAMEWORK_CONFIG_FILENAME), "utf8")
    );
  } catch (e) {}
  return config;
}
