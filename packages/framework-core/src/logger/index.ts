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
