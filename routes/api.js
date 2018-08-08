var express = require('express');
var router = express.Router();
var gamesCtrl = require('../controllers/api/games');

router.get('/', gamesCtrl.getAllGames);

router.get('/:id', gamesCtrl.getOneGame);

module.exports = router;