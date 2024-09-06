import express from "express";
import { createNewWorkspace } from "./";

const workspaceRouter = express.Router();

workspaceRouter.post("/", createNewWorkspace);

export default workspaceRouter;
