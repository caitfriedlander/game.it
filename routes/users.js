var express = require('express');
var router = express.Router();
var usersCtrl = require('../controllers/users');

router.get('/', usersCtrl.index);
router.get('/:id', usersCtrl.show);
router.delete('/:id', usersCtrl.delete);
router.get('/:id/games/new', usersCtrl.newLibItem)
router.post('/:userId/games/:gameId', usersCtrl.addLibItem)
router.delete('/:userId/games/:gameId', usersCtrl.removeLibItem)

module.exports = router;
