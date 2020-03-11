const express = require('express');
const cors = require('cors');

const app = express();
const homeRoutes = require('./routes/homeRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', homeRoutes);
app.use(cors());


app.listen(3000, () => {
  console.log('Acessar http://localhost:3000');
  console.log('Servidor executando na porta 3000');
});
