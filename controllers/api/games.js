var Game = require('../../models/game');

module.exports = {
    getAllGames,
    getOneGame
}

function getAllGames(req, res) {
    Game.find({}, function(err, games) {
        if (err) return res.status(404).json(err)
        res.status(200).json(games);
    });
}

function getOneGame(req, res) {
    Game.findById(req.params.id, function(err, game) {
        if (err) return res.status(404).json(err);
        res.status(200).json(game);
    })
}