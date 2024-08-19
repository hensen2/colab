import express from "express";
import { createExperiment, getExperiments, getExperiment } from "./";

const experimentRouter = express.Router();

experimentRouter.get("/", getExperiments);
experimentRouter.get("/:experimentId", getExperiment);

experimentRouter.post("/", createExperiment);

export default experimentRouter;
