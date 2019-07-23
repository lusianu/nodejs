const mysql = require('mysql');

connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'controle_acesso'
  });

  module.exports = connection;

  