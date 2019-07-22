module.exports = function(){

    this.getUsuario = function(connection, callback){
        connection.query('select * from usuario', callback);
    }
    
    return this;
}