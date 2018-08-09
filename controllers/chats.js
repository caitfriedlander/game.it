var User = require('../models/user');
var ChatRoom = require('../models/chat');
var passport = require('passport');


module.exports = {
    index,
    createRoom,
    destroyRoom
}

// Index
function index(req, res, next) {
    ChatRoom.find({users: req.user.id}).populate('users').exec((err, rooms) => {
        if (err) return next(err);
        var existingUsers = rooms.map(r => r.users.find(u => !u.equals(req.user.id)));
        User.find({_id: {$nin: existingUsers}}, function(err, users) {
            users.splice(users.findIndex(u => u.id === req.user.id), 1);
            res.render('chats/index', { rooms, user: req.user, users });
        })
    });
}

function destroyRoom(req, res) {
    ChatRoom.findByIdAndRemove(req.params.id, function(err, room) {
        res.redirect('/chats');
    });
}

function createRoom(req, res) {
    var room = new ChatRoom({
       users: [req.user.id, req.query.otherUser] 
    });
    room.save(function(err) {
        if (err) res.next(err);
        res.redirect('/chats');
    });
} 