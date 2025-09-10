const LINES = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6],         // diagonals
];

// PUBLIC_INTERFACE
export function calculateWinner(squares) {
  for (const [a,b,c] of LINES) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a,b,c] };
    }
  }
  return { winner: null, line: [] };
}

// PUBLIC_INTERFACE
export function isBoardFull(squares) {
  return squares.every(Boolean);
}

// PUBLIC_INTERFACE
export function getAvailableMoves(squares) {
  const moves = [];
  for (let i = 0; i < squares.length; i += 1) {
    if (!squares[i]) moves.push(i);
  }
  return moves;
}

// PUBLIC_INTERFACE
export function getBestMoveBasic(squares, ai = 'O', human = 'X') {
  // 1. Can AI win?
  const winMove = findWinningMove(squares, ai);
  if (winMove != null) return winMove;
  // 2. Can AI block human win?
  const blockMove = findWinningMove(squares, human);
  if (blockMove != null) return blockMove;
  // 3. Take center if free
  if (!squares[4]) return 4;
  // 4. Take a corner if available
  const corners = [0,2,6,8].filter((i) => !squares[i]);
  if (corners.length) return corners[0];
  // 5. Take any side
  const sides = [1,3,5,7].filter((i) => !squares[i]);
  if (sides.length) return sides[0];
  return null;
}

function findWinningMove(squares, player) {
  for (const [a,b,c] of LINES) {
    const line = [squares[a], squares[b], squares[c]];
    const countPlayer = line.filter((v) => v === player).length;
    const countEmpty = line.filter((v) => !v).length;
    if (countPlayer === 2 && countEmpty === 1) {
      if (!squares[a]) return a;
      if (!squares[b]) return b;
      if (!squares[c]) return c;
    }
  }
  return null;
}
