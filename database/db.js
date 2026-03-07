const sqlite3 = require("sqlite3").verbose();
require("dotenv").config(); // ये .env पढ़ने के लिए जरूरी है

const dbPath = process.env.DB_PATH || "./database/test_marks.db";

const db = new sqlite3.Database("./database/test_marks.db", (err) => {
  if (err) {
    console.log("Database connection error:", err);
  } else {
    console.log("SQLite Database Connected");
  }
});

module.exports = db;