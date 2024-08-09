import app from "./app";
import { port } from "./lib/config";
import logger from "./lib/logger";

const server = app.listen(port, () => {
  logger.info(`Server running at port: ${port}`);
});

const exitHandler = () => {
  logger.info("Sigint received: shutting down server");
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unknownErrorHandler = (error: Error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unknownErrorHandler);
process.on("unhandledRejection", unknownErrorHandler);
process.on("SIGINT", exitHandler);
process.on("SIGTERM", exitHandler);
