/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import CloudBaseManager from '@cloudbase/manager-node';

export interface DeployerOptions {
  cloudbaseManager: CloudBaseManager;
}

export interface Config {
  name?: string;
  plugins: {
    [name: string]: {
      use: string;
      inputs?: {
        [input: string]: any;
      };
    };
  };
  version?: string;
  description?: string;
  repo?: {
    url: string;
    workDir: string;
    branch: string;
  };
  tags?: string[];
  environment?: Record<string, string>;
  network?: {
    uniqVpcId: string;
    cloudBaseRun: boolean;
    region?: string;
  };
  addons?: AddonConfig[];
  requirement?: Record<string, any>;
}

export interface AddonConfig {
  type: string;
  name: string;
  instanceId?: string;
  password?: string;
  plan?: Record<string, any>;
  region?: string;
  vpcId?: string;
}

export interface CloudBaseConfig {
  secretId?: string;
  secretKey?: string;
  token?: string;
  envId: string;
  proxy?: string;
}

export interface ResourceProviders {
  [key: string]: any;
}

export interface CloudBaseFrameworkConfig {
  projectPath: string;
  cloudbaseConfig: CloudBaseConfig;
  logLevel?: string;
  config?: ICloudBaseConfig;
  resourceProviders?: ResourceProviders;
  /**
   * 是否产生新版本
   */
  bumpVersion?: boolean;
  /**
   * 新版本的备注信息
   */
  versionRemark?: string;
}

export interface ICloudBaseConfig {
  envId: string;
  functionRoot?: string;
  functions?: ICloudFunction[];
  servers?: ServerConfig[];
  framework?: Config;
}

export interface IGetCredential {
  secretId?: string;
  secretKey?: string;
  token: string;
}

export enum ServerLanguageType {
  node = 'node',
}

export interface ServerConfig {
  type: ServerLanguageType.node;
  name: string;
  path: string;
}

export interface IFunctionVPC {
  subnetId: string;
  vpcId: string;
}

export interface ICloudFunctionConfig {
  timeout?: number;
  envVariables?: Record<string, string | number | boolean>;
  runtime?: string;
  vpc?: IFunctionVPC;
  installDependency?: boolean;
  l5?: boolean;
}

export interface ICloudFunctionTrigger {
  name: string;
  type: string;
  config: string;
}

export interface ICloudFunction {
  name: string;
  config?: ICloudFunctionConfig;
  triggers?: ICloudFunctionTrigger[];
  params?: Record<string, string>;
  handler?: string;
  ignore?: string | string[];
  timeout?: number;
  envVariables?: Record<string, string | number | boolean>;
  runtime?: string;
  vpc?: IFunctionVPC;
  l5?: boolean;
  installDependency?: boolean;
  isWaitInstall?: boolean;
}

export interface ICreateFunctionOptions {
  // 函数配置信息
  func?: ICloudFunction;
  functions?: ICloudFunction[];
  functionRootPath?: string;
  envId: string;
  force?: boolean;
  base64Code?: string;
  log?: boolean;
  codeSecret?: string;
  functionPath?: string;
}

export interface IListFunctionOptions {
  limit?: number;
  offset?: number;
  envId: string;
}

export interface IFunctionLogOptions {
  functionName: string;
  envId: string;
  offset?: number;
  limit?: number;
  order?: string;
  orderBy?: string;
  startTime?: string;
  endTime?: string;
  functionRequestI?: string;
}

export interface IUpdateFunctionConfigOptions {
  functionName: string;
  config: ICloudFunctionConfig;
  envId: string;
}

export interface InvokeFunctionOptions {
  functionName: string;
  params?: Record<string, any>;
  envId: string;
}

export interface IFunctionBatchOptions {
  functions: ICloudFunction[];
  envId: string;
  log?: boolean;
}

export interface IFunctionTriggerOptions {
  functionName: string;
  triggers?: ICloudFunctionTrigger[];
  triggerName?: string;
  envId: string;
}

export interface ILoginOptions {
  key?: boolean;
  secretId?: string;
  secretKey?: string;
  // 修改浏览器登录打开的链接
  getAuthUrl?: (url: string) => string;
}

export interface GatewayContext {
  // 环境 id
  envId: string;
  // 整体配置
  config: ICloudBaseConfig;
}

export interface ICreateFunctionGatewayOptions {
  envId: string;
  path: string;
  name: string;
}

export interface IQueryGatewayOptions {
  envId: string;
  domain?: string;
  path?: string;
  gatewayId?: string;
  name?: string;
}

export interface IDeleteGatewayOptions {
  envId: string;
  path?: string;
  gatewayId?: string;
  name?: string;
}

export interface IBindGatewayDomainOptions {
  envId: string;
  domain: string;
}

export interface IQueryGatewayDomainOptions {
  envId: string;
  domain?: string;
}

export interface IUnbindGatewayDomainOptions {
  envId: string;
  domain: string;
}

export interface BuilderOptions {
  type: string;
  projectPath: string;
}

export interface BuildResult {
  container?: {
    name: string;
    options: any;
    source: string;
    entry: string;
  }[];
  functions?: {
    name: string;
    options: any;
    source: string;
    entry: string;
  }[];
  routes?: {
    path: string;
    targetType: string;
    target: string;
  }[];
  static?: {
    src: string;
    cloudPath: string;
  }[];
  staticConfig?: {
    src: string;
    cloudPath: string;
  }[];
  zipFiles?: {
    name: string;
    options: any;
    source: string;
    entry: string;
  }[];
}
