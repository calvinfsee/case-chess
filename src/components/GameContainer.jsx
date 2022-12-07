import React, { useEffect, useState } from 'react';
import { Chess } from 'chess.js';
import { socket } from '../connections/socket.js';
import Board from './Board.jsx';
import ResultModal from './ResultModal.jsx';

export default function GameContainer ({ username, gameid, pColor }) {
  const [pgn, setPgn] = useState('');
  const [result, setResult] = useState('tbd');
  const [rematch, setRematch] = useState(false);
  const [showResult, setShowResult] = useState(false);
  useEffect(() => {
    //! Need to set it so that the colors are reversed on rematch
    socket.on('rematch accepted', req => {
      setPgn('');
      setResult('tbd');
      setShowResult(false);
      setRematch(false);
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
  useEffect(() => {
    socket.on('request rematch', (req) => {
      if (req.username !== username && rematch) {
        socket.emit('rematch accepted', { gameId: gameid });
      }
    })
  }, [rematch]);

  return (
    <React.Fragment>
      <Board pColor={pColor} pgn={pgn} gameid={gameid} setResult={setResult} />
      {showResult ? <ResultModal result={result} setShowResult={setShowResult} rematch={rematch} setRematch={setRematch} username={username} gameid={gameid} /> : null}
    </React.Fragment>
  )
}