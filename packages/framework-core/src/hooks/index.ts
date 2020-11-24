/**
 *
 * Copyright 2020 Tencent
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { spawnPromise } from '../utils/spawn';
import getLogger from '../logger';

const logger = getLogger();

type IHookName = 'preDeploy' | 'postCompile' | 'postDeploy';

interface IHooksConfig {
  preDeploy?: IHooksExecCommand;
  postCompile?: IHooksCallFunction;
  postDeploy?: IHooksCallFunction;
}

interface IHooksExecCommand {
  type: 'execCommand';
  commands: string[];
}

interface IHooksCallFunction {
  type: 'callFunction';
  functions: ICallFunctionConfig[];
}

interface ICallFunctionConfig {
  functionName: string;
  params?: any;
}

export default class Hooks {
  private sam: Record<string, any> = {};
  constructor(public hooksConfig: IHooksConfig, public projectPath: string) {
    // postDeploy 是调用函数类型时，提前到 postCompile 阶段，转换为 SAM 在云端执行
    if (
      hooksConfig.postDeploy &&
      hooksConfig.postDeploy.type === 'callFunction'
    ) {
      hooksConfig.postCompile = hooksConfig.postDeploy;
      delete hooksConfig.postDeploy;
    }

    logger.debug('initHooks', hooksConfig);
  }

  async callHook(hookName: IHookName) {
    const hooksConfig = this.hooksConfig[hookName];

    logger.info('callHooks', hookName);
    if (!hooksConfig) return;

    switch (hooksConfig.type) {
      case 'execCommand':
        if (hookName === 'postDeploy') {
          throw new Error('postDeploy 钩子不支持调用 Command');
        }
        return this.execCommand(hooksConfig.commands);
      case 'callFunction':
        if (hookName === 'preDeploy') {
          throw new Error('preDeploy 钩子不支持调用云函数');
        }
        return this.callFunction(hooksConfig.functions);
    }
  }

  genSAM() {
    logger.debug('hooks.genSAM', this.sam);
    return this.sam;
  }

  private async execCommand(commands: string[] = []) {
    for (let command of commands) {
      logger.info('execCommand', command);
      await spawnPromise(command, [], {
        cwd: this.projectPath,
      });
    }
  }

  private callFunction(functions: ICallFunctionConfig[]) {
    // 转换为 SAM 在云端执行
    this.sam = {
      Config: {
        InstalledHook: functions.map((func) => {
          return {
            FunctionName: func.functionName,
            Params: func.params,
          };
        }),
      },
    };
  }
}
