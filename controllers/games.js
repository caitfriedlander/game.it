var Game = require('../models/game');
var User = require('../models/user');
var request = require('request');

function searchGames(req, res, next) {
    console.log(req.query);
    res.redirect('/');
}

module.exports = {
    searchGames
}