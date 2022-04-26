/* Models can be defined in two equivalent ways in Sequelize:
Calling sequelize.define(modelName, attributes, options)
Extending Model and calling init(attributes, options) 
https://sequelize.org/docs/v6/core-concepts/model-basics/ */

const { DataTypes } = require('sequelize');
const db = require('../database/mysql.connection.js');

const Player = db.define('Player', {
    name: {
        type: DataTypes.STRING
    },
    id: {
        type: DataTypes.STRING //generar
    },
    date: {
        type: DataTypes.BOOLEAN //new Date().toISOString();
    },
});


module.exports = Player;