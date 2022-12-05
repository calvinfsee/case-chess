import { useMemo } from 'react';

export default function Square ({ squareId, square }) {
  const tileClr = useMemo(() => {
    if (squareId % 2 === 0) return 'light';
    return 'dark';
  }, [squareId]);

  return (
    <div className={'square ' + tileClr}></div>
  )
}