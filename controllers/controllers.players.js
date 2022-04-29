const { response, request } = require('express');
const Player = require('../models/Player.js');

const postPlayers = async (req = request, res = response) => { //1
    //TO DO: guardar DB 
    
    if (req.body.name == "ANÒNIM" || !req.body.name) {
        try {
            const newPlayer = await Player.create({
                name: "ANONIM"
            });
            res.status(201).json(newPlayer);
        } catch (error) {
            console.log(1)
            res.status(400).send(error)
        }
    }
        else if (req.body.name) {
            try {
                let i = ""; 
                let newName = "";
                let searchName = "";
                do {
                    newName = req.body.name + String(i);
                    searchName = await Player.findOne({ where: { name: newName }});
                    console.log("searchName:"+searchName);
                    i++
                    }
                while (searchName !== null); //error
                const newPlayer = await Player.create({ //ERRORRRRRRRRRRRRRRRRRRRR
                    name: newName
                });
                res.status(200).json(newPlayer);
            } catch (error) {
                console.log(error)
                res.status(400).send(error)
            }
        };
    };
 /*       
        
          } else if (req.body.name) {
            try {
              const player = await Player.findOne({ where: { name: req.body.name }});
              if (player) {
                res.status(400).json({ "Error":"User already exists" });
              } else {
                const player = await Player.create({
                  name: req.body.name,
                });
        
                res.status(200).json(player);
              }
            } catch (error) {
              if (error.errors[0].message) {
                res.status(400).send(error.errors[0].message);
              } else {
                res.status(400).send(error);
              }
            }
          }
        }); */
    
    
  /*   res.json({
        msg: 'Player added',
        name: 'fake', //if empty, anonym
        id: "343",//add random
        date: "05-03-2021",//add date,
        games: []
    }); */

const putPlayers = (req, res) => { //2
        //st { name } = req.body;
    //TO DO: update DB 
    res.json({
        msg: 'Player modified',
        name: 'fake', //modified name
        id: "343",//
        date: "05-03-2021",//
        games: []
    });
}

const postThrowDices = (req, res) => { //3

    //TO DO: play
    res.json({
        msg: 'Player modified',
        name: "Pepito", //
        id: "343",//
        date: "05-03-2021",//
        games: ["añadir victoria"], //añadir victoria
        victory: "true"
    });
}

const deletePlayerThrows = (req, res) => { //4
        const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

        res.json({
            msg: 'Player modified',
            name: "Pepito", //
            id: "343",//
            date: "05-03-2021",//
            games: ["resetear array"] //resetear array
        });
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