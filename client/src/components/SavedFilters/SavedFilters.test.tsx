import { render, screen } from '@testing-library/react';

import { SavedFilters } from './SavedFilters';

test('renders every saved filter', () => {
  render(<SavedFilters filters={['PLN / CAD', 'PLN / JPY']} />);

  expect(screen.getAllByRole('button')).toHaveLength(2);
  expect(screen.getByRole('button', { name: 'PLN / CAD' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'PLN / JPY' })).toBeInTheDocument();
});

test('highlights the active filter', () => {
  render(<SavedFilters filters={['PLN / CAD', 'PLN / JPY']} activeFilter="PLN / JPY" />);

  expect(screen.getByRole('button', { name: 'PLN / JPY' })).toHaveAttribute('aria-pressed', 'true');
  expect(screen.getByRole('button', { name: 'PLN / CAD' })).toHaveAttribute('aria-pressed', 'false');
});
