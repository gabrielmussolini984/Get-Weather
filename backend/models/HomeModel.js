const connection = require('../config/database');


const createTable = `CREATE TABLE IF NOT EXISTS dados_city (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(45) NOT NULL,
  vezes int(11) DEFAULT NULL,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;

const insert = async (weather) => {
  try {
    // Create Table
    const conn = await connection;
    await conn.query(createTable);
    // Insert or Update
    const [rows] = await conn.execute('SELECT * FROM dados_city where name = ?', [weather.name]);
    if (rows.length === 0) {
      return await conn.execute(
        'INSERT INTO dados_city (name, vezes) VALUES (?,?)', [weather.name, 1],
      );
    }
    await conn.execute(`UPDATE dados_city SET vezes = (?) WHERE name = '${weather.name}'`, [rows[0].vezes + 1]);
    await conn.end();
    return;
  } catch (error) {
    return new Error(error);
  }
};

const findCities = async () => {
  try {
    const conn = await connection;

    const [rows, fields] = await conn.execute('SELECT * FROM dados_city ORDER BY vezes DESC LIMIT 5');
    await conn.end();
    return rows;
  } catch (error) {
    return new Error(error);
  }
};
module.exports = {
  insert,
  findCities,
};
