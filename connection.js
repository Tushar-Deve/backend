import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const db = mysql.createPool({
  host: process.env.MYSQLHOST.trim(),      // ✅ trim() se extra newline/space remove
  user: process.env.MYSQLUSER.trim(),
  password: process.env.MYSQLPASSWORD.trim(),
  database: process.env.MYSQLDATABASE.trim(),
  port: Number(process.env.MYSQLPORT),             // number hi rehne do
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ DB pool connection failed:", err);
  } else {
    console.log("✅ DB pool connected successfully");
    connection.release(); // ✅ pool me release karna hota hai
  }
});

export default db;
