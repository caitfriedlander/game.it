var router = require('express').Router();
var gamesCtrl = require('../controllers/games');

router.get('/search', gamesCtrl.searchGames);
router.get('/', gamesCtrl.index);
router.get('/:apiId', gamesCtrl.show);
router.delete('/:id', gamesCtrl.delete);

module.exports = router;