const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

/**
* A function that returns all user and user_event data for a certain user
* @param {string} token
* @param {integer} user_id
* @returns {string}
*/
module.exports = (token, user_id, context, callback) => {
  const pool = new Pool({
	user: process.env.pg_user,
    host: process.env.pg_host,
    database: process.env.pg_database,
    password: process.env.pg_password,
    port: process.env.pg_port,
    ssl: true
  });

  if (!jwt.verify(token, process.env.secret)) {
    return callback("unauthorized");
  }
  
  // XXX: use a transaction
  return pool.query('SELECT * FROM (users JOIN users_events ON users.id = users_evets.user_id) WHERE user.id=$1', set [user_id])
    .catch(err => callback(err));
};
