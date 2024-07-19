import express from "express";
import { getProjects } from "./project.controller";

const projectRouter = express.Router();

projectRouter.get("/", getProjects);

export default projectRouter;
