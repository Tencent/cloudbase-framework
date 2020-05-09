import winston, { format } from "winston";
import { inspect } from "util";
import chalk from "chalk";

export { Logger } from "winston";

const chalkInstance = new chalk.Instance({
  level: 1,
});

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
            `${chalkInstance.bgBlack(" cloudbase framework ")} ${info.level} ${
              info.message
            }` + (splat ? ` ${splat.map(inspect).join(" ")} ` : "")
          );
        })
      ),
      transports: [new winston.transports.Console()],
    });
  }

  return logger;
}
