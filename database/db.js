const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/test_marks.db", (err) => {
  if (err) {
    console.log("Database connection error:", err);
  } else {
    console.log("SQLite Database Connected");
  }
});

module.exports = db;