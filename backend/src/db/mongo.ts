import mongoose from "mongoose";
import { dbURL } from "../lib/config";
import logger from "../lib/logger";

// Create MongoDB connection
mongoose
  .connect(dbURL)
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB:", error.message);
  });

export const mongoConnection = mongoose.connection;
