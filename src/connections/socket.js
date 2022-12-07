import io from 'socket.io-client';

const URL = 'http://localhost:3000/';

const socket = io(URL);

var mySocketId;

socket.on('createNewGame', statusUpdate => {
  console.log(statusUpdate.mySocketId);
  mySocketId = statusUpdate.mySocketId
});

export {
  socket,
  mySocketId
};