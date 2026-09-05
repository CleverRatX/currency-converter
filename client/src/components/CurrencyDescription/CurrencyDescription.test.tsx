import { render, screen } from '@testing-library/react';

import { getCurrency } from '../../logic/currency';
import { currencies } from '../../mocks/currencies';
import { CurrencyDescription } from './CurrencyDescription';

const pln = getCurrency(currencies, 'PLN');

test('renders the description of the currency', () => {
  render(<CurrencyDescription currency={pln} />);

  expect(screen.getByRole('heading', { name: 'Polish zloty - PLN - zł' })).toBeInTheDocument();
  expect(screen.getByText(pln.description)).toBeInTheDocument();
});

test('renders the fallback text when the currency has no description', () => {
  render(<CurrencyDescription currency={{ ...pln, description: '' }} />);

  expect(screen.getByText('There is no description for this currency yet.')).toBeInTheDocument();
});
