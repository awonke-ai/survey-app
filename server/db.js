const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ Connected to MySQL database');
  }
});

// Optional: Run a test query
connection.query('SELECT NOW() AS time', (err, results) => {
  if (err) {
    console.error('❌ Test query failed:', err.message);
  } else {
    console.log('✅ Test query returned:', results[0]);
  }
});

module.exports = connection;
