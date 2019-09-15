const db = require('../database/mysqlSequelize')

const Usuario = db.sequelize.define('usuario',{
    nome: {type: db.Sequelize.STRING , allowNull: false,unique: false},
    sobrenome: {type: db.Sequelize.STRING},
    idade: {type: db.Sequelize.INTEGER},
    email: {type: db.Sequelize.STRING}
})

//Usuario.sync({force:true}); Criar Tabela

module.exports = Usuario