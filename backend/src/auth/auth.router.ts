import express from "express";
import { getToken, login, register, logout } from "./auth.controller";
import { loginSchema, refreshSchema, registerSchema } from "./auth.validation";
import validate from "../middleware/validate";
import { RequestSource } from "../types/request.types";

const authRouter = express.Router();

authRouter.get("/", validate(refreshSchema, RequestSource.COOKIE), getToken);
authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/login", validate(loginSchema), login);
authRouter.post("/logout", logout);

export default authRouter;
