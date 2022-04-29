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

    const putPlayers = async (req = request, res = response) => { //2
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