import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import express from "express";
import PostRouter from "./router/Post.js";
import {generateImage } from "./controllers/GeneratedimageAi.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// Routes
app.use("/api/post", PostRouter);
app.use("/api/generateImage", generateImage);

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello, developer",
  });
});

// Database connection
const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("The server is connected"))
    .catch((err) => console.log(err));
};

// Start the server
const startServer = async () => {
  try {
    connectDB();
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
