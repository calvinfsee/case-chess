import { useState, useCallback } from 'react';
import { Chess } from 'chess.js';
import { boardTiles } from '../utils.js';

export default function Board () {
  const [game, setGame] = useState(new Chess());
  const generateBoard = useCallback(() => {

  }, [game]);
  return (
    <div id='board'></div>
  );
}