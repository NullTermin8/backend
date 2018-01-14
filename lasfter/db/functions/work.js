const { Pool } = require('pg');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

/**
* Consume email and password and output JWT if password is valid
* @param {string} token
* @param {string} event_name
* @returns {string}
*/
module.exports = (token, worker_id, event_name, context, callback) => {
  const pool = new Pool({
    user: process.env.pg_user,
    host: process.env.pg_host,
    database: process.env.pg_database,
    password: process.env.pg_password,
    port: process.env.pg_port,
    ssl: true
  });

  const user = jwt.verify(token, process.env.secret));
  if (!user) {
    return callback(null, "unauthorized");
  }

  // also give workers a big balance
  return pool.query("SELECT * FROM events WHERE name = $1 AND organizer_id = $2", [event_name, user.id]).then(res => {
      pool.query('INSERT INTO users_events (user_id, event_id, balance, role) VALUES ($1, $2, 1000000, \'worker\')', [worker_id, res.rows[0].id])
        .then(res => callback(null, "ok"))
        .catch(err => callback(err));
    }).catch(err => callback(err));
};
