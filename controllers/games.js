var Game = require('../models/game');
var User = require('../models/user');
var gameApi = require('../utilities/game-api');

module.exports = {
    index,
    new: newGame,
    create,
    show,
    delete: destroy,
    searchGames
}

// Index
function index(req, res, next) {
    var games = Game.find({}, function(err, games) {
        if (err) return next(err);
        res.render('games/index', { games });
    });
}

// New
function newGame(req, res, next) {
    res.render('games/new');
};

// Create
function create(req, res, next) {
    var body = req.body;

    var game = new Game(body);
    game.save(function(err) {
        if (err) return res.render('games/new');
        console.log(game);
        res.redirect('/games')
    });
}

// Show
function show(req, res, next) {
    Game.findById(req.params.id).populate('users').exec(function(err, game) {
        if (err) return res.render('games/index');
        res.render('games/show', {game});
    });
}

// Delete
function destroy(req, res, next) {
    game.findById(req.params.id, function(err, game){
        game.remove();
        res.redirect('/games');
    });
}

// Search

function searchGames(req, res, next) {
    console.log(req.query.title);
    gameApi.searchByTitle(req.query.title).then(games => {
        console.log(games);
        res.render('games/index', {gameData: games, user: req.user});
    });
}
