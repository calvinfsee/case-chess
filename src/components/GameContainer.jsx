import React from 'react';
import { socket } from '../connections/socket.js';
import { useParams } from 'react-router-dom';
import Board from './Board.jsx';

function joinChessGame (gameId, userName, isCreator) {
  const data = { gameId, userName, isCreator };
  socket.emit('playerJoinGame', data);
}

export default function GameContainer ({ setUsername, username, isCreator }) {
  const { gameid } = useParams();
  useEffect(() => {
    if (gameid) joinChessGame(gameid, username, isCreator)
  }, [gameid]);

  return (
    <React.Fragment>
      <Board />
    </React.Fragment>
  );
}