var router = require('express').Router();
var gamesCtrl = require('../controllers/games');

router.get('/search', gamesCtrl.searchGames);
router.get('/', gamesCtrl.index);
router.get('/:apiId', gamesCtrl.show);


function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }
  

module.exports = router;