import express from "express";
import {
  getToken,
  login,
  register,
  logout,
} from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.get("/", getToken);
authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;
