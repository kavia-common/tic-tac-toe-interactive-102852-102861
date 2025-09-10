import React from 'react';
import PropTypes from 'prop-types';

/**
 * Single cell button in the Tic Tac Toe board.
 * Accessible via role="gridcell" and keyboard support.
 */
export default function Cell({
  index,
  value,
  onClick,
  disabled,
  isWinning,
  buttonRef,
  onKeyNavigate,
}) {
  const label = value ? `Cell ${index + 1}, ${value}` : `Cell ${index + 1}, empty`;
  return (
    <button
      ref={buttonRef}
      type="button"
      className={`cell${disabled ? ' disabled' : ''}`}
      onClick={onClick}
      onKeyDown={(e) => onKeyNavigate(index, e)}
      aria-label={label}
      aria-disabled={disabled}
      role="gridcell"
      data-winning={isWinning ? 'true' : 'false'}
    >
      {value ? <span className="mark" aria-hidden="true">{value}</span> : null}
    </button>
  );
}

Cell.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.oneOf([null, 'X', 'O']),
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  isWinning: PropTypes.bool,
  buttonRef: PropTypes.func,
  onKeyNavigate: PropTypes.func,
};

Cell.defaultProps = {
  value: null,
  disabled: false,
  isWinning: false,
  buttonRef: () => {},
  onKeyNavigate: () => {},
};
