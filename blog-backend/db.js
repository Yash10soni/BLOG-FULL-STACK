// db.js (or database.js)

import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "blogdb",
  password: "aezakmi", // 🔹 replace with your actual password
  port: 5432,
});

export default pool;
