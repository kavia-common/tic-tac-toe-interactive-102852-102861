import { calculateWinner, getBestMoveBasic, isBoardFull } from './gameUtils';

test('detects a winner on a row', () => {
  const board = ['X','X','X', null, null, null, null, null, null];
  const { winner, line } = calculateWinner(board);
  expect(winner).toBe('X');
  expect(line).toEqual([0,1,2]);
});

test('isBoardFull returns true for filled board', () => {
  const board = ['X','O','X','X','O','X','O','X','O'];
  expect(isBoardFull(board)).toBe(true);
});

test('AI blocks opponent immediate win', () => {
  // Human (X) has two in a row at positions 0 and 1, AI should play 2
  const board = ['X','X',null,null,'O',null,null,null,null];
  const move = getBestMoveBasic(board, 'O', 'X');
  expect(move).toBe(2);
});
