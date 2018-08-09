var User = require('../models/user');
var Game = require('../models/game');
var passport = require('passport');

module.exports = {
    index,
    welcome,
    show,
    update,
    edit,
    delete: destroy,
    newLibItem,
    addLibItem,
    removeLibItem
}

// Index
function index(req, res, next) {
    var users = User.find({}, function (err, users) {
        if (err) res.next(err);
        res.render('users/index', { user: req.user, users });
    });
}

// Welcome
function welcome(req, res, next) {
    if (req.user && !req.user.username) {
        res.redirect('/users/edit');
    } else {
        User.find({}, function (err, users) {
            Game.find({}, function (err, games) {
                res.render('index', { games, user: req.user});
            }).sort({gameUsers: -1}).limit(10);
        });
    }
}

// Update
function update(req, res, next) {
    var body = req.body;
    if (!body.platforms) {
        body.platforms = []
    }
    User.findByIdAndUpdate(req.session.passport.user, body, {new: true}, function(err, user) {
        if (err) return res.status(404).json(err);
        user.populate('games', function(err) {
            if (err) return res.render('error', {err});
            req.user.populate('games', function(err) {
                if (err) return res.render('error', {err});
                res.render('users/show', {user, loggedInUser: req.user});
            });
        });
    });
}

// Show
function show(req, res, next) {
    var id = req.params.id || req.user.id;
    User.findById(id).populate('games').exec(function(err, user) {
        if (err) return res.render('users/index');
        res.render('users/show', {user, loggedInUser: req.user});
    });
}

// Edit
function edit(req, res, next) {
    res.render('users/edit', {user: req.user});
}

// Delete
function destroy(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        user.remove();
        res.redirect('/users');
    });
}

// Library Functions

// New Library Item
function newLibItem(req, res) {
    Game.find({}).where('users').nin([req.params.id]).populate('users')
    .exec(function(err, games) {
        var user = req.params.id;
        res.render('users/library', {
            games,
            user,
            userId: req.params.id
        });
    });
}

// Add Item to Library
function addLibItem(req, res, next) {
    User.findById(req.params.userId, (err, user) => {
        user.games.push(req.params.gameId);
        user.save(() => {
            Game.findById(req.params.gameId, (err, game) => {
                game.gameUsers.push(req.params.userId);
                game.save(() => {
                    res.redirect(`/users/${user.id}`);
                });
            });
        });
    });
}

// Remove Item from Library
function removeLibItem(req, res) {
    User.findById(req.params.userId, (err, user) => {
        user.games.remove(req.params.gameId);
        user.save(() => {
            Game.findById(req.params.gameId, (err, game) => {
                game.gameUsers.remove(req.params.userId);
                game.save(() => {
                    res.redirect(`/users/${user.id}`);
                });
            });
        });
    })
}