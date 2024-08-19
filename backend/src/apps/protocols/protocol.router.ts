import express from "express";
import { createProtocol, getProtocols } from "./";

const protocolRouter = express.Router();

protocolRouter.get("/", getProtocols);

protocolRouter.post("/", createProtocol);

export default protocolRouter;
