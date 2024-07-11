import morgan from "morgan";
import logger from "../lib/logger";

// stream to http level
const stream = {
  write: (message: string) => logger.http(message.trim()),
};

// morgan str format
const responseFormat = `:method :url :status :res[content-length] - :response-time ms`;

// build middleware and export
export default morgan(responseFormat, {
  stream,
});
