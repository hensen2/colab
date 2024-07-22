import express from "express";
import authRouter from "../auth";
import apiRouter from "../apps";

const router = express.Router();

// Public routes
router.use("/auth", authRouter);

// Private routes
router.use("/api", apiRouter);

export default router;
