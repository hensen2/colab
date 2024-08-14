import express from "express";
import { createExperiment, getExperiments } from "./";

const experimentRouter = express.Router();

experimentRouter.get("/", getExperiments);

experimentRouter.post("/", createExperiment);

// experimentRouter.ws("/:experimentId", (ws, req: Request) => {
//   const wss = Server.configure({
//     async onConnect({ socketId }) {
//       logger.info(`WebSocket ID connected: ${socketId}`);
//     },
//   });

//   wss.handleConnection(ws, req);
// });

export default experimentRouter;
