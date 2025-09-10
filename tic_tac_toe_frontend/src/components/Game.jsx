import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Board from './board/Board';
import Controls from './ui/Controls';
import ScorePanel from './ui/ScorePanel';
import StatusPanel from './ui/StatusPanel';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { calculateWinner, getBestMoveBasic, isBoardFull } from '../utils/gameUtils';

/**
 * Game orchestrates all UI and logic for Tic Tac Toe including:
 * - 2-player and vs AI modes
 * - Turn handling and keyboard navigation focus management
 * - Persistent score tracking in localStorage
 * - Accessible status announcements via aria-live regions
 */
const defaultBoard = Array(9).fill(null);

const MODES = {
  LOCAL: 'local',
  AI: 'ai',
};

// PUBLIC_INTERFACE
export default function Game() {
  const [mode, setMode] = useLocalStorage('ttt_mode', MODES.LOCAL);
  const [board, setBoard] = useState(defaultBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [winnerInfo, setWinnerInfo] = useState({ winner: null, line: [] });
  const [scores, setScores] = useLocalStorage('ttt_scores', {
    X: 0,
    O: 0,
    Draws: 0,
  });

  // Manage focusable cells for keyboard navigation
  const cellRefs = useRef([]);
  const currentPlayer = xIsNext ? 'X' : 'O';

  // Evaluate game status
  const status = useMemo(() => {
    if (winnerInfo.winner) return `${winnerInfo.winner} wins!`;
    if (isBoardFull(board)) return 'Draw!';
    return `${currentPlayer}'s turn`;
  }, [board, currentPlayer, winnerInfo]);

  // Update winner/draw and scores when board changes
  useEffect(() => {
    const info = calculateWinner(board);
    if (info.winner) {
      setWinnerInfo(info);
      setScores((prev) => ({ ...prev, [info.winner]: (prev[info.winner] || 0) + 1 }));
      return;
    }
    if (isBoardFull(board)) {
      setWinnerInfo({ winner: null, line: [] });
      setScores((prev) => ({ ...prev, Draws: (prev.Draws || 0) + 1 }));
      return;
    }
    setWinnerInfo({ winner: null, line: [] });
  }, [board, setScores]);

  // AI move effect (basic: win > block > first available)
  useEffect(() => {
    const isAIsTurn = mode === MODES.AI && !winnerInfo.winner && !isBoardFull(board) && !xIsNext;
    if (!isAIsTurn) return;

    const id = setTimeout(() => {
      const move = getBestMoveBasic(board, 'O', 'X');
      if (move != null) {
        handleMove(move);
      }
    }, 300); // small delay for UX

    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board, xIsNext, mode, winnerInfo.winner]);

  const handleMove = useCallback((index) => {
    if (winnerInfo.winner || board[index]) return;
    if (mode === MODES.AI && !xIsNext) return; // prevent user playing for O in AI mode

    setBoard((prev) => {
      const next = prev.slice();
      next[index] = xIsNext ? 'X' : 'O';
      return next;
    });
    setXIsNext((prev) => !prev);
  }, [board, mode, winnerInfo.winner, xIsNext]);

  const handleResetRound = useCallback(() => {
    setBoard(defaultBoard);
    setXIsNext(true);
    setWinnerInfo({ winner: null, line: [] });
    // move focus to first cell for accessibility
    requestAnimationFrame(() => {
      if (cellRefs.current[0]) cellRefs.current[0].focus();
    });
  }, []);

  const handleResetScores = useCallback(() => {
    setScores({ X: 0, O: 0, Draws: 0 });
  }, [setScores]);

  const handleModeChange = useCallback((newMode) => {
    setMode(newMode);
    handleResetRound();
  }, [handleResetRound, setMode]);

  // Keyboard navigation manager for the 3x3 grid
  const onKeyNavigate = useCallback((index, e) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    let nextIndex = index;

    switch (e.key) {
      case 'ArrowRight': nextIndex = row * 3 + ((col + 1) % 3); break;
      case 'ArrowLeft': nextIndex = row * 3 + ((col + 2) % 3); break;
      case 'ArrowDown': nextIndex = ((row + 1) % 3) * 3 + col; break;
      case 'ArrowUp': nextIndex = ((row + 2) % 3) * 3 + col; break;
      case 'Enter':
      case ' ': // Space
        e.preventDefault();
        handleMove(index);
        return;
      default:
        return;
    }
    e.preventDefault();
    const target = cellRefs.current[nextIndex];
    if (target) target.focus();
  }, [handleMove]);

  return (
    <div className="game-container">
      <section className="panel">
        <h2 className="section-title" id="controls-heading">Controls</h2>
        <Controls
          aria-labelledby="controls-heading"
          mode={mode}
          onModeChange={handleModeChange}
          onResetRound={handleResetRound}
          onResetScores={handleResetScores}
          isBoardLocked={!!winnerInfo.winner}
        />
      </section>

      <section className="panel" aria-labelledby="board-heading">
        <h2 id="board-heading" className="section-title">Board</h2>
        <div className="board-wrap">
          <Board
            board={board}
            onMove={handleMove}
            disabled={!!winnerInfo.winner || (mode === MODES.AI && !xIsNext)}
            winningLine={winnerInfo.line}
            cellRefs={cellRefs}
            onKeyNavigate={onKeyNavigate}
            currentPlayer={currentPlayer}
          />
          <StatusPanel status={status} winner={winnerInfo.winner} />
        </div>
      </section>

      <section className="panel">
        <h2 className="section-title" id="score-heading">Score</h2>
        <ScorePanel
          aria-labelledby="score-heading"
          scores={scores}
        />
      </section>
    </div>
  );
}
