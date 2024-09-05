import express from "express";
import { createNewWorkspace, getWorkspaceSession } from "./";

const workspaceRouter = express.Router();

workspaceRouter.get("/", getWorkspaceSession);
workspaceRouter.post("/", createNewWorkspace);

export default workspaceRouter;
