const { Router } = require('express');

const { postPlayers,
        putPlayers,
        postThrowDices,
        deletePlayerThrows,
        getPlayers,
    } = require('../controllers/controllers.players.js');

const {
    getGames,
    getScores,
    getLoser,
    getWinner
} = require('../controllers/controllers.rankings.js')

//Routes
const main = '/';
const idGames = '/:id/games';
const ranking = '/ranking';
const loserRanking = '/ranking/loser';
const winnerRanking = '/ranking/winner';

const router = Router();

router.post(main, postPlayers); //1

router.put(main, putPlayers); //2

router.post(idGames, postThrowDices); //3 

router.delete(idGames, deletePlayerThrows ); //4

router.get(main, getPlayers ); //5

router.get(idGames, getGames ); //6

router.get(ranking, getScores ); //7

router.get(loserRanking, getLoser ); //8

router.get(winnerRanking, getWinner ); //9


module.exports = router;