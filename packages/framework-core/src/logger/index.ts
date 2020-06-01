import winston, { format } from "winston";
import { inspect } from "util";
import chalk from "chalk";

chalk.level = 1;

export { Logger } from "winston";

let logger: winston.Logger;

export default function getLogger(level?: string) {
  if (!logger) {
    logger = winston.createLogger({
      level: level || "info",
      format: format.combine(
        format.cli(),
        format.printf((info) => {
          const splat = info[Symbol.for("splat") as any];
          return (
            `${chalk.bgBlack(chalk.cyanBright(" cloudbase framework "))} ${
              info.level
            } ${info.message}` +
            (splat ? ` ${splat.map(inspect).join(" ")} ` : "")
          );
        })
      ),
      transports: [new winston.transports.Console()],
    });
  }

  return logger;
}
