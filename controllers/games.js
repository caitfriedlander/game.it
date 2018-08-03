var Game = require('../models/game');
var User = require('../models/user');
var gameApi = require('../utilities/game-api');

module.exports = {
    searchGames
}

function searchGames(req, res, next) {
    gameApi.searchByTitle(req.query.title).then(games => {
        console.log(games);
        res.redirect('/');
    });
}