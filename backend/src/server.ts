import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes";
import mongoose from "mongoose";
import { clientURL, cookieSecret, dbURL, port } from "./lib/config";
import logger from "./lib/logger";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: clientURL,
  },
});

io.on("connection", (socket) => {
  logger.info(`WebSocket ID: ${socket.id}`);
});

app.use(cors({ origin: clientURL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(cookieSecret));

mongoose
  .connect(dbURL)
  .then((_result) => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB:", error.message);
  });

app.use(router);

httpServer.listen(port, () => {
  logger.info(`Server running at port: ${port}`);
});
