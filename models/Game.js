/* Models can be defined in two equivalent ways in Sequelize:
Calling sequelize.define(modelName, attributes, options)
Extending Model and calling init(attributes, options) 
https://sequelize.org/docs/v6/core-concepts/model-basics/ */

const { DataTypes } = require('sequelize');
const db = require('../database/mysql.connection.js');


//https://sequelize.org/docs/v7/other-topics/other-data-types/
const Game = db.define('Game', {
    player_id: {
        type: DataTypes.INTEGER //sumar el resultado de 2 dados
    },
    score: {
        type: DataTypes.INTEGER //sumar el resultado de 2 dados
    },
    victory: {
        type: DataTypes.BOOLEAN //si number es 7, victory = true
    }
});

module.exports = Game;

