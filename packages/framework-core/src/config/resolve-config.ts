import path from "path";
import defaultConfig from "./default-config";
import { Config } from "../types";

export default function resolveConfig(config: Config | undefined) {
  if (!config) {
    return defaultConfig;
  }

  return config;
}
