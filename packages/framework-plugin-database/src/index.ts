import { Plugin, PluginServiceApi } from "@cloudbase/framework-core";

export interface IDatabasePluginInputs {
  collections: ICollectionInputs[];
}

export interface ICollectionInputs {
  collectionName: string;
  description?: string;
  createIndexes?: ICreateIndex[];
  DropIndexes?: IDropIndex[];
  aclTag?: "READONLY" | "PRIVATE" | "ADMINWRITE" | "ADMINONLY" | "CUSTOM";
  aclRule?: string;
}

export interface ICreateIndex {
  name: string;
  unique: boolean;
  keys: IIndexKey[];
}

export interface IDropIndex {
  name: string;
}

export interface IIndexKey {
  name: string;
  direction: "-1" | "1" | "2dsphere";
}

class DatabasePlugin extends Plugin {
  protected resolvedInputs: any;
  protected buildOutput: any;

  constructor(
    public name: string,
    public api: PluginServiceApi,
    public inputs: IDatabasePluginInputs
  ) {
    super(name, api, inputs);

    const DEFAULT_INPUTS = {};
    this.resolvedInputs = resolveInputs(this.inputs, DEFAULT_INPUTS);
  }

  /**
   * 初始化
   */
  async init() {
    this.api.logger.debug("DatabasePlugin: init", this.resolvedInputs);
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
    this.api.logger.debug("DatabasePlugin: build", this.resolvedInputs);
  }

  /**
   * 生成SAM文件
   */
  async compile() {
    this.api.logger.debug("DatabasePlugin: compile", this.resolvedInputs);
    return {
      Resources: {
        [this.toConstantCase(this.resolvedInputs.serviceName)]: this.toSAM(),
      },
    };
  }

  /**
   * 部署
   */
  async deploy() {
    this.api.logger.debug(
      "DatabasePlugin: deploy",
      this.resolvedInputs,
      this.buildOutput
    );
  }

  toSAM() {
    const {
      description,
      collectionName,
      aclTag,
      aclRule,
    } = this.resolvedInputs;
    return {
      Type: "CloudBase::FlexDB",
      Properties: {
        CollectionName: collectionName,
        Description: description,
        AclTag: aclTag,
        AclRule: aclRule,
      },
    };
  }

  toConstantCase(name: string) {
    let result = "";
    let lastIsDivide = true;
    for (let i = 0; i < name.length; i++) {
      let letter = name[i];
      if (letter === "-" || letter === "_") {
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
