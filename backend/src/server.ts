import { Server } from "@hocuspocus/server";
import app from "./app";
import { port } from "./lib/config";
import logger from "./lib/logger";
import { verifyAccessToken } from "./lib/tokens";
import { getUserWithTokenData } from "./apps/users";
import { AuthFailureError, NotFoundError } from "./lib/appError";
import { encodeStateAsUpdate, applyUpdate } from "yjs";
import {
  getExperimentWithIds,
  updateExperimentState,
} from "./apps/experiments";

const server = app.listen(port, () => {
  logger.info(`Server running at port: ${port}`);
});

const wss = Server.configure({
  port: 8081,
  quiet: true,
  async onListen({ port }) {
    logger.info(`WebSocket server running at port: ${port}`);
  },
  async onConnect({ socketId }) {
    logger.info(`WebSocket ID connected: ${socketId}`);
  },
  async onAuthenticate({ token }) {
    const { userId, workspaceId, role } = verifyAccessToken(token);

    const user = await getUserWithTokenData(userId, workspaceId, role);

    if (!user) {
      throw new AuthFailureError("User not authenticated");
    }

    return {
      name: `${user.firstName} ${user.lastName}`,
      avatarUrl: user.avatarUrl,
      role,
      workspaceId,
    };
  },
  async onLoadDocument({ document, documentName, context }) {
    const { workspaceId } = context;
    const experiment = await getExperimentWithIds(documentName, workspaceId);

    if (!experiment || !experiment.state) {
      throw new NotFoundError("Experiment not found");
    }

    const uint8 = new Uint8Array(experiment.state);
    applyUpdate(document, uint8);

    return document;
  },
  async onStoreDocument({ document, documentName, context }) {
    const { workspaceId } = context;

    const state = Buffer.from(encodeStateAsUpdate(document));

    await updateExperimentState(documentName, workspaceId, state);
  },
});

wss.listen();

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
