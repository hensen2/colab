import express from "express";
import { getUserSession } from "./user.controller";

const userRouter = express.Router();

userRouter.get("/", getUserSession);

export default userRouter;
