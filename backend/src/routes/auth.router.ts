import express from "express";
import { getToken, login, register } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.get("/", getToken);
authRouter.post("/register", register);
authRouter.post("/login", login);

export default authRouter;
