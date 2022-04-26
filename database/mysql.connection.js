const { Sequelize } = require('sequelize');

//Connecting to Database 
const db = new Sequelize('node', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false,
});

module.exports = db