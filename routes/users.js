var express = require('express');
var router = express.Router();
var passport = require('passport');
var usersCtrl = require('../controllers/users');

router.get('/', usersCtrl.index);
router.get('/library', isUser, usersCtrl.showLibrary);
router.get('/edit', isLoggedIn, usersCtrl.edit)
router.get('/profile', usersCtrl.show);
router.get('/:id', usersCtrl.show);
router.put('/', usersCtrl.update);
router.delete('/:id', usersCtrl.delete);
router.get('/:id/games/new', usersCtrl.newLibItem)
router.post('/:userId/games/:gameId', usersCtrl.addLibItem)
router.delete('/:userId/games/:gameId', usersCtrl.removeLibItem)

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

function isUser(req, res, next) {
  if ( req.user ) return next();
  res.redirect('/');
}

module.exports = router;
