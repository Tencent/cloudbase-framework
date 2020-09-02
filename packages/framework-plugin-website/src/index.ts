import path from "path";
import fs from "fs";
import os from "os";
import { exec } from "child_process";
import { promisify } from "util";

import { Plugin, PluginServiceApi } from "@cloudbase/framework-core";
import { StaticBuilder } from "@cloudbase/static-builder";
import { StaticDeployer } from "@cloudbase/static-deployer";

const DEFAULT_INPUTS = {
  outputPath: "dist",
  cloudPath: "/",
  ignore: [".git", ".github", "node_modules", "cloudbaserc.js"],
  installCommand: "npm install --prefer-offline --no-audit --progress=false",
};

/**
 * 导出接口用于生成 JSON Schema 来进行智能提示
 */
export interface IFrameworkPluginWebsiteInputs {
  /**
   * 安装命令，如`npm install`，没有可不传
   *
   * @default npm install --prefer-offline --no-audit --progress=false
   */
  installCommand?: string;
  /**
   * 构建命令，如`npm run build`，没有可不传
   *
   */
  buildCommand?: string;
  /**
   * 网站静态文件的路径
   *
   * @default dist
   */
  outputPath?: string;
  /**
   * 静态资源部署到云开发环境的路径，默认为根目录。
   *
   * @default /
   */
  cloudPath?: string;
  /**
   * 静态资源部署时忽略的文件路径，支持通配符
   *
   * @default [".git", ".github", "node_modules", "cloudbaserc.js"]
   */
  ignore?: string[];
  /**
   * 环境变量键值对，会被注入到静态网站根目录下的 `/cloudbaseenv.json`
   *
   */
  envVariables?: Record<string, string>;
  /**
   * 执行 cloudbase framework:run 时，运行的默认指令
   */
  runCommand?: string;
}

type ResolvedInputs = typeof DEFAULT_INPUTS & IFrameworkPluginWebsiteInputs;

class WebsitePlugin extends Plugin {
  protected builder: StaticBuilder;
  protected deployer: StaticDeployer;
  protected resolvedInputs: ResolvedInputs;
  protected buildOutput: any;
  // 静态托管信息
  protected website: any;

  constructor(
    public name: string,
    public api: PluginServiceApi,
    public inputs: IFrameworkPluginWebsiteInputs
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
    this.api.logger.info(
      "Website 插件会自动开启静态网页托管能力，需要当前环境为 [按量计费] 模式"
    );
    this.api.logger.info(
      `Website 插件会部署应用资源到当前静态托管的 ${this.resolvedInputs.cloudPath} 目录下`
    );
    await Promise.all([this.ensurePostPay()]);
  }

  /**
   * 编译为 SAM 模板
   */
  async compile() {
    return {
      EnvType: "PostPay",
      Resources: Object.assign(
        {},
        this.getStaticResourceSam(
          "Website",
          "为开发者提供静态网页托管的能力，包括HTML、CSS、JavaScript、字体等常见资源。",
          ""
        ),
        this.getStaticResourceSam("ConfigEnv", "配置文件", "")
      ),
      EntryPoint: [
        {
          Label: "网站入口",
          EntryType: "StaitcStore",
          HttpEntryPath: this.resolvedInputs.cloudPath,
        },
      ],
    };
  }

  getStaticResourceSam(name: string, description: string, codeUri: string) {
    return {
      [name]: {
        Type: "CloudBase::StaticStore",
        Properties: {
          Description: description,
        },
        CodeUri: codeUri,
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
    // cloudPath 会影响publicpath 和 baseroute 等配置，需要处理
    this.api.logger.debug("WebsitePlugin: build", this.resolvedInputs);
    await this.installPackage();

    const {
      outputPath,
      cloudPath,
      buildCommand,
      envVariables,
    } = this.resolvedInputs;

    if (buildCommand) {
      await promisify(exec)(injectEnvVariables(buildCommand, envVariables));
    }

    const includes = [
      "**",
      ...this.resolvedInputs.ignore.map((ignore) => `!${ignore}`),
    ];
    this.buildOutput = await this.builder.build(includes, {
      path: cloudPath,
      domain: this.website.cdnDomain,
      config: envVariables,
    });
    console.log(this.buildOutput);

    const deployContent = this.buildOutput.static.concat(
      this.buildOutput.staticConfig
    );

    const deployResult = await Promise.all(
      deployContent.map((item: any) =>
        this.deployer.deploy({
          localPath: item.src,
          cloudPath: item.cloudPath,
          ignore: this.resolvedInputs.ignore,
        })
      )
    );
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

    const url = this.api.genClickableLink(
      `https://${this.website.cdnDomain + this.resolvedInputs.cloudPath}`
    );
    this.api.logger.info(
      `${this.api.emoji("🚀")} 网站部署成功, 访问地址：${url}`
    );

    await this.builder.clean();
  }

  /**
   * 执行本地命令
   */
  async run(params: { runCommand: string }) {
    this.api.logger.debug("WebsitePlugin: run");

    const runCommand = params?.runCommand || this.resolvedInputs.runCommand;

    if (!runCommand) return;

    await new Promise((resolve, reject) => {
      const cmd = exec(
        injectEnvVariables(runCommand, this.resolvedInputs.envVariables)
      );
      cmd.stdout?.pipe(process.stdout);
      cmd.on("close", (code) => {
        resolve(code);
      });
      cmd.on("exit", (code) => {
        reject(code);
      });
    });
  }

  /**
   * 安装依赖
   */
  async installPackage() {
    const { installCommand } = this.resolvedInputs;
    try {
      if (fs.statSync("package.json")) {
        this.api.logger.info(installCommand);
        return promisify(exec)(installCommand);
      }
    } catch (e) {}
  }

  async ensurePostPay() {
    const res = await this.api.cloudApi.tcbService.request("DescribeEnvs");
    let env = res.EnvList && res.EnvList[0];

    if (!env) {
      throw new Error(`当前账号下不存在 ${this.api.envId} 环境`);
    }

    if (env.PayMode !== "postpaid") {
      throw new Error(
        "网站托管当前只能部署到按量付费的环境下，请先在控制台切换计费方式"
      );
    }
  }
}

function resolveInputs(inputs: any) {
  return Object.assign({}, DEFAULT_INPUTS, inputs);
}

function injectEnvVariables(command: string, envVariables: any): string {
  const keyword = os.platform() === "win32" ? "set" : "export";
  const envCommand = Object.keys(envVariables || {}).reduce((cmd, key) => {
    return cmd + `${keyword} ${key}=${envVariables[key]} && `;
  }, "");

  return `${envCommand} ${command}`;
}

export const plugin = WebsitePlugin;
