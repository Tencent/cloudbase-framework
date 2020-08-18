import path from "path";
import fs from "fs";
import cpy from "cpy";
import { Builder } from "@cloudbase/framework-core";
import { fetchStream } from "@cloudbase/toolbox";
import Context from "@cloudbase/framework-core/lib/context";

interface StaticBuilderBuildOptions {
  /**
   * 云接入路径
   */
  path?: string;
  /**
   * 静态网站域名
   */
  domain?: string;
  /**
   * 环境变量
   */
  config?: any
}

interface StaticBuilderOptions {
  /**
   * 项目根目录的绝对路径
   */
  projectPath: string;
  copyRoot?: string;
}

const CONFIG_FILE_NAME = "cloudbaseenv.json"

export class StaticBuilder extends Builder {
  private copyRoot: string;
  constructor(options: StaticBuilderOptions) {
    super({
      type: "static",
      ...options,
    });
    this.copyRoot = options.copyRoot || this.projectDir;
  }
  async build(includes: string[], options: StaticBuilderBuildOptions = {}) {
    const contentDistPath = path.join(this.distDir, "content");
    const configDistPath = path.join(this.distDir, "config");

    // build content
    await cpy(includes, contentDistPath, {
      cwd: this.copyRoot,
      parents: true,
    });
    // build config
    await this.buildConfig(configDistPath, options);

    return {
      static: [
        {
          src: contentDistPath,
          cloudPath: options.path || "/",
        },
      ],
      staticConfig: [
        {
          src: configDistPath,
          cloudPath: "/"
        }
      ],
      routes: [
        {
          path: options.path || "/",
          targetType: "static",
          target: options.path || "/",
        },
      ],
    };
  }

  async buildConfig(configDistPath: string, options: StaticBuilderBuildOptions) {
    // 1. 读取旧配置
    const url = `https://${options.domain}/${CONFIG_FILE_NAME}`;
    const streamRes = await fetchStream(url);
    let originConfig;
    if (streamRes?.status == 200) {
      originConfig = await streamRes.json().catch(err => {
        return {};
      });
    } else {
      originConfig = {};
    }

    // 2. 整合配置
    const resolvedConfig = Object.assign({}, originConfig, options.config)

    // 3. 写入新配置
    if (!fs.existsSync(configDistPath)) {
      fs.mkdirSync(configDistPath)
    }
    fs.writeFileSync(path.join(configDistPath, CONFIG_FILE_NAME), JSON.stringify(resolvedConfig));
  }
}
