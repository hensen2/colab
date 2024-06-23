import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes";

const cookieSecret = "cookieSecret";

// configures dotenv to work in your application
dotenv.config();
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
});

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(cookieSecret));

app.use(router);

const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () => {
  console.log("Server running at PORT: ", PORT);
});
