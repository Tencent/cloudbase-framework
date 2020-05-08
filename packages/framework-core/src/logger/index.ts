import winston from "winston";
export { Logger } from "winston";

export default function createLogger(level?: string) {
  const logger = winston.createLogger({
    level: level || "info",
    format: winston.format.simple(),
    defaultMeta: { service: "cloudbase-framework" },
    transports: [new winston.transports.Console()],
  });

  return logger;
}
