/* Models can be defined in two equivalent ways in Sequelize:
Calling sequelize.define(modelName, attributes, options)
Extending Model and calling init(attributes, options) 
https://sequelize.org/docs/v6/core-concepts/model-basics/ */

//https://sequelize.org/docs/v7/other-topics/other-data-types/
const { DataTypes } = require('sequelize');
const db = require('../database/mysql.connection.js');

const Player = db.define('Player', {
    name: {
        type: DataTypes.STRING
    }
});


module.exports = Player; 