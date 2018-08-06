document.addEventListener("DOMContentLoaded", function() {

    // get our connection to the socket.io server
    var socket = io.connect('http://localhost:3000');
    console.log(socket);

});