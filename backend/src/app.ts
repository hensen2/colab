import express from "express";
import { clientURL, cookieSecret } from "./lib/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "./middleware/morgan";
import router from "./lib/router";
import errorHandler from "./middleware/errorHandler";
import "./db/mongo"; // initializes mongodb connection

// Initialize express app
const app = express();

// Application configuration
app.use(cors({ origin: clientURL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(cookieSecret));
app.use(morgan);

app.use(router);

app.use(errorHandler);

export default app;
