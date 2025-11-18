// db.js
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use the external database URL from Render
  ssl: {
    rejectUnauthorized: false, // Required for Render Postgres
  },
});

export default pool;
