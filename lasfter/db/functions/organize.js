const { Pool } = require('pg');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

/**
* Consume email and password and output JWT if password is valid
* @param {string} token
* @param {string} event_name
* @returns {string}
*/
module.exports = (token, event_name, context, callback) => {
  const pool = new Pool({
    user: process.env.pg_user,
    host: process.env.pg_host,
    database: process.env.pg_database,
    password: process.env.pg_password,
    port: process.env.pg_port,
    ssl: true
  });

  let user;
  try {
    user = jwt.verify(token, process.env.secret);
  } catch(err) {
    return callback(null, err);
  }

  // just give organizers a big balance so they can transfer to participants lmao
  return pool.query("INSERT INTO events (name, organizer_id) VALUES ($1, $2)", [event_name, user.id]).then(res => {
      pool.query('INSERT INTO users_events (user_id, event_id, balance, role) VALUES ($1, $2, 1000000, \'admin\')', [user.id, res.rows[0].id])
        .then(res => callback(null, "ok"))
        .catch(err => callback(err));
    }).catch(err => callback(err));
};
