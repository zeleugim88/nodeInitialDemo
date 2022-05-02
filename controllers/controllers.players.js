const { response, request } = require('express');
const Player = require('../models/Player.js');
const Game = require('../models/Game.js');
const sequelize = require('../database/mysql.connection.js') // This is the main class, the entry point to sequelize.
//Sequalize methods => https://sequelize.org/api/v6/class/src/sequelize.js~sequelize
const { Op } = require('sequelize'); //Sequelize provides several operators "Op" => where ([Op.and]:, [Op.or]); 
//some attributes ([Op.eq], [Op.ne]...) https://sequelize.org/docs/v6/core-concepts/model-querying-basics/

const postPlayers = //Controller for endpoint 1 => POST /players: crea un jugador
  async (req = request, res = response) => {
    //If user introduces either no name or "ANÒNIM", an anonymous player is created. 
    if (req.body.name == "ANÒNIM" || !req.body.name) {
      try {
        const newPlayer = await Player.create({
          name: "ANONIM"
        });
        res.status(201).json(newPlayer);
      } catch (error) {
        res.status(400).send(error)
      }
    } //if the name is already being used, a digit is added at the end of the user name
    else if (req.body.name) {
      try {
        let i = "";
        let newName = "";
        let foundPlayer = "";
        do {
          newName = req.body.name + String(i);
          foundPlayer = await Player.findOne({ where: { name: newName } });
          i++
        }
        while (foundPlayer !== null); //error
        const newPlayer = await Player.create({
          name: newName
        });
        res.status(200).json(newPlayer);
      } catch (error) {
        console.log(error)
        res.status(400).send(error)
      }
    };
  };

const putPlayers = //Controller for Endpoint 2 => PUT /players: modifica el nom del jugador
  async (req = request, res = response) => {
    if (req.body.newName && req.body.name) {
      let foundPlayer = "";
      try {
        foundPlayer = await Player.findOne(
          { where: { name: req.body.name } }
        )
      } catch (error) {
        console.log(error)
        res.status(400).send(error)
      }

      !foundPlayer ?
        res.status(404).json({ "Error": "The user does not exist in the database. Please introduce another user" }) :
        (await foundPlayer.update({ name: req.body.newName }), res.status(200).json(foundPlayer))

    } else { console.log(res.status(400).json({ "Error": "Introduce both a new name and the old name to update" })) }
  }


const postThrowDices = //Controller for endpoint 3 => POST /players/{id}/games: un jugador específic realitza una tirada
  async (req = request, res = response) => {

    //Throw two dices. If total socre is 7, the player has won the game. 
    const diceRoll1 = Math.floor(Math.random() * 6) + 1;
    const diceRoll2 = Math.floor(Math.random() * 6) + 1;
    const score = diceRoll1 + diceRoll2;
    const victory = score === 7 ? true : false;

    //Search player in database
    let foundPlayer = "";
    try {
      foundPlayer = await Player.findOne(
        { where: { id: req.params.id } } 
        //for the route /player/:id, the “id” property is available as req.params.id.
        //Another possibility: use "name: req.body.name" to double check with name in JSON
      )
    } catch (error) {
      console.log(error)
      res.status(400).send(error)
    }

    //¿Player found? => 1) Create new Game + 2) Update average victory rate aggregation in Player's registry
    //1) Create new Game
    if (foundPlayer) {
      try {
        const newGame = await Game.create({
          player_id: req.params.id,
          score: score,
          victory: victory
        });

        res.status(200).json(newGame);
      }
      catch (error) {
        console.log(error)
        res.status(400).send(error)
      }

      // 2.1) Create "average victory rate" aggregation
      //sequelize.fn => aggregation with avg, count, max, min, sum => https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
      //sequelize.col => https://sequelize.org/api/v6/class/src/sequelize.js~sequelize
      let victoryRateCalculation = await Game.findAll({
        attributes: [[sequelize.fn('avg', sequelize.col('victory')), 'avgSuccess'],],
        where: { player_id: req.params.id }
      });

      //Otra forma??:
    /*   const gamesNum = await Player.count();
      const sumVictoryRates = await Player.sum('victoryRate');
      const victoryRateCalculation = Math.round((sumVictoryRates / gamesNum) * 1000) / 1000;
      res.json({ totalVictoryRate: totalVictoryRate }) */

    
      //const victoryRate = Number(victoryRateCalculation[0].dataValues.avgSuccess); 
      const victoryRate = Number(victoryRateCalculation[0].get({ plain: false }).avgSuccess)
      console.log(victoryRateCalculation)
      console.log(typeof(victoryRate))
      console.log(victoryRate)
      
      
      //2.2 Update Player with "average victory rate" aggregation
      await Player.update({
        victoryRate: victoryRate
      }, { where: { id: req.params.id } });

    } else { //¿Player not found? 404 Error
      res.status(404).json({ "Error": "The user does not exist in the database. Please introduce another user" })
    }
  }

const deletePlayerThrows = //Controller for endpoint 4 => DELETE /players/{id}/games: elimina les tirades del jugador
  async (req, res) => {
    const gamesToDelete = await Game.destroy({
      where: { player_id: req.params.id },
    });
    res.json({ "Request fulfilled": `${gamesToDelete} games from Player ${req.params.id} deleted!` });
  }

const getPlayers = //Controller for endpoint 5 => GET /players: retorna el llistat de tots els jugadors del sistema amb el seu percentatge mig d’èxits
  async (req, res) => {
    try {
      res.json(await Player.findAll())
    } catch (error) { res.status(400).send(error) }
  };

const getGames = //Controller for endpoint 6 => GET /players/{id}/games: retorna el llistat de jugades per un jugador.
  async (req, res) => {
    try {
      res.json(await Game.findAll({ where: { player_id: req.params.id } }))
    } catch (error) {
      res.status(404).send(error);
    }
  }

const getScores =
  async (req, res) => { //Controller for endpoint 7 => GET /players/ranking: retorna el percentatge mig d’èxits del conjunt de tots els jugadors
    try {
      /* res.json(await Game.findAll({
        attributes: [[sequelize.fn('AVG', sequelize.col('victory')), 'totalVictoryRate']]
      })) */
      const playersNum = await Player.count();
      const sumVictoryRates = await Player.sum('victoryRate');
      const totalVictoryRate = Math.round((sumVictoryRates / playersNum) * 1000) / 1000;
      res.json({ totalVictoryRate: totalVictoryRate })
    } catch (error) {
      res.status(400).send(error);
    }
  }

  //Other option for getScores: 
/*    const playersNum = await Player.count();
      const sumVictoryRates = await Player.sum('victoryRate');
      const totalVictoryRate = sumVictoryRates / playersNum; */

const getLoser = //Controller for endpoint 8 => GET /players/ranking/loser: retorna el jugador amb pitjor percentatge d’èxit  
  async (req, res) => {
    try {
      /* const minScore = await Player.min('victoryRate');
      console.log(minScore)
      const loser = await Player.findAll({ where: { victoryRate: minScore } })
      console.log(loser)
      res.status(200).json( { loser } ); */
      const minScore = await Player.findAll({
        attributes: [[sequelize.fn('MIN', sequelize.col('victoryRate')), 'lowestScore']]
      });
      console.log(1)
      console.log(minScore);
      const loser = await Player.findAll({
        where: { //https://sequelize.org/api/v6/class/src/model.js~model
          //Model instances operate with the concept of a "dataValues" property, which stores the actual values represented by the instance.
          victoryRate: { [Op.eq]: minScore[0].dataValues.lowestScore }
          //victoryRate: 0.0714 //minScore[0].dataValues.lowestScore
        }
      });
      res.json(loser);
    } catch (error) {
      res.status(400).send(error);
    }
  }

/*   let victoryRateCalculation = await Game.findAll({
    attributes: [[sequelize.fn('avg', sequelize.col('victory')), 'avgSuccess'],],
    where: { player_id: req.params.id }
  });

  const victoryRate = victoryRateCalculation[0].dataValues.avgSuccess; */

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
  postPlayers,
  putPlayers,
  postThrowDices,
  deletePlayerThrows,
  getPlayers,
  getGames,
  getScores,
  getLoser,
  getWinner
};