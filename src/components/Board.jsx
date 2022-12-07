import { useState, useCallback, useEffect } from 'react';
import { Chess } from 'chess.js';
import Square from './Square.jsx';
import { socket } from '../connections/socket.js';
import { boardTiles } from '../utils.js';

export default function Board ({ pColor, pgn, gameid }) {
  const [game, setGame] = useState(new Chess());
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (pgn !== game.pgn()) {
      const newGameState = new Chess();
      newGameState.load_pgn(pgn);
      if (game.history().length > newGameState.history().length) {
        const newMove = { pgn: game.pgn(), gameId: gameid };
        socket.emit('new move', newMove);
      } else {
        setGame(newGameState);
      }
    }
  }, [pgn, game, setGame]);

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