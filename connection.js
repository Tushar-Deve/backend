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

async function initDB() {
  try {
    console.log("ENV:", process.env.DATABASE_URL);
    console.log("Connecting to PostgreSQL...");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS faculty (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(100)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        roll_no VARCHAR(20) UNIQUE,
        name VARCHAR(100),
        email VARCHAR(100),
        password VARCHAR(100)
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS marks (
        id SERIAL PRIMARY KEY,
        roll_no VARCHAR(20),
        name VARCHAR(100),
        subject VARCHAR(100),
        marks INTEGER
      );
    `);

    await pool.query(`
      INSERT INTO faculty (name,email,password)
      VALUES ('Seema Nandal','seemanandal@gmail.com','12345')
      ON CONFLICT (email) DO NOTHING
    `);

    await pool.query(`
      INSERT INTO students (roll_no,name,email,password)
      VALUES ('101','Tushar','tushar@gmail.com','12321')
      ON CONFLICT (roll_no) DO NOTHING
    `);

    console.log("✅ PostgreSQL connected and tables ready");
    console.log("ENV CHECK:", process.env.DATABASE_URL);

  } catch (err) {
    console.error("❌ Database error:", err);
    console.log("ENV CHECK:", process.env.DATABASE_URL);
  }
}

initDB();

export default pool;