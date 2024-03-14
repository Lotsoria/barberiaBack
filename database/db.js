const mysql = require('mysql2');


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'barberia2',
  password: 'Shadowdemon456.',
  port: 3308
});

module.exports = pool.promise();