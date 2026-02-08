import express from "express";
import db from "../connection.js";

const router = express.Router();

// ✅ POST: Add marks for a student
router.post("/add", (req, res) => {
  const { roll_no, name, subject, marks } = req.body;

  if (!roll_no || !name || !subject || !marks) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "INSERT INTO marks (roll_no, name, subject, marks) VALUES (?, ?, ?, ?)";
  db.query(sql, [roll_no, name, subject, marks], (err, result) => {
    if (err) {
      console.error("Error inserting marks:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json({ message: "Marks added successfully ✅" });
  });
});

// ✅ GET: View all marks
router.get("/", (req, res) => {
  db.query("SELECT * FROM marks", (err, results) => {
    if (err) {
      console.error("Error fetching marks:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(results);
  });
});

// ✅ DELETE marks by roll_no
router.delete("/delete/:roll_no", (req, res) => {
  const { roll_no } = req.params;

  const sql = "DELETE FROM marks WHERE roll_no = ?";
  db.query(sql, [roll_no], (err, result) => {
    if (err) {
      console.error("Error deleting record:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.status(200).json({ message: "Record deleted successfully ✅" });
  });
});

// ============================
// STUDENT VIEW MARKS
// ============================

router.get("/student", (req, res) => {
  const { roll_no, name } = req.query;

  if (!roll_no || !name) {
    return res
      .status(400)
      .json({ message: "roll_no and name required" });
  }

  const sql =
    "SELECT roll_no,name,subject, marks FROM marks WHERE roll_no = ? AND name = ?";

  db.query(sql, [roll_no, name], (err, results) => {
    if (err) {
      console.error("Student marks fetch error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Result not found" });
    }

    res.json(results);
  });
});


export default router;

