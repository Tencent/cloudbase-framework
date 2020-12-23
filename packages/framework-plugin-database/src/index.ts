/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import { Plugin, PluginServiceApi } from '@cloudbase/framework-core';
import { pascalCase, constantCase } from 'change-case';

/**
 * 导出接口用于生成 JSON Schema 来进行智能提示
 */
export interface IFrameworkPluginDatabaseInputs {
  /**
   * 数据库集合信息，数组类型
   */
  collections: ICollectionInputs[];
}

export interface ICollectionInputs {
  /**
   * 集合名称
   *
   * @maxLength 64
   * @minLength 1
   */
  collectionName: string;
  /**
   * 描述信息
   *
   * @maxLength 128
   * @minLength 1
   */
  description?: string;
  /**
   * 创建的索引
   */
  createIndexes?: ICreateIndex[];
  /**
   * 删除的索引
   */
  dropIndexes?: IDropIndex[];
  /**
   * 权限标签。包含以下取值： READONLY：所有用户可读，仅创建者和管理员可写 PRIVATE：仅创建者及管理员可读写 ADMINWRITE：所有用户可读，仅管理员可写 ADMINONLY：仅管理员可读写 CUSTOM：自定义安全规则
   */
  aclTag?: 'READONLY' | 'PRIVATE' | 'ADMINWRITE' | 'ADMINONLY' | 'CUSTOM';
  /**
   * aclTag 为 CUSTOM 时，安全规则内容
   */
  aclRule?: string;
}

export interface ICreateIndex {
  /**
   * 索引名称
   * @maxLength 64
   * @minLength 1
   */
  name: string;
  /**
   * 是否唯一索引
   */
  unique: boolean;
  /**
   * 描述信息
   */
  keys: IIndexKey[];
}

export interface IDropIndex {
  /**
   * 索引名称
   */
  name: string;
}

export interface IIndexKey {
  /**
   * 字段
   * @maxLength 64
   * @minLength 1
   */
  name: string;
  /**
   * 字段排序，可枚举值：-1（降序）、1（升序）、2dsphere（地理位置）
   */
  direction: '-1' | '1' | '2dsphere';
}

class DatabasePlugin extends Plugin {
  protected resolvedInputs: IFrameworkPluginDatabaseInputs;
  protected buildOutput: any;

  constructor(
    public name: string,
    public api: PluginServiceApi,
    public inputs: IFrameworkPluginDatabaseInputs
  ) {
    super(name, api, inputs);

    const DEFAULT_INPUTS = {};
    this.resolvedInputs = resolveInputs(this.inputs, DEFAULT_INPUTS);
  }

  /**
   * 初始化
   */
  async init() {
    this.api.logger.debug('DatabasePlugin: init', this.resolvedInputs);
  }

  /**
   * 执行本地命令
   */
  async run() {}

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
    this.api.logger.debug('DatabasePlugin: build', this.resolvedInputs);
  }

  /**
   * 生成SAM文件
   */
  async compile() {
    this.api.logger.debug('DatabasePlugin: compile', this.resolvedInputs);
    return {
      Resources: this.resolvedInputs.collections.reduce(
        (prev: Record<string, any>, cur: ICollectionInputs) => {
          prev[constantCase(cur.collectionName)] = this.toSAM(cur);
          return prev;
        },
        {}
      ),
    };
  }

  /**
   * 部署
   */
  async deploy() {
    this.api.logger.debug(
      'DatabasePlugin: deploy',
      this.resolvedInputs,
      this.buildOutput
    );
  }

  toSAM(collectionConfig: ICollectionInputs) {
    let properties = JSON.parse(JSON.stringify(collectionConfig, replacer));

    function replacer(key: string, value: any) {
      if (value && typeof value === 'object') {
        let replacement: Record<string, any> = Array.isArray(value) ? [] : {};
        for (var k in value) {
          if (Object.hasOwnProperty.call(value, k)) {
            let v = value[k];

            if (k === 'aclRule') {
              v = JSON.stringify(v);
            }

            replacement[pascalCase(k)] = v;
          }
        }
        return replacement;
      }

      return value;
    }

    return {
      Type: 'CloudBase::FlexDB',
      Properties: Object.assign(
        {
          Description: '云开发 NoSQL 数据库',
        },
        properties
      ),
    };
  }

  toConstantCase(name: string) {
    let result = '';
    let lastIsDivide = true;
    for (let letter of name) {
      if (letter === '-' || letter === '_') {
        lastIsDivide = true;
      } else if (lastIsDivide) {
        result += letter.toUpperCase();
        lastIsDivide = false;
      } else {
        result += letter.toLowerCase();
        lastIsDivide = false;
      }
    }

    return result;
  }
}

function resolveInputs(inputs: any, defaultInputs: any) {
  return Object.assign({}, defaultInputs, inputs);
}

export const plugin = DatabasePlugin;
