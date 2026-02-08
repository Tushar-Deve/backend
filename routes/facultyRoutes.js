import express from "express";
import db from "../connection.js";

const router = express.Router();

// ✅ Test route (optional, verify backend works)
router.get("/", (req, res) => {
  res.send("Faculty routes working fine ✅");
});

// ✅ Faculty login route
router.post("/login", (req, res) => {
  console.log("👉 Faculty login API hit");
  console.log("Body received:", req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  const sql = "SELECT * FROM faculty WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (results.length > 0) {
      // Login successful
      const faculty = results[0];
      res.json({ success: true, message: "Login successful!", faculty });
    } else {
      // Invalid credentials
      res.json({ success: false, message: "Invalid email or password" });
    }
  });
});

export default router;
