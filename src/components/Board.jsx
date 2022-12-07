import { useState, useCallback, useEffect, useMemo } from 'react';
import { Chess } from 'chess.js';
import Square from './Square.jsx';
import { socket } from '../connections/socket.js';
import { boardTiles } from '../utils.js';

export default function Board ({ pColor, pgn, gameid, setResult }) {
  const [game, setGame] = useState(new Chess());
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (pgn !== game.pgn()) {
      if (pgn === '') {
        setGame(new Chess());
      } else {
        const newGameState = new Chess();
        newGameState.load_pgn(pgn);
        if (game.history().length > newGameState.history().length) {
          const newMove = { pgn: game.pgn(), gameId: gameid };
          socket.emit('new move', newMove);
        } else {
          setGame(newGameState);
        }
      }
    }
  }, [pgn, game, setGame]);
  useEffect(() => {
    if (game.game_over()) {
      let result = 'tbd';
      const mate = game.in_checkmate();
      if (mate) {
        result = game.turn() === 'w' ? 'b' : 'w';
      } else {
        result = 'draw';
      }
      setResult((prev) => prev === 'tbd' ? result : prev);
  }
  }, [game, setResult]);

  const orientation = useMemo(() => {
    if (pColor === 'b') return { board: 'flipped-board', row: 'flipped-row'};
    return { board: 'board', row: 'row' };
  }, [pColor]);

  const generateBoard = useCallback(() => {
    return game.board().map((rowArr, rowNum) => (
      <div key={rowNum} className={orientation.row}>
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
  }, [game, setGame, selected, setSelected, pColor, orientation]);

  return (
    <div id={orientation.board}>{generateBoard()}</div>
  );
}