const db = require('../database/mysqlSequelize')

const Usuario = db.sequelize.define('usuario',{
    nome: {type: db.Sequelize.STRING , allowNull: false,unique: false},
    email: {type: db.Sequelize.STRING, allowNull: false,unique: true},
    senha: {type: db.Sequelize.STRING, allowNull: false,unique: false}
})

//Usuario.sync({force:true}); //Criar Tabela

module.exports = Usuario