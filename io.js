// io.js

var io = require('socket.io')();

// Listen for new connections from clients (socket)
io.on('connection', function (socket) {

  socket.on('add-message', function (data) {
    io.emit('add-message', data);
  });

});

module.exports = io;