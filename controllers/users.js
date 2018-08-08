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
    removeLibItem,
    showLibrary
}

// Index
function index(req, res, next) {
    var users = User.find({}, function (err, users) {
        res.render('users/index', { user: req.user, users });
    });
}

// Welcome
function welcome(req, res, next) {
    if (req.user && !req.user.username) {
        res.redirect('/users/edit');
    } else {
        User.find({}, function (err, users) {
            res.render('index', { user: req.user});
        });
    }
}

// Update
function update(req, res, next) {
    var body = req.body;
    console.log(req.params.username);
    if (!body.platforms) {
        body.platforms = []
    }
    if (req.params.username) {
        User.findByIdAndUpdate(req.session.passport.user, body, {new: true}, function(err, user) {
            if (err) return res.status(404).json(err);
            res.render('users/show', {user});
        });
    } else {
        User.findByIdAndUpdate(req.session.passport.user, body, {new: true}, function(err, user) {
            if (err) return res.status(404).json(err);
            res.render('users/library', {user});
        });
    }
}

// Edit
function edit(req, res, next) {
    console.log(req.user);
    res.render('users/edit', {user: req.user});
}

// Show
function show(req, res, next) {
    var id = req.params.id || req.user.id;
    User.findById(id).populate('games').exec(function(err, user) {
        if (err) return res.render('users/index');
        res.render('users/show', {user, loggedInUser: req.user});
    });
}

// Delete
function destroy(req, res, next) {
    User.findById(req.params.id, function(err, user) {
        user.remove();
        res.redirect('/users');
    });
}

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

// Show Library
function showLibrary(req, res, next) {
    req.user.populate('games', function(err, user) {
        console.log(req.user)
        if (err) return res.render('users/show');
        res.render('users/library', {user: req.user});
    });
}