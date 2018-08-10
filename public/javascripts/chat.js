var socket = io();

socket.on('add-message', function (data) {
  console.log(data);
  var ul = document.querySelector(`#room-${data.roomId} ul`);
  var msg = data.username === username ? 
    `<span class="chat-contents">${data.message} &nbsp; &nbsp; <strong>${data.username}</strong></span>`
    :
    `<span class="chat-contents"><strong>${data.username}</strong> &nbsp; &nbsp; ${data.message}</span>`;
  ul.innerHTML += `
    <li id="chat-li" class="${data.username === username ? 'user-chat' : 'guest-chat'}">
      <br>
      <span class="chat-contents chat-time">${new Date(data.createdAt).toLocaleString()}</span>
      ${msg}
    </li>
  `;
  var div = document.querySelector(`#room-${data.roomId}`);
  div.scrollTop = div.scrollHeight;
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
