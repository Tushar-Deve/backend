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
  } catch (error) {
    console.error(error);
    res.status(500).send("Error checking tables");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
