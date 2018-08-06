var express = require('express');
var router = express.Router();
var passport = require('passport');
var usersCtrl = require('../controllers/users');

router.get('/', usersCtrl.index);
router.get('/edit', isLoggedIn, usersCtrl.profile)
router.get('/:id', usersCtrl.show);
router.put('/:id', usersCtrl.update);
router.delete('/:id', usersCtrl.delete);
router.get('/:id/games/new', usersCtrl.newLibItem)
router.post('/:userId/games/:gameId', usersCtrl.addLibItem)
router.delete('/:userId/games/:gameId', usersCtrl.removeLibItem)

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;
