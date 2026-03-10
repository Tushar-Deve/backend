import express from "express";
import db from "../connection.js";

const router = express.Router();

// Test route
router.get("/", (req, res) => {
  res.send("✅ Student routes working!");
});

// Student login
router.post("/login", async (req, res) => {
  try {
    console.log("👉 Student login API hit");
    console.log("Body:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and password required",
      });
    }

    const sql =
      "SELECT * FROM students WHERE email = $1 AND password = $2";

    const result = await db.query(sql, [email, password]);

    if (result.rows.length === 0) {
      return res.json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.json({
      success: true,
      message: "Student login successful",
      student: result.rows[0],
    });

  } catch (err) {
    console.error("❌ DB error:", err);
    res.status(500).json({
      success: false,
      message: "Database error",
    });
  }
});

export default router;