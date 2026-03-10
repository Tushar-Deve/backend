import express from "express";
import db from "../connection.js";

const router = express.Router();

// Test route
router.get("/", (req, res) => {
  res.send("Faculty routes working fine ✅");
});

// Faculty login
router.post("/login", async (req, res) => {
  try {
    console.log("👉 Faculty login API hit");
    console.log("Body received:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const sql = "SELECT * FROM faculty WHERE email = $1 AND password = $2";

    const result = await db.query(sql, [email, password]);

    if (result.rows.length > 0) {
      const faculty = result.rows[0];

      res.json({
        success: true,
        message: "Login successful!",
        faculty,
      });
    } else {
      res.json({
        success: false,
        message: "Invalid email or password",
      });
    }
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({
      success: false,
      message: "Database error",
    });
  }
});

export default router;