const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

/**
* A function that transfers currency from one user to another
* @param {string} token
* @param {integer} receive_id
* @param {integer} give_id
* @param {integer} event_id
* @param {number} amount
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
  pool.query('UPDATE users_events SET balance = balance - $1 WHERE user_id = $2 and event_id = $3', set [amount, giveId, event_id])
    .catch(err => callback(err));
	pool.query('UPDATE users_events SET balance = balance + $1 WHERE user_id = $2 and event_id = $3', set [amount, receiveId, event_id])
    .catch(err => callback(err));
};
