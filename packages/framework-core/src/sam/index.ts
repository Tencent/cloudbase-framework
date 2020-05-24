import fs from "fs";
import path from "path";

import merge from "lodash.merge";
import JSYaml from "js-yaml";

import { DEFAULT_SAM } from "./default-sam";

export function genSAM(projectPath: string, ...sections: any[]) {
  const samObj = merge(DEFAULT_SAM, ...sections);
  const samYaml = JSYaml.safeDump(samObj);
  fs.writeFileSync(path.join(projectPath, "TCBSAM.yaml"), samYaml);
}
