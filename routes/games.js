var router = require('express').Router();
var gamesCtrl = require('../controllers/games');

router.get('/search', isLoggedIn, gamesCtrl.searchGames);
router.get('/', isLoggedIn, gamesCtrl.index);
router.get('/:apiId', isLoggedIn, gamesCtrl.show);


function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }
  

module.exports = router;