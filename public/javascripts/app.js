document.addEventListener("DOMContentLoaded", function () {
  var messages = document.getElementById('messages');
  var newMsg = document.getElementById('new-msg');
  var userName = document.getElementById('user-name');
  var sendBtn = document.getElementById('btn-send-msg');

  var socket = io();
  socket.on('add-message', function (data) {
    addMessage(data);
  });

  sendBtn.addEventListener('click', function () {
    socket.emit('add-message', {
      name: userName.innerHTML,
      msg: newMsg.value
    });
    newMsg.value = '';
  });

  newMsg.addEventListener('keyup', function(event) {
    event.preventDefault();
      if (event.keyCode === 13) {
        sendBtn.click();
      }
  });

  function addMessage(data) {
    messages.innerHTML += ['<li><strong>', data.name, ':</strong> ', data.msg + '</li>'].join('');
  }

});

