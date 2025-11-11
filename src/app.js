// src/app.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import weatherRouter from "./routes/weatherRoutes.js"; // Import your CRUD routes

const app = express();

// ---------- Middleware Setup ----------
app.use(cors());             // Allow frontend or API tools to access it
app.use(express.json());     // Parse incoming JSON
app.use(morgan("dev"));      // Log requests in console

// ---------- Health Check Route ----------
app.get("/health", (_req, res) => {
  res.json({ status: "OK", message: "Weather API server is running 🚀" });
});

// ---------- Main Weather Routes ----------
app.use("/api/weather", weatherRouter);

// ---------- Default Route ----------
app.get("/", (_req, res) => {
  res.send("🌤 Weather API is running. Try /health or /api/weather for data.");
});

// ---------- Export App ----------
export default app;
