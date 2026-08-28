import { render, screen } from '@testing-library/react';

import { getCurrency } from '../../data/currencies';
import { MoreAbout } from './MoreAbout';

const pln = getCurrency('PLN');
const jpy = getCurrency('JPY');
const usd = getCurrency('USD');
const eur = getCurrency('EUR');

test('renders a button with the selected currency pair', () => {
  render(<MoreAbout fromCurrency={pln} toCurrency={jpy} />);

  expect(screen.getByRole('button', { name: /PLN\/JPY: about/ })).toBeInTheDocument();
});

test('renders the title, the code and the symbol of each currency in the pair', () => {
  render(<MoreAbout fromCurrency={pln} toCurrency={jpy} />);

  expect(screen.getByRole('heading', { name: 'Polish zloty - PLN - zł' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Japanese yen - JPY - ¥' })).toBeInTheDocument();
});

test('renders the description of each currency in the pair', () => {
  render(<MoreAbout fromCurrency={pln} toCurrency={jpy} />);

  expect(screen.getByText(pln.description)).toBeInTheDocument();
  expect(screen.getByText(jpy.description)).toBeInTheDocument();
});

test('renders the descriptions of another pair when that pair is given', () => {
  render(<MoreAbout fromCurrency={usd} toCurrency={eur} />);

  expect(screen.getByRole('button', { name: /USD\/EUR: about/ })).toBeInTheDocument();
  expect(screen.getByText(usd.description)).toBeInTheDocument();
  expect(screen.getByText(eur.description)).toBeInTheDocument();
  expect(screen.queryByText(pln.description)).not.toBeInTheDocument();
});
