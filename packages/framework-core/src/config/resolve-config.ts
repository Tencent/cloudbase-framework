import { ICloudBaseConfig } from "../types";
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
  const independentFrameworkConfig = await readFrameworkConfig(projectPath);

  let finalFrameworkConfig = independentFrameworkConfig || config?.framework;

  if (!finalFrameworkConfig) {
    const deteactedFrameworks = await detect(projectPath, config);
    let plugins: any = {};

    if (deteactedFrameworks.length) {
      for (let item of deteactedFrameworks) {
        const anwser = await promptModify(item);

        let inputs;

        if (anwser.isModifyConfig) {
          inputs = await modifyFrameworkConfig(item.config);
        } else {
          inputs = Object.entries(item.config).reduce((prev: any, cur: any) => {
            prev[cur[0] as string] = cur[1].value;
            return prev;
          }, {} as any);
        }
        plugins[item.key] = {
          use: item.plugin,
          inputs,
        };
      }
    }

    finalFrameworkConfig = {
      plugins,
    };

    // 是否写入配置文件
    const anwser = await promptWriteConfig();
    if (anwser.isWriteConfig) {
      await writeConfig(projectPath, config, finalFrameworkConfig);
    }
  }

  return finalFrameworkConfig;
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
  return Object.entries(config)
    .map(
      ([, config]) =>
        `  ${(config as any).desc} \`${chalk.green((config as any).value)}\``
    )
    .join("\n");
}

function modifyFrameworkConfig(frameworkConfig: any) {
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

async function writeConfig(projectPath: string, config: any, frameworkConfig: any) {
  const configJsonPath = path.join(projectPath, "cloudbaserc.json");
  const configPath = path.join(projectPath, FRAMEWORK_CONFIG_FILENAME);

  frameworkConfig.name = `${Math.random().toString(36).slice(2)}`;
  if (fs.existsSync(configJsonPath)) {
    const parser = new ConfigParser({
      configPath: configJsonPath
    });
    parser.update('framework', frameworkConfig);
  } else {
    const parser = new ConfigParser({
      configPath: configPath
    });
    parser.update(frameworkConfig);
  }
}

async function readFrameworkConfig(projectPath: string) {
  const configPath = path.join(projectPath, FRAMEWORK_CONFIG_FILENAME);
  const parser = new ConfigParser({
    configPath: configPath
  });
  const config = await parser.get();
  return config;
}
