/* Models can be defined in two equivalent ways in Sequelize:
Calling sequelize.define(modelName, attributes, options)
Extending Model and calling init(attributes, options) 
https://sequelize.org/docs/v6/core-concepts/model-basics/ */

const { DataTypes } = require('sequelize');
const db = require('../database/mysql.connection.js');

const Game = db.define('Game', {
    id: {
        type: DataTypes.STRING //generar
    },
    player_id: {
        type: DataTypes.STRING //importar de Player
    },
    victory: {
        type: DataTypes.BOOLEAN
    },
});


module.exports = Game;