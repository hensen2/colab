import express from "express";
import validate from "../middleware/validate";
import accessApi from "../middleware/accessApi";
import userRouter from "./users";
import { accessSchema, refreshSchema } from "../auth/auth.validation";
import { RequestSource } from "../types/request.types";
import projectRouter from "./projects/project.router";
import experimentRouter from "./experiments";

const apiRouter = express.Router();

// validate and verify jwt tokens for api access
apiRouter.use(
  validate(refreshSchema, RequestSource.COOKIE),
  validate(accessSchema, RequestSource.HEADER),
  accessApi,
);

// api routes
apiRouter.use("/users", userRouter);
apiRouter.use("/projects", projectRouter);
apiRouter.use("/experiments", experimentRouter);

export default apiRouter;
