import { Server } from "@hocuspocus/server";
import { encodeStateAsUpdate, applyUpdate } from "yjs";
import app from "./app";
import { getUserByIdAndEmail } from "./apps/users";
import { getDocumentWithIds, updateDocumentState } from "./apps/documents";
import { port } from "./lib/config";
import logger from "./lib/logger";
import { verifyAccessToken, verifyWorkspaceToken } from "./lib/tokens";
import {
  AuthFailureError,
  NotFoundError,
  WorkspaceTokenError,
} from "./lib/appError";
import { getPermissionByIds } from "./apps/permissions";

const server = app.listen(port, () => {
  logger.info(`Server running at port: ${port}`);
});

// Websocket server configuration
const wss = Server.configure({
  port: 8081,
  quiet: true,
  async onListen({ port }) {
    logger.info(`WebSocket server running at port: ${port}.`);
  },
  async onConnect({ socketId }) {
    logger.info(`WebSocket ID connected: ${socketId}.`);
  },
  // Event listener for websocket user auth
  async onAuthenticate({ requestHeaders, token }) {
    if (!requestHeaders.cookie) {
      throw new AuthFailureError("No auth cookies received.");
    }

    // Next steps extracts auth cookies from string to keyed object
    const cookiesHeader = requestHeaders.cookie.split("; ");
    const cookies: { [key: string]: string } = {};

    // Populate cookies object key:value pairs
    cookiesHeader.forEach((cookie) => {
      const arr = cookie.split("=");
      cookies[arr[0]] = arr[1];
    });

    if (!cookies.accessToken || !cookies.sid) {
      throw new AuthFailureError("Missing auth cookies.");
    }

    // Verify user is authenticated
    const { userId, email } = verifyAccessToken(cookies.accessToken);

    const user = await getUserByIdAndEmail(userId, email);

    if (!user) {
      throw new AuthFailureError("User not authenticated.");
    }

    // Verify user is authorized
    const payload = verifyWorkspaceToken(cookies.sid, user.email);

    if (
      !payload ||
      payload.workspaceId !== user.currentWorkspace.toString() ||
      payload.colabToken !== token
    ) {
      throw new WorkspaceTokenError();
    }

    // Fetch user permissions
    const permission = await getPermissionByIds(userId, payload.workspaceId);

    if (!permission || payload.colabToken !== permission.colabToken) {
      throw new AuthFailureError(
        "No user permissions found for this user workspace.",
      );
    }

    // Returned data gets passed to websocket connection context
    return {
      name: `${user.firstName} ${user.lastName}`,
      avatarUrl: user.avatarUrl,
      workspaceId: payload.workspaceId,
      role: permission.role,
    };
  },
  // Event listener for loading persisted data to client
  async onLoadDocument({ document, documentName, context }) {
    const loadedDoc = await getDocumentWithIds(
      context.workspaceId,
      documentName,
    );

    if (!loadedDoc || !loadedDoc.state) {
      throw new NotFoundError("Document not found");
    }

    const uint8 = new Uint8Array(loadedDoc.state);
    applyUpdate(document, uint8);
    return document;
  },
  // Event listener for persisting data from client
  async onStoreDocument({ document, documentName, context }) {
    const state = Buffer.from(encodeStateAsUpdate(document));

    await updateDocumentState(context.workspaceId, documentName, state);
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
