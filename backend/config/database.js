const mysql = require('mysql2/promise');

async function connection () {
  return await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB, });
}

module.exports = connection;
