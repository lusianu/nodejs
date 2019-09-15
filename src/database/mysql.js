const mysql = require('mysql');

connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    port     :  3306,
    password : '123456',
    database : 'clientes'
  });

  module.exports = connection;

  