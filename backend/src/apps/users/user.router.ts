import express from "express";
import { changeUserWorkspace, getUserSession } from "./user.controller";

const userRouter = express.Router();

userRouter.get("/", getUserSession);
userRouter.patch("/", changeUserWorkspace);

export default userRouter;
