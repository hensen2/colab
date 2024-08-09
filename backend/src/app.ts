// Must setup app before router to init websocket
import express from "express";
import expressWs from "express-ws";
const ws = expressWs(express());
const app = ws.app;

// Import the rest of the app libs
import { clientURL, cookieSecret } from "./lib/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "./middleware/morgan";
import router from "./lib/router";
import errorHandler from "./middleware/errorHandler";
import "./db/mongo"; // initializes mongodb connection

// Application configuration
app.use(cors({ origin: clientURL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(cookieSecret));
app.use(morgan);

app.use(router);

app.use(errorHandler);

export default app;
