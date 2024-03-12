const express = require('express');
const app = express();
const port = 3000;
const db = require('./database/db');
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:62817'
}));
const soapService = require('./services/soapService');

soapService(app);


app.listen(port, function() {
  console.log('Server is running on port ' + port);
});

db.getConnection()
  .then((conn) => {
    console.log('Conexión a la base de datos establecida con éxito');
    conn.release(); // No olvides liberar la conexión
  })
  .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err);
  });