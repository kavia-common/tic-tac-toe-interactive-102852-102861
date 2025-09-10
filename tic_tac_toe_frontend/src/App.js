import React from 'react';
import './App.css';
import Game from './components/Game';

/**
 * Root application component wrapping the Game.
 * Includes document-level theming and layout shell.
 */
// PUBLIC_INTERFACE
function App() {
  return (
    <div className="App" role="application" aria-label="Tic Tac Toe application">
      <header className="app-header" aria-label="Application header">
        <h1 className="title">Tic Tac Toe</h1>
        <p className="subtitle">Play locally or vs Computer</p>
      </header>
      <main className="app-main">
        <Game />
      </main>
      <footer className="app-footer" aria-label="Footer">
        <p>
          Built with React • Accessible • Responsive
        </p>
      </footer>
    </div>
  );
}

export default App;
