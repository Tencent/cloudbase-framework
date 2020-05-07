import path from "path";
import defaultConfig from "./default-config";

export default function resolveConfig(currentPath: string) {
  let config;
  try {
    config = require(path.join(currentPath, "cloudbase-framework"));
  } catch (e) {
    console.log(e);
    config = defaultConfig;
  }

  return config;
}
