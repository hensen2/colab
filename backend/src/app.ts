import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./apps";
import morgan from "./middleware/morgan";
import { clientURL, cookieSecret } from "./lib/config";
import errorHandler from "./middleware/errorHandler";
import "./db/mongo"; // initializes mongodb connection

const app = express();

app.use(cors({ origin: clientURL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(cookieSecret));
app.use(morgan);

app.use(router);

app.use(errorHandler);

export default app;
