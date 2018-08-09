var socket = io();

socket.on('add-message', function (data) {
  console.log(data);
  var ul = document.querySelector(`#room-${data.roomId} ul`);
  ul.innerHTML += `
    <li>
      <span>${new Date(data.createdAt).toLocaleString()}</span>
      <span>${data.username}</span>
      <span>${data.message}</span>
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
