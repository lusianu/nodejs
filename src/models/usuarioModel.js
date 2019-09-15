module.exports = function(){

    this.getUsuario = function(connection, callback){
        connection.query('select * from usuario', callback);
    }

    this.create = function(connection, usuario, callback){
        connection.connect(function(err) {
            var nome = usuario.nome
            var email = usuario.email
            var senha = usuario.senha
            if (err) throw err;
            console.log("Connected!");
            var sql = `INSERT INTO usuario (name, email, senha) VALUES ('${nome}','${email}','${senha})`;
            con.query(sql, callback);
          });
    }
    
    return this;
}