import { Server } from "@hocuspocus/server";
// import { TiptapTransformer } from "@hocuspocus/transformer";
import express, { Request } from "express";
import { createExperiment, getExperiments } from "./";
import logger from "../../lib/logger";
// import { port } from "../../lib/config";
// import { Logger } from "@hocuspocus/extension-logger";
// import * as Y from "yjs";

const experimentRouter = express.Router();

experimentRouter.get("/", getExperiments);

experimentRouter.post("/", createExperiment);

experimentRouter.ws("/:experimentId", (ws, req: Request) => {
  const wss = Server.configure({
    async onConnect({ socketId }) {
      logger.info(`WebSocket ID connected: ${socketId}`);
    },

    // async onChange(data) {
    //   console.log(data.document);
    // },

    // async onLoadDocument() {
    //   const ydoc = new Y.Doc();
    //   console.log(ydoc);
    //   return ydoc;
    // },
    // async connected() {
    //   logger.info(`Connections: ${wss.getConnectionsCount()}`);
    //   return;
    // },
    // async onDisconnect({ socketId }) {
    //   // Output some information
    //   logger.info(`WebSocket ID disconnected: ${socketId}`);
    //   return;
    // },
  });

  wss.handleConnection(ws, req);
  console.log(wss.documents);
});

export default experimentRouter;
