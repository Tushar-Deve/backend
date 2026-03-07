// import mysql from "mysql2";
// import dotenv from "dotenv";
// dotenv.config();

// const db = mysql.createPool({
//   host: process.env.MYSQLHOST.trim(),      // ✅ trim() se extra newline/space remove
//   user: process.env.MYSQLUSER.trim(),
//   password: process.env.MYSQLPASSWORD.trim(),
//   database: process.env.MYSQLDATABASE.trim(),
//   port: Number(process.env.MYSQLPORT),             // number hi rehne do
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0,
// });

// db.getConnection((err, connection) => {
//   if (err) {
//     console.error("❌ DB pool connection failed:", err);
//   } else {
//     console.log("✅ DB pool connected successfully");
//     connection.release(); // ✅ pool me release karna hota hai
//   }
// });

// export default db;


import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("❌ SQLite connection failed:", err);
  } else {
    console.log("✅ SQLite database connected");

    db.serialize(() => {

      db.run(`
        CREATE TABLE IF NOT EXISTS faculty (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          email TEXT UNIQUE,
          password TEXT
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS students (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          roll_no TEXT UNIQUE,
          name TEXT,
          email TEXT,
          password TEXT
        )
      `);

      db.run(`
        CREATE TABLE IF NOT EXISTS marks (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          roll_no TEXT,
          name TEXT,
          subject TEXT,
          marks INTEGER
        )
      `);

      db.run(`
  INSERT OR IGNORE INTO faculty (name, email, password)
  VALUES
    ('Seema Nandal', 'seemanandal@gmail.com', '12345')
`);

      db.run(`
  INSERT OR IGNORE INTO students (roll_no, name, email, password)
  VALUES
    ('101', 'Tushar', 'tushar@gmail.com', '12321')
`);

    });
  }
});

export default db;