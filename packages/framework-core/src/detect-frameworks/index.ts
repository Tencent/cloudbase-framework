import frameworksInfo from "./frameworks";
import fs from "fs";
import { resolve } from "path";
import getLogger from "../logger";
import { ICloudBaseConfig } from "../types";

const logger = getLogger();

export async function detect(
  projectRootPath: string,
  projectConfig: ICloudBaseConfig | undefined
) {
  let frameworks: any = [];

  const finalFrameworksInfo = renderFrameworkConfig(frameworksInfo, {
    projectConfig,
  });

  for (const framework of finalFrameworksInfo) {
    for (const detect of framework.detect) {
      try {
        const { path, match } = detect;
        const content = await fs.promises.readFile(
          resolve(projectRootPath, path),
          "utf-8"
        );

        const matchedFramework = content.match(new RegExp(match));
        if (matchedFramework) {
          if (
            frameworks.findIndex(
              (item: any) => item.plugin === framework.plugin
            ) < 0
          ) {
            frameworks.push(framework);
          }
        }
      } catch (e) {
        logger.debug(e);
      }
    }
  }

  return frameworks;
}

function renderFrameworkConfig(frameworkConfig: any, data: any) {
  if (!frameworksInfo) return;

  return JSON.parse(
    JSON.stringify(frameworkConfig, (key: string, value) => {
      if (typeof value === "string" && value.includes("`")) {
        return new Function("data", "return " + value)(data);
      } else {
        return value;
      }
    })
  );
}
