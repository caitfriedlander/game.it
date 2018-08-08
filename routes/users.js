var express = require('express');
var router = express.Router();
var passport = require('passport');
var usersCtrl = require('../controllers/users');

router.get('/', isLoggedIn, usersCtrl.index);
router.get('/', isLoggedIn, usersCtrl.welcome);
router.get('/', isLoggedIn, usersCtrl.show);
router.get('/edit', isLoggedIn, usersCtrl.edit)
router.get('/profile', isLoggedIn, usersCtrl.show);
router.get('/:id', isLoggedIn, usersCtrl.show);
router.put('/', isLoggedIn, usersCtrl.update);
router.delete('/:id', isLoggedIn, usersCtrl.delete);
router.get('/:id/games/new', isLoggedIn, usersCtrl.newLibItem)
router.post('/:userId/games/:gameId', isLoggedIn, usersCtrl.addLibItem)
router.delete('/:userId/games/:gameId', isLoggedIn, usersCtrl.removeLibItem)

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}


module.exports = router;
