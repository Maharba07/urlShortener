const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'url_shortener',
  password: 'Popular151284',
  port: 5432,
});

async function testDB() {
  try {
    const result = await pool.query('SELECT * FROM urls');
    console.log(result.rows);
  } catch (err) {
    console.error('Database query error:', err);
  } finally {
    pool.end();
  }
}

testDB();
