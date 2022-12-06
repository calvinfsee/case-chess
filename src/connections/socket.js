import io from 'socket.io-client';

const URL = '<BACKEND URL HERE>';

const socket = io(URL);

var mySocketId;

socket.on('createNewGame', statusUpdate => {
  mySocketId = statusUpdate.mySocketId
});

export {
  socket,
  mySocketId
};