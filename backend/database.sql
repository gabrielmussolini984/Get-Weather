CREATE TABLE IF NOT EXISTS dados_city (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(45) NOT NULL,
  vezes int(11) DEFAULT NULL,
  created_at datetime DEFAULT CURRENT_TIMESTAMP,
  updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
