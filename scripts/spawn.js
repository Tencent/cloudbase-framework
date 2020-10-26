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

    let stdout = "";
    cm.stdout && cm.stdout.on("data", (data) => {
      stdout += data;
    });
    let stderr = "";
    cm.stderr && cm.stdout.on("data", (data) => {
      stderr += data;
    });

    cm.on('error', reject);
    cm.on('close', (code) => (code === 0 ? resolve(stdout) : reject(stderr)));
  });
}

module.exports = spawnPromise;
