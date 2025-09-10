import React from 'react';
import PropTypes from 'prop-types';

const MODES = {
  LOCAL: 'local',
  AI: 'ai',
};

/**
 * Controls panel to switch mode and reset game/scores.
 */
// PUBLIC_INTERFACE
export default function Controls({
  mode,
  onModeChange,
  onResetRound,
  onResetScores,
  isBoardLocked,
}) {
  return (
    <div className="controls">
      <div>
        <div className="section-title" id="mode-select">Game Mode</div>
        <div className="mode-group" role="group" aria-labelledby="mode-select">
          <button
            className="btn"
            type="button"
            aria-pressed={mode === MODES.LOCAL}
            onClick={() => onModeChange(MODES.LOCAL)}
          >
            2 Players
          </button>
          <button
            className="btn"
            type="button"
            aria-pressed={mode === MODES.AI}
            onClick={() => onModeChange(MODES.AI)}
          >
            Vs Computer
          </button>
        </div>
      </div>

      <div>
        <div className="section-title">Actions</div>
        <div className="inline-actions">
          <button
            className="btn primary"
            type="button"
            onClick={onResetRound}
            aria-label="Reset current round"
          >
            Reset Round
          </button>
          <button
            className="btn secondary"
            type="button"
            onClick={onResetScores}
            aria-label="Reset scores"
          >
            Reset Scores
          </button>
        </div>
        {isBoardLocked && (
          <p className="subtitle" style={{ marginTop: 8 }}>
            Round finished. Start a new round!
          </p>
        )}
      </div>
    </div>
  );
}

Controls.propTypes = {
  mode: PropTypes.oneOf([MODES.LOCAL, MODES.AI]).isRequired,
  onModeChange: PropTypes.func.isRequired,
  onResetRound: PropTypes.func.isRequired,
  onResetScores: PropTypes.func.isRequired,
  isBoardLocked: PropTypes.bool,
};

Controls.defaultProps = {
  isBoardLocked: false,
};
