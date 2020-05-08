import path from "path";
import defaultConfig from "./default-config";

export default function resolveConfig(currentPath: string) {
  let config;
  try {
    // 配置文件目前支持 .json 和 js 文件，后期可以支持 yaml
    config = require(path.join(currentPath, "cloudbase-framework"));
  } catch (e) {
    config = defaultConfig;
  }

  return config;
}
