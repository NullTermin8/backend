const { Pool } = require('pg');
const argon2 = require('argon2');

/**
* A function that creates a new user
* @param {string} email
* @param {string} password 
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
  
  return argon2.hash(password, {
    type: argon2.argon2id
  }).then(hash => {
    return pool.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hash])
      .then(res => callback(null, `success: ${res.rows[0]}`))
      .catch(err => callback(err));
  }).catch(err => callback(err));
};
