var router = require('express').Router();
var chatsCtrl = require('../controllers/chats');

router.get('/', isLoggedIn, chatsCtrl.index);
router.post('/rooms', isLoggedIn, chatsCtrl.createRoom);


function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
} 
  
module.exports = router;