var Chat = require('../models/chat');
var User = require('../models/user');
var passport = require('passport');

module.exports = {
    index,
    show,
    create: findOrCreate
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

function findOrCreate(chatroomId) {
    return new Promise(function(resolve, reject) {
        Chat.findById({chatroomId}).populate('users').exec(function(err, chatroom) {
            if (err) return reject(err);
            if (chatroom) {
                resolve(chatroom);
            } else {
                Chat.create(req.params.user.id).exec((err, chat) => {
                    Chat.messages.push({content: req.body.content});
                    chat.save(err => {
                        res.redirect(`/chats/${user.id}`);
                    });
                });
            }
        });
    });
}