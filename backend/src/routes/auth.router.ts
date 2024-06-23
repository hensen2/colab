import express from "express";
import { getToken } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.get("/", getToken);

export default authRouter;
