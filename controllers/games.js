var Game = require('../models/game');
var User = require('../models/user');
var gameApi = require('../utilities/game-api');

module.exports = {
    index,
    show,
    delete: destroy,
    searchGames
}

// Index
function index(req, res, next) {
    var games = Game.find({}, function(err, games) {
        if (err) return next(err);
        res.render('games/index', { games, user: req.user });
    });
}

// Show
function show(req, res, next) {
    findOrCreate(req.params.apiId)
    .then(function(game) {
        res.render('games/show', { user: req.user, game });
    })
    .catch(function(err) {
        next(err)
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
    // console.log(req.query.title);
    gameApi.searchByTitle(req.query.title).then(games => {
        // console.log(games);
        res.render('games/index', {gameData: games, user: req.user});
    });
}

// Utility Functions

function findOrCreate(apiId) {
    return new Promise(function(resolve, reject) {
        Game.findOne({apiId}).populate('users').exec(function(err, game) {
            if (err) return reject(err);
            if (game) {
                resolve(game);
            } else {
                gameApi.searchOneGame(apiId).then(gameData => {
                    console.log("Creating Game:");
                    console.log(gameData);
                    var game = new Game({
                        apiId,
                        title: gameData.name,
                        description: gameData.summary,
                        platforms: gameData.platforms,
                        releaseDate: gameData.first_release_date,
                        coverImage: (gameData.cover && gameData.cover.url) || 'https://images.igdb.com/igdb/image/upload/t_cover_big/nocover_qhhlj6.jpg'
                    });
                    game.save(function(err) {
                        if (err) return reject(err);
                        resolve(game);
                    });
                });
            }
        });
    });
}