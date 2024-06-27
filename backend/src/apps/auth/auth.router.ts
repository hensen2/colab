import express from "express";
import { getToken, login, register, logout } from "./auth.controller";
import { refreshSchema } from "./auth.validation";
import validate from "../../middleware/validate";

const authRouter = express.Router();

authRouter.get("/", validate(refreshSchema), getToken);
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;
