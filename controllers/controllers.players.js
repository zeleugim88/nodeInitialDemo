const { response, request } = require('express');

const postPlayers = (req = request, res = response) => { //1
  /*   console.log(req);
    console.log(req.body) */
    console.log(req.body)
    //TO DO: guardar DB 
    res.send("jitu");
  /*   res.json({
        msg: 'Player added',
        name: 'fake', //if empty, anonym
        id: "343",//add random
        date: "05-03-2021",//add date,
        games: []
    }); */
}

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