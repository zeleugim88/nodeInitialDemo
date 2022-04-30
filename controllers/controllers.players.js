const { response, request } = require('express');
const Player = require('../models/Player.js');
const Game = require('../models/Game.js');
const db  = require('../database/mysql.connection.js')

const postPlayers = //Controller for endpoint 1
async (req = request, res = response) => { 
    //TO DO: guardar DB 
    
    if (req.body.name == "ANÒNIM" || !req.body.name) {
        try {
            const newPlayer = await Player.create({
                name: "ANONIM"
            });
            res.status(201).json(newPlayer);
        } catch (error) {
            res.status(400).send(error)
        }
    }
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

    const putPlayers = //Controller for Endpoint 2
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


const postThrowDices = //Controller for endpoint 3
async (req = request, res = response) => { 

const diceRoll1 = Math.floor( Math.random() * 6 ) +1;
const diceRoll2 = Math.floor( Math.random() * 6 ) +1;
const score = diceRoll1 + diceRoll2;
const victory = score === 7 ? true : false;

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
        attributes: [
          [db.fn('avg', db.col('victory')), 'averageWin'],
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

const deletePlayerThrows = //Controller for endpoint 4
async (req, res) => { 
        const gamesToDelete = await Game.destroy({
          where: {
            player_id: req.params.id
          },
        });
        res.json({ "Request fulfilled": `${gamesToDelete} games from Player ${req.params.id} deleted!` });
}

const getPlayers = (req, res) => { //5
    res.json({
        msg: "List collection instead of document"
    });
}

const getRanking = (req, res) => { //6
        res.json({
            msg: 'Lista de jugadas de un jugador'
        });
}

const getScores = (req, res) => { //7

        res.json({
            msg: 'Media de puntuaciones'
        });
}

const getLoser = (req, res) => { //8

    res.json({
        msg: 'Perdedor'
    });
}

const getWinner = (req, res) => { //9
    res.json({
        msg: 'Ganador'
    });
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