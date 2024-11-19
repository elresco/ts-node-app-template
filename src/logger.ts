import winston from "winston";
import path from "path";

interface StackInfo {
  method: string;
  relativePath: string;
  line: string;
  column: string;
  file: string;
  stack: string;
}

const customFormat = winston.format.printf((info) => {
  if (info.level === "error") {
    return `[${info.level}: ${info.timestamp}] ${info.message} ${info.stack}`;
  }
  return `[${info.level}: ${info.timestamp}] ${info.message}`;
});

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD hh:mm:ss",
    }),
    winston.format.errors({ stack: true }),
    customFormat,
  ),
  transports: [
    new winston.transports.File({ filename: "logs/combined.log" }),
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize()),
    }),
  ],
});

export default logger;
