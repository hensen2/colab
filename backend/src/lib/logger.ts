import winston from "winston";
import moment from "moment-timezone";

// Logger levels config
const config = {
  levels: {
    error: 0,
    info: 1,
    http: 2,
  },
  colors: {
    error: "red",
    info: "green",
    http: "magenta",
  },
};

// Formatting helpers
const { combine, colorize, align } = winston.format;

winston.addColors(config.colors);

const timestamp = winston.format.timestamp({
  format: moment.tz("America/Chicago").format(),
});

const printf = winston.format.printf(
  ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`,
);

// Log file filters
const infoFilter = winston.format((info) => {
  return info.level === "info" ? info : false;
});

const httpFilter = winston.format((info) => {
  return info.level === "http" ? info : false;
});

// Logger transports
const transports = [
  new winston.transports.Console({
    level: "http",
    format: combine(colorize({ all: true }), timestamp, align(), printf),
  }),
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
    format: combine(timestamp, printf),
  }),
  new winston.transports.File({
    filename: "logs/info.log",
    level: "info",
    format: combine(infoFilter(), timestamp, printf),
  }),
  new winston.transports.File({
    filename: "logs/http.log",
    level: "http",
    format: combine(httpFilter(), timestamp, printf),
  }),
  new winston.transports.File({
    filename: "logs/combined.log",
    level: "http",
    format: combine(timestamp, printf),
  }),
];

// Create and export logger
export default winston.createLogger({
  levels: config.levels,
  transports,
});
