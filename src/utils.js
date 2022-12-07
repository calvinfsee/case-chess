import { socket } from './connections/socket.js';
export const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const boardTiles = [8, 7, 6, 5, 4, 3, 2, 1].map((row) => letters.map((c) => c + row));

export const joinChessGame = function (gameId, userName) {
  const data = { gameId, userName };
  socket.emit('playerJoinGame', data);
}
