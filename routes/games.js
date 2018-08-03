var router = require('express').Router();
var gamesCtrl = require('../controllers/games');

router.get('/search', gamesCtrl.searchGames);

module.exports = router;