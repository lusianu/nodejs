const Sequelize = require('sequelize')
const sequelize = new Sequelize('lusianumysqlumbl', 'lusianomysql', 'mysqlLuciano1234',{
    host:"mysql669.umbler.com",
    port: '41890',
    dialect:'mysql',
    dialectOptions: {
        timeout: 30
      },
      pool: {
        max: 5,
        min: 0,
        idle: 30000
      }
});

module.exports = {
    Sequelize : Sequelize,
    sequelize : sequelize
}