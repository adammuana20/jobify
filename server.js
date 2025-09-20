import path, { dirname } from "path";
import { fileURLToPath } from "url";

import express from "express";
import morgan from "morgan";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import "express-async-errors";

import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

import jobRoutes from "./routes/jobRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

dotenv.config();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/dist")));

app.use(cookieParser());
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        "img-src": ["'self'", "data:", "https://res.cloudinary.com"],
      },
    },
  })
);
app.use(mongoSanitize());

app.use("/api/v1/jobs", authenticateUser, jobRoutes);
app.use("/api/v1/users", authenticateUser, userRoutes);
app.use("/api/v1/auth", authRoutes);

app.get("*", (req, res, next) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

app.use("*", (req, res, next) => {
  res.status(404).json({
    msg: "not found",
  });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
