const { Router } = require('express');

const { postPlayers,
        putPlayers,
        postThrowDices,
        deletePlayerThrows,
        getPlayers,
        getGames,
        getScores,
        getLoser,
        getWinner
    } = require('../controllers/controllers.players.js');

const router = Router();

router.post('/', postPlayers); //1

router.put('/', putPlayers); //2

router.post('/:id/games', postThrowDices); //3 

router.delete('/:id/games', deletePlayerThrows ); //4

router.get('/', getPlayers ); //5

router.get('/:id/games', getGames ); //6

router.get('/ranking', getScores ); //7

router.get('/ranking/loser', getLoser ); //8

router.get('/ranking/winner', getWinner ); //9


module.exports = router;