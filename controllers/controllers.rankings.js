const { response, request } = require('express');
const Player = require('../models/Player.js');
const Game = require('../models/Game.js');
const sequelize = require('../database/mysql.connection.js') // This is the main class, the entry point to sequelize.
//Sequalize methods => https://sequelize.org/api/v6/class/src/sequelize.js~sequelize
const { Op } = require('sequelize'); //Sequelize provides several operators "Op" => where ([Op.and]:, [Op.or]); 
//some attributes ([Op.eq], [Op.ne]...) https://sequelize.org/docs/v6/core-concepts/model-querying-basics/



//CONTROLLER ENDPOINT 6 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const getGames = //Controller for endpoint 6 => GET /players/{id}/games: retorna el llistat de jugades per un jugador.
  async (req, res) => {
    try {
      res.json({games: await Game.findAll({ where: { player_id: req.params.id } })})
    } catch (error) {
      res.status(404).send(error);
    }
  }

//CONTROLLER ENDPOINT 7 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const getScores =
  async (req, res) => { //Controller for endpoint 7 => GET /players/ranking: retorna el percentatge mig d’èxits del conjunt de tots els jugadors
    try {
      const playersNum = await Player.count();
      const sumVictoryRates = await Player.sum('victoryRate');
      const totalVictoryRate = Math.round((sumVictoryRates / playersNum) * 1000) / 1000;
      res.json({ totalVictoryRate: totalVictoryRate })
      //Otra forma:
      /* res.json(await Game.findAll({
        attributes: [[sequelize.fn('AVG', sequelize.col('victory')), 'totalVictoryRate']]
      })) */
    } catch (error) {
      res.status(400).send(error);
    }
  }

//CONTROLLER ENDPOINT 8 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const getLoser = //Controller for endpoint 8 => GET /players/ranking/loser: retorna el jugador amb pitjor percentatge d’èxit  
  async (req, res) => {
    try {
      const minScore = await Player.min('victoryRate');
      const loser = await Player.findAll({ where: { victoryRate: minScore } });
      res.status(200).json( { loser } );
/*       const minScore = await Player.findAll({
        attributes: [[sequelize.fn('MIN', sequelize.col('victoryRate')), 'lowestScore']]
      });
      const loser = await Player.findAll({
        where: { //https://sequelize.org/api/v6/class/src/model.js~model
          victoryRate: { [Op.eq]: minScore[0].dataValues.lowestScore }
        }
      }); 
      res.json(loser); */
    } catch (error) {
      res.status(400).send(error);
    }
  }

//CONTROLLER ENDPOINT 9 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const getWinner = //Controller for endpoint 9 => GET /players/ranking/winner: retorna el jugador amb millor percentatge d’èxit
  async (req, res) => { //9
    try {
      const maxScore = await Player.max('victoryRate');
      const winner = await Player.findAll({ where: { victoryRate: maxScore } })
      res.status(200).json({ winner });
      /* const maxScore = await Player.findAll({
        attributes: [[sequelize.fn('MAX', sequelize.col('victoryRate')), 'highestScore']]
      }); */
      /* const winner = await Player.findOne({
        where: { //https://sequelize.org/api/v6/class/src/model.js~model
          //Model instances operate with the concept of a "dataValues" property, which stores the actual values represented by the instance.
          victoryRate: { [Op.eq]: maxScore[0].dataValues.highestScore }
        },
      }); */
    } catch (error) {
      res.status(400).send(error);
    }
  }

module.exports = {
    getGames,
    getScores,
    getLoser,
    getWinner
}