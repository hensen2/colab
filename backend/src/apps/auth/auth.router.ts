import express from "express";
import { getAuthToken, login, register, logout } from "./";
import { loginSchema, refreshSchema, registerSchema } from "./";
import validate from "../../middleware/validate";
import { RequestSource } from "../../types/request.types";
import authGuard from "../../middleware/authGuard";

const authRouter = express.Router();

authRouter.get(
  "/",
  authGuard,
  validate(refreshSchema, RequestSource.COOKIE),
  getAuthToken,
);
authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/login", validate(loginSchema), login);
authRouter.post("/logout", logout);

export default authRouter;
