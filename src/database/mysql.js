  const mysql = require('mysql');
  const {host, user, password, database} = require('../config/authenticMysql.json');

  //local mysql db connection
  var connection = mysql.createConnection({
      host ,    
      user  ,   
      password ,
      database 
  });
  
  connection.connect(function(err) {
      if (err) throw err;
  });
  
  module.exports = connection;
  