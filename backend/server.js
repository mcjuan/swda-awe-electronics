import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import UserModel from "./models/UserModel.js";
import Authentication from "./controllers/Authentication.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Connect to SQLite database
const db = new sqlite3.Database(
  path.resolve(__dirname, "../awe-database.db"),
  (err) => {
    if (err) {
      console.error("❌ Failed to connect to database:", err.message);
    } else {
      console.log("✅ Connected to SQLite database.");
    }
  }
);

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Inject Model → Controller
const userModel = new UserModel(db);
const auth = new Authentication(userModel);

// Routes
app.post("/api/register", auth.register);
app.post("/api/login", auth.login);

// Start Server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
