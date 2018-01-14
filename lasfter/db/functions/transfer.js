const { Pool } = require('pg');
const argon2 = require('argon2');

/**
* A function that transfers currency from one user to another
* @param {serial} receive_id
* @param {serial} give_id
* @param {serial} event_id
* @param {int} amount
* @returns {string}
*/
module.exports = (receive_id, give_id, event_id, amount, context, callback) => {
  const pool = new Pool({
	user: process.env.pg_user,
    host: process.env.pg_host,
    database: process.env.pg_database,
    password: process.env.pg_password,
    port: process.env.pg_port,
    ssl: true
  });
  
  
   	pool.query('UPDATE users_events SET balance = balance - $1 WHERE user_id = $2 and event_id = $3', set [amount, giveId, event_id]);
	pool.query('UPDATE users_events SET balance = balance + $1 WHERE user_id = $2 and event_id = $3', set [amount, receiveId, event_id]);
	return "0";
      .then(res => callback(null, `success: ${res.rows[0]}`))
      .catch(err => callback(err));
  }).catch(err => callback(err));
};
