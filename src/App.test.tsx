import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders form generator', () => {
  render(<App />);
  const linkElement = screen.getByText(/Project Requirements Survey/i);
  expect(linkElement).toBeInTheDocument();
});
