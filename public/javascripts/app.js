document.addEventListener("DOMContentLoaded", function() {

    // get our connection to the socket.io server
    var socket = io();
    console.log(socket);