import { Server } from "@hocuspocus/server";
import logger from "./logger";
// import { port } from "../lib/config";

// Create and export WebSocketServer
const wss = Server.configure({
  async onConnect({ socketId }) {
    logger.info(`WebSocket ID connected: ${socketId}`);
  },
  async connected() {
    logger.info(`Connections: ${wss.getConnectionsCount()}`);
  },
  async onDisconnect({ socketId }) {
    // Output some information
    logger.info(`WebSocket ID disconnected: ${socketId}`);
  },
});

export default wss;
