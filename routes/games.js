var router = require('express').Router();
var gamesCtrl = require('../controllers/games');

router.get('/search', gamesCtrl.searchGames);
router.get('/', gamesCtrl.index);
router.get('/new', gamesCtrl.new);
router.post('/', gamesCtrl.create);
router.get('/:id', gamesCtrl.show);
router.delete('/:id', gamesCtrl.delete);

module.exports = router;