/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
/**
 * 导出接口用于生成 JSON Schema 来进行智能提示
 */
export interface IFrameworkPluginDenoInputs {
  /**
   * Dockerfile 源镜像
   *
   * @default 'debian:buster-slim'
   */
  dockerImage?: string;
  /**
   * Deno 运行时版本 如 'v1.3.0'
   *
   * @default 'latest'
   */
  runtime?: string;
  /**
   * Denon 版本，如 '@2.4.0'
   *
   * @default 'latest'
   */
  denonVersion?: string;
  /**
   * 入口文件
   *
   * 配置入口文件为 `entry.ts` 后，docker 编译时，会执行 `deno install entry.ts`。
   *
   * 但不推荐如此管理项目，推荐使用 denon 配置文件，并在部署前进行本地编译。
   *
   * @default ''
   */
  entry?: string;
  /**
   * 是否云端自动构建
   *
   * @default true
   */
  autoBuild?: boolean;
  /**
   * 服务路径配置
   *
   * @default '/deno-app'
   */
  servicePath?: string;
  /**
   * 服务名
   *
   * @default 'deno-app'
   */
  serviceName?: string;
  /**
   * 本地代码文件夹相对于项目根目录的路径
   *
   * @default './'
   */
  projectPath?: string;
}
