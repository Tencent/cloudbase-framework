import path from "path";
import fs from "fs";
import { exec } from "child_process";
import { promisify } from "util";

import { Plugin, PluginServiceApi } from "@cloudbase/framework-core";
import { StaticBuilder } from "@cloudbase/static-builder";
import { StaticDeployer } from "@cloudbase/static-deployer";

const DEFAULT_INPUTS = {
  outputPath: "dist",
  cloudPath: "/",
  ignore: [".git", ".github", "node_modules", "cloudbaserc.js"],
};

class WebsitePlugin extends Plugin {
  protected builder: StaticBuilder;
  protected deployer: StaticDeployer;
  protected resolvedInputs: any;
  protected buildOutput: any;
  // 静态托管信息
  protected website: any;

  constructor(
    public name: string,
    public api: PluginServiceApi,
    public inputs: any
  ) {
    super(name, api, inputs);

    this.resolvedInputs = resolveInputs(this.inputs);
    this.builder = new StaticBuilder({
      projectPath: this.api.projectPath,
      copyRoot: path.resolve(
        this.api.projectPath,
        this.resolvedInputs.outputPath
      ),
    });
    this.deployer = new StaticDeployer({
      cloudbaseManager: this.api.cloudbaseManager,
    });
  }

  /**
   * 初始化
   */
  async init() {
    this.api.logger.debug("WebsitePlugin: init", this.resolvedInputs);
    await Promise.all([this.ensureEnableHosting(), this.installPackage()]);
  }

  /**
   * 编译为 SAM 模板
   */
  async compile() {
    return {
      Resources: {
        Website: {
          Type: "CloudBase::StaticStore",
          Properties: {
            Description:
              "为开发者提供静态网页托管的能力，包括HTML、CSS、JavaScript、字体等常见资源。",
            // @TODO 指定构建产物，云端路径，过滤文件
          },
        },
      },
    };
  }

  /**
   * 删除资源
   */
  async remove() {}

  /**
   * 生成代码
   */
  async genCode() {}

  /**
   * 构建
   */
  async build() {
    // @todo
    // cloudPath 会影响publicpath 和 baseroute 等配置，需要处理
    this.api.logger.debug("WebsitePlugin: build", this.resolvedInputs);

    const { outputPath, cloudPath, buildCommand } = this.resolvedInputs;

    if (buildCommand) {
      await promisify(exec)(buildCommand);
    }

    this.buildOutput = await this.builder.build(["**", "!**/node_modules/**"], {
      path: cloudPath,
    });
  }

  /**
   * 部署
   */
  async deploy() {
    this.api.logger.debug(
      "WebsitePlugin: deploy",
      this.resolvedInputs,
      this.buildOutput
    );

    const deployResult = await Promise.all(
      this.buildOutput.static.map((item: any) =>
        this.deployer.deploy({
          localPath: item.src,
          cloudPath: item.cloudPath,
          ignore: item.ignore,
        })
      )
    );

    this.api.logger.info(
      `🚀 网站部署成功, 访问地址： https://${
        this.website.cdnDomain + this.resolvedInputs.cloudPath
      }`
    );

    await this.builder.clean();

    return deployResult;
  }

  /**
   * 安装依赖
   */
  async installPackage() {
    try {
      if (fs.statSync("package.json")) {
        this.api.logger.info("npm install");
        return promisify(exec)("npm install");
      }
    } catch (e) {}
  }

  /**
   * 确保开启了静态托管
   */
  async ensureEnableHosting(): Promise<any> {
    const Hosting = this.api.resourceProviders?.hosting;
    const envId = this.api.envId;

    if (!Hosting) {
      return;
    }

    let website;

    try {
      const hostingRes = await Hosting.getHostingInfo({ envId });

      if (!hostingRes.data.length) {
        throw new Error("未开通静态托管");
      }

      website = hostingRes.data[0];
    } catch (e) {
      this.api.logger.debug(e);

      await Hosting.enableHosting({ envId });

      this.api.logger.info("⏳ 托管资源初始化中, 预计等待 3 分钟");

      await wait(3 * 60 * 1000);
      return this.ensureEnableHosting();
    }

    this.website = website;

    return website;
  }
}

function resolveInputs(inputs: any) {
  return Object.assign({}, DEFAULT_INPUTS, inputs);
}

function wait(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

function ensureWithSlash(dir: string): string {
  if (!dir) return "";
  return dir[dir.length - 1] === "/" ? dir : dir + "/";
}

module.exports = WebsitePlugin;
