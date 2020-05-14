import frameworksInfo from "./frameworks";
import fs from "fs";
import { resolve } from "path";
import getLogger from "../logger";

const logger = getLogger();

export async function detect(projectRootPath: string) {
  for (const framework of frameworksInfo) {
    for (const { path, match } of framework.detect) {
      try {
        const content = await fs.promises.readFile(
          resolve(projectRootPath, path),
          "utf-8"
        );

        const matchedFramework = content.match(new RegExp(match));
        if (matchedFramework) {
          return framework;
        }
      } catch (e) {
        logger.debug(e);
      }
    }
  }
}
