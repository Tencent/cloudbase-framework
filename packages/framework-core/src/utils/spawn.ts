/**
 * Tencent is pleased to support the open source community by making CloudBaseFramework - 云原生一体化部署工具 available.
 *
 * Copyright (C) 2025 Tencent.  All rights reserved.
 *
 * Please refer to license text included with this package for license details.
 */
import { spawn, SpawnOptionsWithoutStdio } from 'child_process';

export async function spawnPromise(
  command: string,
  args: string[],
  options: SpawnOptionsWithoutStdio
) {
  return new Promise((resolve, reject) => {
    const cm = spawn(
      command,
      args,
      Object.assign(
        {
          shell: true,
          // stderr 使用 process.stderr 用于收集错误
          stdio: ['inherit', 'inherit', 'pipe'],
        },
        options
      )
    );
    let stdout = '';
    cm.stdout?.on('data', (data) => {
      stdout += data;
    });
    let stderr = '';
    cm.stderr?.on('data', (data) => {
      stderr += data;
    });

    cm.on('error', reject);
    cm.on('close', (code) => {
      code === 0 ? resolve(stdout) : reject(new Error(stderr || String(code)));
    });
  });
}
