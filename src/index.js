// src/index.js
import "dotenv/config";       // Loads environment variables from .env
import mongoose from "mongoose";
import app from "./app.js";   // Import the Express app
import { swaggerUi, swaggerSpec } from "./swagger.js";


// Define the port (use .env or default to 3000)
const PORT = process.env.PORT || 3000;

async function start() {
  try {
    // Get MongoDB URI from .env
    const { MONGODB_URI } = process.env;
    if (!MONGODB_URI) throw new Error("❌ Missing MONGODB_URI in .env file");

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");
    console.log("📘 Database Name:", mongoose.connection.name);

    // ⬇️ Serve Swagger UI at /docs
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`📄 Swagger docs at http://localhost:${PORT}/docs`);

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1); // Exit the app if there's an error
  }
}

// Run the server
start();
