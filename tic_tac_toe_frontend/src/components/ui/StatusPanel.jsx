import React from 'react';
import PropTypes from 'prop-types';

/**
 * Announces the current status (turn/win/draw) with aria-live politeness.
 */
// PUBLIC_INTERFACE
export default function StatusPanel({ status, winner }) {
  let className = 'status-line';
  if (winner === 'X' || winner === 'O') className += ' win';
  if (winner === null && status.toLowerCase().includes('draw')) className += ' draw';

  return (
    <div className="status" role="status" aria-live="polite">
      <div className={className}>
        {status}
      </div>
    </div>
  );
}

StatusPanel.propTypes = {
  status: PropTypes.string.isRequired,
  winner: PropTypes.oneOf([null, 'X', 'O']),
};

StatusPanel.defaultProps = {
  winner: null,
};
