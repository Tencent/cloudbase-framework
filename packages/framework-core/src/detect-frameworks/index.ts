import frameworksInfo from "./frameworks";
import fs from "fs";
import { resolve } from "path";
import getLogger from "../logger";

const logger = getLogger();

export async function detect(projectRootPath: string) {
  let frameworks: any = [];
  for (const framework of frameworksInfo) {
    for (const { path, match } of framework.detect) {
      try {
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
