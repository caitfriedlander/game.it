var router = require('express').Router();
var usersCtrl = require('../controllers/users');
var passport = require('passport');

router.get('/', usersCtrl.index);

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/',
    failureRedirect : '/'
  }
));

// LOGOUT
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// LOGIN/LOGOUT UI
router.get('/', function(req, res) {
  res.render('index', { user: req.user });
});

module.exports = router;
