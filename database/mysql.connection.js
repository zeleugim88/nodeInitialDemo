const { Sequelize } = require('sequelize');
const mysql = require('../config.js')

//Connecting to MySQL Database 
const db = new Sequelize(mysql.database, mysql.username, mysql.password, {
    host: mysql.host,
    dialect: 'mysql',
    logging: false
});

//If your database doesn't exist yet, you can just call db:create command. With proper access it will create that database for you.
//https://sequelize.org/docs/v6/other-topics/migrations/
module.exports = db