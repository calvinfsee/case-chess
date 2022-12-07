import { useMemo, useState, useCallback } from 'react';
import { Chess } from 'chess.js';
import { FaChessBishop, FaChessKing, FaChessKnight, FaChessPawn, FaChessQueen, FaChessRook } from 'react-icons/fa';

const pieces = Object.freeze({
  b: FaChessBishop,
  k: FaChessKing,
  n: FaChessKnight,
  p: FaChessPawn,
  q: FaChessQueen,
  r: FaChessRook
});
const pieceStyle = {
  stroke: 'black',
  strokeWidth: '20',
  '&:hover': {
    stroke: 'white'
  }
}

export default function Square ({ squareId, square, piece, pColor, game, setGame, selected, setSelected }) {
  const PieceIcon = useMemo(() => {
    if (piece) return pieces[piece.type];
    return null;
  }, [piece]);

  const pieceClr = useMemo(() => {
    if (!piece) return '';
    return piece.color === 'w' ? ' white' : ' black';
  }, [piece]);

  const tileClr = useMemo(() => {
    if (pColor === 'b') {
      return squareId % 2 === 0 ? ' dark' : ' light';
    }
    if (squareId % 2 === 0) return ' light';
    return ' dark';
  }, [squareId]);

  const handleClick = useCallback(() => {
    if (selected && selected.color === pColor) {
      const moveObj = { from: selected.square, to: square };
      const pgn = game.pgn();
      const newGame = new Chess();
      newGame.load_pgn(pgn);
      const res = newGame.move(moveObj);
      if (res) {
        setGame(newGame);
        setSelected(null);
      } else {
        setSelected((prev) => piece && prev.color === piece.color ? piece : null);
      }
    } else if (piece && piece.color === pColor) {
      setSelected((prev) => prev && prev.square === square ? prev : piece);
    } else {
      setSelected((prev) => !prev ? prev : null);
    }
  }, [game, setGame, selected, setSelected, piece, pColor, square]);

  return (
    <div className={'square' + tileClr + pieceClr} onClick={handleClick}>
      {piece ? <PieceIcon size={60} style={pieceStyle} /> : null}
    </div>
  )
}