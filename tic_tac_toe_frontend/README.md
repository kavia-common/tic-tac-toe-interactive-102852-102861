# Tic Tac Toe Frontend

A modern, accessible, and responsive Tic Tac Toe game built with React. Supports 2-player local mode and vs Computer AI with persistent score tracking in localStorage.

## Features

- 2-player local mode and basic AI mode
- 3x3 interactive board with keyboard navigation
- Move handling with subtle animations
- Mode selection, reset round, and reset scores
- Score tracking persisted across sessions (localStorage)
- Accessible: ARIA roles/labels, focus styles, and color contrast
- Responsive layout, works great on mobile and desktop
- Linting (ESLint) and automated tests via React Scripts

## Scripts

- `npm start` – Run the app locally
- `npm test` – Run the test suite in CI mode
- `npm run build` – Build for production
- `npm run lint` – Lint the codebase

## How to Play

1. Choose a mode: "2 Players" or "Vs Computer".
2. Click a cell or use arrow keys to navigate and press Enter/Space to mark.
3. First to align 3 marks wins. Draws are counted too.
4. Use Reset Round to start a fresh board.
5. Use Reset Scores to clear persisted scores.

## Tech Notes

- State is managed entirely client-side.
- Scores and selected mode are saved in localStorage.
- Basic AI logic: win > block > center > corner > side.
- Components organized under `src/components`, utilities in `src/utils`, hooks in `src/hooks`.

