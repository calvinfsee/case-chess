import { useMemo, useCallback } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { socket } from '../connections/socket.js';
const results = {
  w: 'White wins!',
  b: 'Black wins!',
  draw: 'Its a draw!'
}

export default function ResultModal ({ result, setShowResult, username, gameid }) {
  const closeModal = useCallback(() => {
    setShowResult(false);
  }, []);

  const requestRematch = useCallback(() => {
    socket.emit('rematch', { gameId: gameid, username });
  }, []);

  return (
    <div id='result-modal'>
      <div id='close-result'>
        <AiFillCloseCircle size={40} onClick={closeModal} />
      </div>
      {results[result]}
      <button id='rematch' onClick={requestRematch}>Rematch</button>
    </div>
  )
}