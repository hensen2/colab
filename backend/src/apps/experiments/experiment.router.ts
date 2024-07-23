import express from "express";
import { createExperiment, getExperiments } from "./";

const experimentRouter = express.Router();

experimentRouter.get("/", getExperiments);

experimentRouter.post("/", createExperiment);

export default experimentRouter;
