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
    const detectedFrameworks = await detect(projectPath, config);
    let plugins: any = {};

    if (detectedFrameworks.length) {
      for (let item of detectedFrameworks) {
        const answer = await promptModify(item);

        let inputs;

        if (answer.isModifyConfig) {
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
    const answer = await promptWriteConfig();
    if (answer.isWriteConfig) {
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

  frameworkConfig.name = `${Math.random().toString(36).slice(2)}`;
  if (fs.existsSync(configJsonPath)) {
    const parser = new ConfigParser({
      configPath: configJsonPath
    });
    parser.update('framework', frameworkConfig);
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
  } catch (e) { }
  return config;
}
