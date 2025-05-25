const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3");
const path = require("path");

// Load Model and Controller
const UserModel = require("./models/UserModel");
const Authentication = require("./controllers/Authentication");

const app = express();
const PORT = 3001;

// Connect to SQLite database
const db = new sqlite3.Database(path.resolve(__dirname, "../awe-database.db"), (err) => {
  if (err) {
    console.error("❌ Failed to connect to database:", err.message);
  } else {
    console.log("✅ Connected to SQLite database.");
  }
});

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
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


/*
const express = require("express");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3001;

// Connect to SQLite DB
const db = new sqlite3.Database(path.resolve(__dirname, "../awe-database.db"), (err) => {
  if (err) {
    console.error("❌ Failed to connect to SQLite database:", err.message);
  } else {
    console.log("✅ Connected to SQLite database.");
  }
});

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

// --- REGISTER ---
app.post("/api/register", (req, res) => {
  const { username, email, password, phone, role } = req.body;

  const phoneRegex = /^(\+61|0)[0-9]{9}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({ success: false, message: "Invalid phone number format." });
  }

  db.get("SELECT * FROM user WHERE username = ? OR email = ?", [username, email], (err, row) => {
    if (err) {
      console.error("DB SELECT error:", err.message);
      return res.json({ success: false, message: "Database error during verification." });
    }

    if (row) {
      return res.json({ success: false, message: "Username or email already exists." });
    }

    db.run(
      `INSERT INTO user (username, email, password_hash, phone, role) VALUES (?, ?, ?, ?, ?)`,
      [username, email, password, phone, role],
      (err) => {
        if (err) {
          console.error("Insert error:", err.message);
          return res.json({ success: false, message: "Database error during registration." });
        }
        res.json({ success: true, message: "Registration successful." });
      }
    );
  });
});

// --- LOGIN ---
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM user WHERE username = ? AND password_hash = ?", [username, password], (err, row) => {
    if (err) {
      console.error("DB SELECT error:", err.message);
      return res.json({ success: false, message: "Database error during login." });
    }

    if (row) {
      res.json({ success: true, message: "Login successful.", user: row });
    } else {
      res.json({ success: false, message: "Invalid username or password." });
    }
  });
});

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
*/