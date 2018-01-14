const { Pool } = require('pg');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

/**
* Consume email and password and output JWT if password is valid
* @param {string} email
* @param {string} password 
* @returns {object}
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
  
  return pool.query('SELECT * FROM users WHERE email = $1', [email])
    .then(res => {
      const hash = res.rows[0].password.trim();
      const user_info = {email: res.rows[0].email, id: res.rows[0].id}; 
      return argon2.verify(hash, password)
        .then(matched => callback(null, {token: jwt.sign(user_info, process.env.secret), user: user_info}))
        .catch(err => callback(err));
    }).catch(err => callback(err));
};
