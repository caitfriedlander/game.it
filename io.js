// io.js

var io = require('socket.io')();

// Listen for new connections from clients (socket)
io.on('connection', function (socket) {
  console.log('Client connected to socket.io!');
});

// object to track player's initials
var players = {};

io.on('connection', function (socket) {

    socket.on('register-player', function (initials) {
      // each socket has a unique id
      players[socket.id] = initials;
      io.emit('update-player-list', Object.keys(players).map(id => players[id]));
    });

    // when the player disconnects, remove key & notify clients
    socket.on('disconnect', function () {
      delete players[socket.id];
      io.emit('update-player-list', Object.keys(players).map(id => players[id]));
    });

});

module.exports = io;