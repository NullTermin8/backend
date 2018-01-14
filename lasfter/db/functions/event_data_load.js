const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

/**
* A function that loads data on ALL events
* @param {string} token
* @returns {string}
*/
module.exports = (token, receive_id, give_id, event_id, amount, context, callback) => {
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
  return pool.query('SELECT * FROM events')
    .catch(err => callback(err));
};
