const { Sequelize } = require('sequelize');
const mysql = require('../config.js')

//Connecting to Database 
const db = new Sequelize(mysql.database, mysql.username, mysql.password, {
    host: mysql.host,
    dialect: 'mysql',
    // logging: false,
});

module.exports = db