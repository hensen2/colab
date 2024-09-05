import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { clientURL, cookieSecret } from "./lib/config";
import morgan from "./middleware/morgan";
import errorHandler from "./middleware/errorHandler";
import "./db/mongo"; // initializes mongodb connection
import apiRouter from "./apps";

// Initialize express app
const app = express();

// Application configuration
app.use(cors({ origin: clientURL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(cookieSecret));
app.use(morgan);

app.use("/api", apiRouter);

app.use(errorHandler);

export default app;
