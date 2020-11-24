/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2020 THL A29 Limited, a Tencent company.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */

const { spawn } = require('child_process');

async function spawnPromise(command, options) {
  return new Promise((resolve, reject) => {
    const cm = spawn(
      command,
      Object.assign(
        {
          shell: true,
          stdio: 'inherit',
        },
        options
      )
    );

    let stdout = '';
    cm.stdout &&
      cm.stdout.on('data', (data) => {
        stdout += data;
      });
    let stderr = '';
    cm.stderr &&
      cm.stdout.on('data', (data) => {
        stderr += data;
      });

    cm.on('error', reject);
    cm.on('close', (code) => (code === 0 ? resolve(stdout) : reject(stderr)));
  });
}

module.exports = spawnPromise;
