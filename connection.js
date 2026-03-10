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

// Postresql database Connection.js

import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect()
  .then(() => {
    console.log("✅ PostgreSQL connected successfully");

    // Faculty table
    pool.query(`
      CREATE TABLE IF NOT EXISTS faculty (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(100)
      );
    `);

    // Students table
    pool.query(`
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        roll_no VARCHAR(20) UNIQUE,
        name VARCHAR(100),
        email VARCHAR(100),
        password VARCHAR(100)
      );
    `);

    // Marks table
    pool.query(`
      CREATE TABLE IF NOT EXISTS marks (
        id SERIAL PRIMARY KEY,
        roll_no VARCHAR(20),
        name VARCHAR(100),
        subject VARCHAR(100),
        marks INTEGER
      );
    `);
    pool.query(`
        INSERT INTO faculty (name, email, password)
        VALUES ('Seema Nandal', 'seemanandal@gmail.com', '12345')
        ON CONFLICT (email) DO NOTHING;
`);

    pool.query(`
        INSERT INTO students (roll_no, name, email, password)
        VALUES ('101', 'Tushar', 'tushar@gmail.com', '12321')
        ON CONFLICT (roll_no) DO NOTHING;
`);
  })
  .catch((err) => {
    console.error("❌ PostgreSQL connection error:", err);
  });

export default pool;