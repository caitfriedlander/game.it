// io.js
var io = require('socket.io')();
var ChatRoom = require('./models/chat');

// Listen for new connections from clients (socket)
io.on('connection', function (socket) {

  socket.on('add-message', function (data) {
    ChatRoom.findById(data.roomId, function(err, room) {
      var chat = {
        username: data.name,
        message: data.msg
      };
      room.chats.push(chat);
      room.save(function() {
        chat.createdAt = room.chats[room.chats.length - 1].createdAt;
        chat.roomId = room.id;
        io.emit('add-message', chat);
      });
    });
  });

});

module.exports = io;