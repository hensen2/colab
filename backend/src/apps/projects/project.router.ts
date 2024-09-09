import express from "express";
import { createProject, getProjects, getProject } from "./";

const projectRouter = express.Router();

projectRouter.get("/", getProjects);
projectRouter.get("/:projectId", getProject);
projectRouter.post("/", createProject);

export default projectRouter;
