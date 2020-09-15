import { spawn, SpawnOptionsWithoutStdio } from "child_process";

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
          stdio: "inherit",
        },
        options
      )
    );
    cm.on("error", reject);
    cm.on("close", (code) => (code === 0 ? resolve() : reject(code)));
  });
}
