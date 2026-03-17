import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import facultyRoutes from "./routes/facultyRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import marksRoutes from "./routes/marksRoutes.js";
import db from "./connection.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/faculty", facultyRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/marks", marksRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.get("/check-tables", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema='public'
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error checking tables");
  }
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM faculty");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/force-update", async (req, res) => {
  try {
    await db.query(`
      UPDATE faculty
      SET password = 'newpassword123'
      WHERE email = 'seemanandal@gmail.com'
    `);

    res.send("Password updated successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating password");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});