import defaultConfig from "./default-config";
import { Config } from "../types";
import { detect } from "../detect-frameworks";
import inquirer from "inquirer";
import chalk from "chalk";
const chalkInstance = new chalk.Instance({
  level: 1,
});

export default async function resolveConfig(
  projectPath: string,
  config: Config | undefined
) {
  if (!config) {
    const framework = await detect(projectPath);

    if (framework) {
      const anwser = await inquirer.prompt({
        type: "confirm",
        name: "isModifyConfig",
        message: `检测到当前是 ${framework.name} 项目

${formatFrameworkConfig(framework.config)}

  是否需要修改默认配置`,
        default: false,
      });

      let inputs;

      if (anwser.isModifyConfig) {
        inputs = await modifyFrameworkConfig(framework.config);
      } else {
        inputs = Object.entries(framework.config).reduce(
          (prev: any, cur: any) => {
            prev[cur[0] as string] = cur.value;
            return prev;
          },
          {} as any
        );
      }

      return {
        name: framework.name,
        plugins: {
          [framework.key]: {
            use: framework.plugin,
            inputs,
          },
        },
      };
    }
  }

  return config;
}

function formatFrameworkConfig(config: any) {
  return Object.entries(config)
    .map(
      ([, config]) =>
        `  ${(config as any).desc} \`${chalkInstance.green(
          (config as any).value
        )}\``
    )
    .join("\n");
}

function modifyFrameworkConfig(frameworkConfig: any) {
  return inquirer.prompt(
    Object.entries(frameworkConfig).map(([, config]) => {
      return {
        type: "input",
        name: (config as any).desc,
        default: (config as any).value,
      };
    })
  );
}
