import express from "express";
import validate from "../middleware/validate";
import authenticate from "../middleware/authenticate";
import userRouter from "./users";
import { accessSchema, refreshSchema } from "../auth/auth.validation";
import { RequestSource } from "../types/request.types";
import projectRouter from "./projects";
import experimentRouter from "./experiments";
import protocolRouter from "./protocols";

const apiRouter = express.Router();

// validate and verify jwt tokens for api access
apiRouter.use(
  validate(refreshSchema, RequestSource.COOKIE),
  validate(accessSchema, RequestSource.HEADER),
  authenticate,
);

// api routes
apiRouter.use("/users", userRouter);
apiRouter.use("/projects", projectRouter);
apiRouter.use("/experiments", experimentRouter);
apiRouter.use("/protocols", protocolRouter);

export default apiRouter;
