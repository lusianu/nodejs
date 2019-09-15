  const mysql = require('mysql');
  const {host, user, password, database} = require('../config/authenticMysql.json');

<<<<<<< HEAD
connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    port     :  3306,
    password : '123456',
    database : 'clientes'
=======
  //local mysql db connection
  var connection = mysql.createConnection({
      host ,    
      user  ,   
      password ,
      database 
>>>>>>> a758eea25502c65fda46fe83e3c3f11e2dc36b56
  });
  
  connection.connect(function(err) {
      if (err) throw err;
  });
  
  module.exports = connection;
  