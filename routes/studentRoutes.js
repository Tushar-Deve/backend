import express from "express";
import db from "../connection.js";

const router = express.Router();

// ✅ Test route
router.get("/", (req, res) => {
  res.send("✅ Student routes working!");
});

// ✅ Student login
router.post("/login", (req, res) => {
  console.log("👉 Student login API hit");
  console.log("Body:", req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password required",
    });
  }

  const sql = "SELECT * FROM student WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("❌ DB error:", err);
      return res.status(500).json({
        success: false,
        message: "Database error",
      });
    }

    if (results.length === 0) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.json({
      success: true,
      message: "Student login successful",
      student: results[0],
    });
  });
});

export default router;
