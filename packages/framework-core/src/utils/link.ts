/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2025 Tencent.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import chalk from 'chalk';
import terminalLink from 'terminal-link';

chalk.level = 1;

export function genClickableLink(link: string) {
  if (terminalLink.isSupported) {
    const clickablelink = terminalLink(link, link);
    return chalk.bold.cyan(clickablelink);
  }
  return chalk.bold.underline.cyan(link);
}
