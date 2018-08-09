var socket = io();

socket.on('add-message', function (data) {
  console.log(data);
  var ul = document.querySelector(`#room-${data.roomId} ul`);
  ul.innerHTML += `
    <li id="chat-li">
      <hr>
      <span class="chat-contents chat-time">${new Date(data.createdAt).toLocaleString()}</span>
      <span class="chat-contents">${data.username} &nbsp; &nbsp; ${data.message}</span>
    </li>
  `;
});

function sendChat(roomId) {
  console.log(roomId);
  var input = document.querySelector(`#room-${roomId} input`);
  socket.emit('add-message', {
    roomId: roomId,
    name: username,
    msg: input.value
  });
  input.value = '';
}
