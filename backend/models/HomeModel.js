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
  // Se Não Existe a Tabela, Crie!
  connection.query(createTable, (err, rows) => {
    if (err) {
      console.log(`Erro ao Criar a Tabela :${err}`);
      return new Error('Erro ao criar tabela');
    }
  });
  // Inserindo Dados no banco.
  let count = 0;
  await connection.execute('SELECT * FROM dados_city where name = ?',
    [weather.name],
    (err, results, fields) => {
      // console.log(results.length);
      count = results.length + 1;
      console.log(count);
      connection.execute(
        'INSERT INTO dados_city (name, vezes) VALUES (?,?)',
        [weather.name, count],
        (err, results, fields) => {
          console.log(results);
        },
      );
    });
};
module.exports = {
  insert,
};
