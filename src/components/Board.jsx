import { useState, useCallback, useEffect } from 'react';
import { Chess } from 'chess.js';
import Square from './Square.jsx';
import { boardTiles } from '../utils.js';

export default function Board ({ pColor }) {
  const [game, setGame] = useState(new Chess());
  const [selected, setSelected] = useState(null);
  const generateBoard = useCallback(() => {
    return game.board().map((rowArr, rowNum) => (
      <div key={rowNum} className='row'>
        {rowArr.map((piece, colNum) =>
          <Square
            key={boardTiles[rowNum][colNum]}
            squareId={rowNum + colNum}
            square={boardTiles[rowNum][colNum]}
            piece={piece}
            pColor={pColor}
            game={game}
            setGame={setGame}
            selected={selected}
            setSelected={setSelected} />
        )}
        </div>
    ))
  }, [game, setGame, selected, setSelected, pColor]);

  return (
    <div id='board'>{generateBoard()}</div>
  );
}