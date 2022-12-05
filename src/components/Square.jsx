import { useMemo } from 'react';
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

export default function Square ({ squareId, square, piece }) {
  const PieceIcon = useMemo(() => {
    if (piece) return pieces[piece.type];
    return null;
  }, [piece]);
  const pieceClr = useMemo(() => {
    if (!piece) return '';
    return piece.color === 'w' ? ' white' : ' black';
  }, [piece]);
  const tileClr = useMemo(() => {
    if (squareId % 2 === 0) return ' light';
    return ' dark';
  }, [squareId]);

  return (
    <div className={'square' + tileClr + pieceClr}>
      {piece ? <PieceIcon size={60} style={pieceStyle} /> : null}
    </div>
  )
}