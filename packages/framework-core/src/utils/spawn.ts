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
          stdio: 'inherit',
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
    cm.on('close', code => (code === 0 ? resolve(stdout) : reject(stderr)));
  });
}
