require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // enable this if your DB requires SSL (e.g., some hosted providers)
  ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : false
});

async function query(text, params = []) {
  const res = await pool.query(text, params);
  return res;
}

module.exports = { query, pool };