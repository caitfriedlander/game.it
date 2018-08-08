var Chat = require('../models/chat');
var User = require('../models/user');
var passport = require('passport');

module.exports = {
    index,
    show,
    create
}

// Index
function index(req, res, next) {
    User.findById(req.session.passport.user, function(err, user) {
        // var users;
        User.find({}, function(err, users) {
            // users = users;
            var chats = Chat.find({}, function(err, chats) {
                if (err) return next(err);
                // console.log(users);
                res.render('chats/index', { chats, user, users });
            });
        });
    });
}

function show(req, res, next) {
    Chat.findById(req.params.id).populate('users').exec(function(err, chat) {
        if (err) return res.render('chats/index');
        res.render('chats/show', {chats});
    });
}

function create(req, res) {
    var body = req.body;
    Chat.create({})
}