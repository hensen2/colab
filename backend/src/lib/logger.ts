import winston from "winston";
import { environment } from "./config";
import moment from "moment-timezone";

const logLevel = environment === "development" ? "http" : "info";

const format = winston.format.combine(
  winston.format.timestamp({ format: moment().tz("America/Chicago").format() }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`,
  ),
);

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
  new winston.transports.File({
    filename: "logs/http.log",
    level: "http",
  }),
];

export default winston.createLogger({
  level: logLevel,
  format,
  transports,
});
