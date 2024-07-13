import express from "express";
import validate, { RequestSource } from "../../middleware/validate";
import accessApi from "../../middleware/accessApi";
import userRouter from "../users";
import { accessSchema, refreshSchema } from "../auth/auth.validation";

const apiRouter = express.Router();

// validate and verify jwt tokens for api access
apiRouter.use(
  validate(refreshSchema, RequestSource.COOKIE),
  validate(accessSchema, RequestSource.HEADER),
  accessApi,
);

// api routes
apiRouter.use("/users", userRouter);

export default apiRouter;
