import wss from "../../lib/wss";
import express, { Request } from "express";
import { createExperiment, getExperiments } from "./";

const experimentRouter = express.Router();

experimentRouter.get("/", getExperiments);

experimentRouter.post("/", createExperiment);

experimentRouter.ws("/:experimentId", (ws, req: Request) => {
  wss.handleConnection(ws, req);
});

export default experimentRouter;
