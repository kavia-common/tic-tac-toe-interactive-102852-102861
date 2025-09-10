import React from 'react';
import PropTypes from 'prop-types';
import Cell from './Cell';

/**
 * Board renders a 3x3 grid of Cells and wires move handlers and accessibility.
 */
export default function Board({
  board,
  onMove,
  disabled,
  winningLine,
  cellRefs,
  onKeyNavigate,
  currentPlayer,
}) {
  return (
    <div
      className="board"
      role="grid"
      aria-label="Tic Tac Toe board"
      aria-rowcount={3}
      aria-colcount={3}
      data-current-player={currentPlayer}
    >
      {board.map((value, idx) => {
        const isWinning = winningLine.includes(idx);
        return (
          <Cell
            key={idx}
            index={idx}
            value={value}
            onClick={() => onMove(idx)}
            disabled={disabled || Boolean(value)}
            isWinning={isWinning}
            buttonRef={(el) => { cellRefs.current[idx] = el; }}
            onKeyNavigate={onKeyNavigate}
          />
        );
      })}
    </div>
  );
}

Board.propTypes = {
  board: PropTypes.arrayOf(PropTypes.oneOf([null, 'X', 'O'])).isRequired,
  onMove: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  winningLine: PropTypes.arrayOf(PropTypes.number),
  cellRefs: PropTypes.shape({ current: PropTypes.array }),
  onKeyNavigate: PropTypes.func,
  currentPlayer: PropTypes.oneOf(['X', 'O']).isRequired,
};

Board.defaultProps = {
  disabled: false,
  winningLine: [],
  cellRefs: { current: [] },
  onKeyNavigate: () => {},
};
