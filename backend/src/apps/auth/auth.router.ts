import express from "express";
import { getToken, login, register, logout } from "./auth.controller";
import { loginSchema, refreshSchema, registerSchema } from "./auth.validation";
import validate, { RequestSource } from "../../middleware/validate";

const authRouter = express.Router();

authRouter.get("/", validate(refreshSchema, RequestSource.COOKIE), getToken);
authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/login", validate(loginSchema), login);
authRouter.post("/logout", logout);

export default authRouter;
