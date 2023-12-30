const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'kidsy_db',
});

pool.query('SELECT 1', (err, results) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
    } else {
      console.log('Connected to MySQL successfully!');
    }
});
module.exports = pool;