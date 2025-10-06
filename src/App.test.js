import { render, screen } from '@testing-library/react';
import App from './App';

test('renders SoftScape Solutions welcome message', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to SoftScape Solutions/i);
  expect(linkElement).toBeInTheDocument();
});