
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;
const host = process.env.DB_HOST;

const mysql = {
    username: username,
    password: password,
    database: database,
    host: host
}

module.exports = mysql;

