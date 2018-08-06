var Chat = require('../models/chat');
var User = require('../models/user');

module.exports = {
    index,
    show
}

// Index
function index(req, res, next) {
    var chats = Chat.find({}, function(err, chats) {
        if (err) return next(err);
        res.render('chats/index', { chats });
    });
}

function show(req, res, next) {
    Chat.findById(req.params.id).populate('users').exec(function(err, chat) {
        if (err) return res.render('chats/index');
        res.render('chats/show', {chats});
    });
}