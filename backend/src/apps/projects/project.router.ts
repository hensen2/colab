import express from "express";
import { getProjects } from "./";

const projectRouter = express.Router();

projectRouter.get("/", getProjects);

export default projectRouter;
