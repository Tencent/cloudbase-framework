/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import winston, { format } from 'winston';
import { inspect } from 'util';
import chalk from 'chalk';
import path from 'path';
import os from 'os';
import { mkdirSync } from '@cloudbase/toolbox';
import { formatDateTime } from '../utils/format';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const gradient = require('gradient-string');

const LOG_PATH = path.join(os.homedir(), 'cloudbase-framework/logs');
chalk.level = 1;

export { Logger } from 'winston';

let logger: winston.Logger;

const logFilePath = path.join(LOG_PATH, `${formatDateTime(new Date())}.log`);

export default function getLogger(level?: string) {
  if (!logger) {
    // 初始化 logger
    try {
      mkdirSync(LOG_PATH);
    } catch (e) {}

    logger = winston.createLogger({
      level: level || 'info',
      transports: [
        new winston.transports.Console({
          format: format.combine(
            format.cli(),
            format.printf((info) => {
              const splat = info[Symbol.for('splat') as any];
              return (
                `${chalk.bold(
                  gradient(['cyan', 'rgb(0, 111, 150)', 'rgb(0, 246,136)'])(
                    ' CloudBase Framework '
                  )
                )} ${info.level} ${info.message}` +
                (splat ? ` ${splat.map(inspect).join(' ')} ` : '')
              );
            })
          ),
        }),
        new winston.transports.File({
          filename: logFilePath,
          level: 'debug',
          format: format.printf((info) => {
            const splat = info[Symbol.for('splat') as any];
            return (
              `${new Date()} CloudBase Framework::${info.level} ${
                info.message
              }` + (splat ? ` ${splat.map(inspect).join(' ')} ` : '')
            );
          }),
        }),
      ],
    });
  }

  if (level) {
    logger.level = level;
  }

  return logger;
}

/**
 * 查询日志地址
 */
export function getLogFilePath() {
  return logFilePath;
}
