const mysql = require('mysql2/promise');

async function connection () {
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    //password: process.env.DATABASE_PASSWORD,
    database: 'test', });
  return conn
}

module.exports = connection();
