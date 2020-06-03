import winston, { format } from "winston";
import { inspect } from "util";
import chalk from "chalk";
const gradient = require("gradient-string");

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
            `${chalk.bold(
              gradient(["cyan", "rgb(0, 111, 150)", "rgb(0, 246,136)"])(
                " CloudBase Framework "
              )
            )} ${info.level} ${info.message}` +
            (splat ? ` ${splat.map(inspect).join(" ")} ` : "")
          );
        })
      ),
      transports: [new winston.transports.Console()],
    });
  }

  return logger;
}
