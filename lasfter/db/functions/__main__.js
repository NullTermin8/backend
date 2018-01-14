const { Pool } = require('pg');

/**
* A basic Hello World function
* @param {string} email Who you're saying hello to
* @param {string} password Who you're saying hello to
* @returns {string}
*/
module.exports = (email, password, context, callback) => {
  const pool = new Pool({
    user: process.env.pg_user,
    host: process.env.pg_host,
    database: process.env.pg_database,
    password: process.env.pg_password,
    port: process.env.pg_port,
    ssl: true
  });
  
  pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, password], (err, res) => {
    if (err) {
      return callback(err);
    }
  
    return callback(null, `success: ${res.rows[0]}`);
  });
};
