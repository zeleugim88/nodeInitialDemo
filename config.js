
const mysql = {
    username: "root",//process.env.USERNAME, 
    password: "123456",//process.env.PASSWORD
    database: "node",//process.env.DATABASE
    host: "localhost"//process.env.HOST
}

module.exports = mysql;

//ERROR BY USING ENV VARIABLES
//https://stackoverflow.com/questions/34167595/access-denied-for-mysql-connection-in-nodejs
