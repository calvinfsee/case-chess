import React, { useEffect, useState } from 'react';
import { Chess } from 'chess.js';
import { socket } from '../connections/socket.js';
import Board from './Board.jsx';
import ResultModal from './ResultModal.jsx';

export default function GameContainer ({ username, gameid, pColor }) {
  const [pgn, setPgn] = useState('');
  const [result, setResult] = useState('tbd');
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    socket.on('start game', () => {
      setPgn('');
      setShowResult(false);
      setResult('tbd');
    });
  }, []);

  useEffect(() => {
    const unsubscribe = socket.on('opponent move', (data) => {
      setPgn(data.pgn);
    });
    return () => unsubscribe;
  }, [setPgn]);
  useEffect(() => {
    if (result !== 'tbd') {
      setShowResult(true);
    }
  }, [result]);

  return (
    <React.Fragment>
      <Board pColor={pColor} pgn={pgn} gameid={gameid} setResult={setResult} />
      {showResult ? <ResultModal result={result} setShowResult={setShowResult} username={username} gameid={gameid} /> : null}
    </React.Fragment>
  )
}