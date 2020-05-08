import winston, { format } from "winston";
export { Logger } from "winston";
import chalk from "chalk";

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
        format.printf(
          (info) =>
            `${chalkInstance.bgBlack(" Cloudbase Framework ")} ${info.level} ${
              info.message
            }`
        )
      ),
      transports: [new winston.transports.Console()],
    });
  }

  return logger;
}
