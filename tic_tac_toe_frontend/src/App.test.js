import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Tic Tac Toe title', () => {
  render(<App />);
  expect(screen.getByText(/Tic Tac Toe/i)).toBeInTheDocument();
});

test('can place an X in local mode', () => {
  render(<App />);
  const boardCells = screen.getAllByRole('gridcell');
  fireEvent.click(boardCells[0]);
  expect(boardCells[0]).toHaveTextContent('X');
});

test('reset round clears the board', () => {
  render(<App />);
  const boardCells = screen.getAllByRole('gridcell');
  fireEvent.click(boardCells[0]);
  fireEvent.click(screen.getByRole('button', { name: /Reset Round/i }));
  expect(boardCells[0]).toHaveTextContent('');
});
