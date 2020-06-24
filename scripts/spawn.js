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
    cm.on('error', reject);
    cm.on('close', (code) => (code === 0 ? resolve() : reject(code)));
  });
}

module.exports = spawnPromise;
