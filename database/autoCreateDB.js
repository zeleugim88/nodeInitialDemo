
//Sources
//https://jasonwatmore.com/post/2020/09/17/sequelize-mysql-create-database-if-it-doesnt-exist
//https://sequelize.org/docs/v6/other-topics/migrations/

const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const host = process.env.DB_HOST;
const port = process.env.PORT;

    // connect to db
/*     const db = new Sequelize(database, username, password, {
        host: host,
        dialect: 'mysql',
        logging: false
    }); */
    
const updateConnection = async () => {
    // create db if it doesn't already exist
    try {
        const connection = await mysql.createConnection({ host, port, username, password });
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    } catch (error){
        console.log("Not possible to connect to DB")
    }

    // connect to db
    const db = new Sequelize(database, user, password, { dialect: 'mysql', logging: false, host: host });

    await connection.end();
}


module.exports = {
    updateConnection,
    }