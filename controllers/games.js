var Game = require('../models/game');
var User = require('../models/user');
var gameApi = require('../utilities/game-api');

module.exports = {
    index,
    show,
    searchGames
}

// Index
function index(req, res, next) {
    var games = Game.find({}, (err, games) => {
        if (err) return next(err);
        res.render('games/index', { games, user: req.user });
    });
}

// Show
function show(req, res, next) {
    findOrCreate(req.params.apiId)
    .then(game => {
        res.render('games/show', { user: req.user, game, platforms: game.platforms });
    })
    .catch(err => {
        next(err)
    });
}

// Search
function searchGames(req, res, next) {
    gameApi.searchByTitle(req.query.title).then(games => {
        res.render('games/index', {gameData: games, user: req.user});
    });
}

// Utility Functions

function findOrCreate(apiId) {
    return new Promise(function(resolve, reject) {
        Game.findOne({apiId}).populate('gameUsers').exec(function(err, game) {
            if (err) return reject(err);
            if (game) {
                if (game.platforms[0] === undefined) {
                    gameApi.searchOneGame(apiId).then(gameData => {
                        game.platforms = gameData.platforms
                    });
                    game.save(function(err) {
                        if (err) return reject(err);
                        resolve(game);
                    });
                    resolve(game);
                } else {
                }
                resolve(game);
            } else {
                gameApi.searchOneGame(apiId).then(gameData => {
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