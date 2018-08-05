var User = require('../models/user');
var Game = require('../models/game');

module.exports = {
    index,
    new: newUser,
    create,
    show,
    delete: destroy,
    newLibItem,
    addLibItem,
    removeLibItem
}

// Index
function index(req, res, next) {
    var users = User.find({}, function(err, users) {
        if (err) return next(err);
        res.render('users/index', { users });
    });
    // res.send('respond with a resource');
}

// New
function newUser(req, res, next) {
    res.render('users/new');
}

// Create
function create(req, res, next) {
    var body = req.body;

    var user = new User(body);
    user.save(function(err) {
        if (err) return res.render('users/new');
        console.log(user);
        res.redirect('/users');
    });
}

// Show
function show(req, res, next) {
    User.findById(req.params.id).populate('games').exec(function(err, user) {
        if (err) return res.render('users/index');
        res.render('users/show', {user});
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
                game.users.push(req.params.userId);
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
                game.users.remove(req.params.userId);
                game.save(() => {
                    res.redirect(`/users/${user.id}`);
                });
            });
        });
    })
}