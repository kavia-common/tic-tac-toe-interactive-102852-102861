import React from 'react';
import PropTypes from 'prop-types';

/**
 * Displays the scores for X, O, and Draws.
 */
// PUBLIC_INTERFACE
export default function ScorePanel({ scores }) {
  const x = Number.isFinite(scores?.X) ? scores.X : 0;
  const o = Number.isFinite(scores?.O) ? scores.O : 0;
  const draws = Number.isFinite(scores?.Draws) ? scores.Draws : 0;

  return (
    <div className="score" role="region" aria-label="Score panel">
      <div className="score-row">
        <div className="score-label">Player X</div>
        <div className="score-value" aria-live="polite">{x}</div>
      </div>
      <div className="score-row">
        <div className="score-label">Player O</div>
        <div className="score-value" aria-live="polite">{o}</div>
      </div>
      <div className="score-row">
        <div className="score-label">Draws</div>
        <div className="score-value" aria-live="polite">{draws}</div>
      </div>
    </div>
  );
}

ScorePanel.propTypes = {
  scores: PropTypes.shape({
    X: PropTypes.number,
    O: PropTypes.number,
    Draws: PropTypes.number,
  }).isRequired,
};
