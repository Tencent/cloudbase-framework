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
const gradient = require('gradient-string');

chalk.level = 1;

export { Logger } from 'winston';

let logger: winston.Logger;

export default function getLogger(level?: string) {
  if (!logger) {
    logger = winston.createLogger({
      level: level || 'info',
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
      transports: [new winston.transports.Console()],
    });
  }

  if (level) {
    logger.level = level;
  }

  return logger;
}
