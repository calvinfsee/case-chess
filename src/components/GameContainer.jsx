import React, { useEffect, useState } from 'react';
import Board from './Board.jsx';
import { socket } from '../connections/socket.js';


export default function GameContainer ({ username, gameid, pColor }) {
  // const [playerColor, setPlayerColor] = useState('');
  const [pgn, setPgn] = useState('');
  useEffect(() => {
    // socket.on('start game', (data) => {
    //   console.log('start!');
    //   setPlayerColor(() => {
    //     if (data.opponent === username) return data.oColor;
    //     return data.oColor === 'w' ? 'b' : 'w';
    //   });
    // });
    socket.on('playerJoinedRoom', statusUpdate => {
      // if (socket.id === statusUpdate.mySocketId) console.log('player joined room!');
    });
  }, []);
  useEffect(() => {
    const unsubscribe = socket.on('opponent move', (data) => {
      setPgn(data.pgn);
    });
    return () => unsubscribe;
  }, [setPgn]);

  return (
    <React.Fragment>
      <Board pColor={pColor} pgn={pgn} gameid={gameid} />
    </React.Fragment>
  )
}