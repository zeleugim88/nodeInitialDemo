const { response, request } = require('express');
const Player = require('../models/Player.js');
const Game = require('../models/Game.js');
const sequelize  = require('../database/mysql.connection.js') // This is the main class, the entry point to sequelize.
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
                    foundPlayer = await Player.findOne({ where: { name: newName }});
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
                    {where: { name: req.body.name}}
                )
            } catch (error) {
                console.log(error)
                res.status(400).send(error)
            }

            !foundPlayer ? 
            res.status(404).json({ "Error": "The user does not exist in the database. Please introduce another user"}) :
             (await foundPlayer.update({ name: req.body.newName }), res.status(200).json(foundPlayer))
            
        } else {console.log(res.status(400).json({"Error": "Introduce both a new name and the old name to update"}))}
    }     


const postThrowDices = //Controller for endpoint 3 => POST /players/{id}/games: un jugador específic realitza una tirada
async (req = request, res = response) => { 

//Throw two dices. If total socre is 7, the player has won the game. 
const diceRoll1 = Math.floor( Math.random() * 6 ) +1;
const diceRoll2 = Math.floor( Math.random() * 6 ) +1;
const score = diceRoll1 + diceRoll2;
const victory = score === 7 ? true : false;

    let foundPlayer = "";
    try {
        foundPlayer = await Player.findOne(
            {where: { id: req.params.id}} //Another possibility: use "name: req.body.name" to double check with name in JSON
        )
    } catch (error) { 
        console.log(error)
        res.status(400).send(error)
    }

    !foundPlayer ? 
            res.status(404).json({ "Error": "The user does not exist in the database. Please introduce another user"}) :
             foundPlayer.id
    
    //Post in Game player.id and result + victory

try {
    //for the route /player/:id, the “id” property is available as req.params.id.
    const newGame = await Game.create({ 
        player_id: req.params.id, 
        score: score,
        victory: victory
});

res.status(200).json(newGame);} 
catch (error) {
    console.log(error)
    res.status(400).send(error)
}

      let victoryRateCalculation = await Game.findAll({
        //You can use "sequelize.fn" to do aggregation with avg, count, max, min, sum 
        //When using aggregation function, you must give it an alias to be able to access it from the model.  
        //sequelize.col => Creates an object which represents a column in the DB, this allows referencing another column in your query. 
        //This is often useful in conjunction with sequelize.fn
        attributes: [
          [sequelize.fn('avg', sequelize.col('victory')), 'averageWin'], 
        ],
        where: {
          player_id: req.params.id
        }
      });
      //VictoryRateCalculation & VictoryRate my own names => NO FUNCIONA - REHACER
      victoryRateCalculation = victoryRateCalculation[0].get({ plain: false }).averageWin
  
      await Player.update({
        victoryRate: victoryRateCalculation
      }, {
        where: {
          id: req.params.id
        }
      });
  
}

const deletePlayerThrows = //Controller for endpoint 4 => DELETE /players/{id}/games: elimina les tirades del jugador
async (req, res) => { 
        const gamesToDelete = await Game.destroy({
          where: {
            player_id: req.params.id
          },
        });
        res.json({ "Request fulfilled": `${gamesToDelete} games from Player ${req.params.id} deleted!` });
}

const getPlayers = //Controller for endpoint 5 => GET /players: retorna el llistat de tots els jugadors del sistema amb el seu percentatge mig d’èxits
async (req, res) => {
    try { res.json(await Player.findAll())
    } catch (error) { res.status(400).send(error) }
  };

const getRanking = //Controller for endpoint 6 => GET /players/{id}/games: retorna el llistat de jugades per un jugador.
async (req, res) => {
        try { res.json( await Game.findAll({ where : { player_id: req.params.id } }))
        } catch (error) {
          res.status(404).send(error);
        }
      }

const getScores = 
async (req, res) => { //Controller for endpoint 7 => GET /players/ranking: retorna el percentatge mig d’èxits del conjunt de tots els jugadors
    try {
        res.json( await Game.findAll({
            attributes: [ [sequelize.fn('AVG', sequelize.col('victory')), 'victory%'] ] }) )
      } catch (error) {
        res.status(400).send(error);
      }
}

const getLoser = //Controller for endpoint 8 => GET /players/ranking/loser: retorna el jugador amb pitjor percentatge d’èxit  
async (req, res) => { 
        try {
          const minScore = await Player.findAll({
            attributes: [ [sequelize.fn('MIN', sequelize.col('victoryRate')), 'lowestScore'] ]
          });
          const loser = await Player.findOne({
            where: { //https://sequelize.org/api/v6/class/src/model.js~model
              //Model instances operate with the concept of a "dataValues" property, which stores the actual values represented by the instance.
              victoryRate: { [Op.eq]: minScore[0].dataValues.lowestScore }
            },
          });     
          res.json(loser);
        } catch (error) {
          res.status(400).send(error);
        }
      }

const getWinner = //Controller for endpoint 9 => GET /players/ranking/winner: retorna el jugador amb millor percentatge d’èxit
async (req, res) => { //9
  try {
    const maxScore = await Player.findAll({
      attributes: [ [sequelize.fn('MAX', sequelize.col('victoryRate')), 'highestScore'] ]
    });
    const winner = await Player.findOne({
      where: { //https://sequelize.org/api/v6/class/src/model.js~model
        //Model instances operate with the concept of a "dataValues" property, which stores the actual values represented by the instance.
        victoryRate: { [Op.eq]: maxScore[0].dataValues.highestScore }
      },
    });     
    res.json(winner);
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
        getRanking,
        getScores,
        getLoser,
        getWinner
};