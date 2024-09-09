import express from "express";
import authRouter, { accessSchema } from "./auth";
import userRouter from "./users";
import workspaceRouter from "./workspaces";
import projectRouter from "./projects";
import protocolRouter from "./protocols";
import experimentRouter from "./experiments";
import validate from "../middleware/validate";
import authenticate from "../middleware/authenticate";
import { RequestSource } from "../types/request.types";
import authorize from "../middleware/authorize";

const apiRouter = express.Router();

// Public routes caught before router guards
apiRouter.use("/auth", authRouter);

// Router guard to validate and verify jwt tokens for API access
apiRouter.use(
  validate(accessSchema, RequestSource.COOKIE),
  authenticate,
  authorize,
);

// Private routes accessed after auth router guards
apiRouter.use("/users", userRouter);
apiRouter.use("/workspaces", workspaceRouter);
apiRouter.use("/projects", projectRouter);
apiRouter.use("/protocols", protocolRouter);
apiRouter.use("/experiments", experimentRouter);

export default apiRouter;
