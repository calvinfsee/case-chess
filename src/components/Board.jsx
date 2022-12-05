import { useState, useCallback } from 'react';
import { Chess } from 'chess.js';
import Square from './Square.jsx';
import { boardTiles } from '../utils.js';

export default function Board ({ color }) {
  const [game, setGame] = useState(new Chess());
  const generateBoard = useCallback(() => {
    return game.board().map((rowArr, rowNum) => (
      <div key={rowNum} className='row'>
        {rowArr.map((piece, colNum) =>
          <Square
            key={boardTiles[rowNum][colNum]}
            squareId={rowNum + colNum}
            square={boardTiles[rowNum][colNum]}
            piece={piece} />
        )}
        </div>
    ))
  }, [game]);
  return (
    <div id='board'>{generateBoard()}</div>
  );
}