import express from "express";
import { getToken, login, register, logout } from "./auth.controller";
import { loginSchema, registerSchema, tokenSchema } from "./auth.validation";
import validate from "../../middleware/validate";

const authRouter = express.Router();

authRouter.get("/", validate(tokenSchema), getToken);
authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/login", validate(loginSchema), login);
authRouter.post("/logout", logout);

export default authRouter;
