import { fireEvent, render, screen } from '@testing-library/react';

import { currencies } from '../../mocks/currencies';
import { getCurrency } from '../../utils/currency';
import { MoreAbout } from './MoreAbout';

const pln = getCurrency(currencies, 'PLN');
const jpy = getCurrency(currencies, 'JPY');
const cad = getCurrency(currencies, 'CAD');
const zar = getCurrency(currencies, 'ZAR');

test('renders a button with the selected currency pair', () => {
  render(<MoreAbout fromCurrency={pln} toCurrency={jpy} />);

  expect(screen.getByRole('button', { name: /PLN\/JPY: about/ })).toBeInTheDocument();
});

test('renders the name, the code and the symbol of each currency in the pair', () => {
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
  render(<MoreAbout fromCurrency={cad} toCurrency={zar} />);

  expect(screen.getByRole('button', { name: /CAD\/ZAR: about/ })).toBeInTheDocument();
  expect(screen.getByText(cad.description)).toBeInTheDocument();
  expect(screen.getByText(zar.description)).toBeInTheDocument();
  expect(screen.queryByText(pln.description)).not.toBeInTheDocument();
});

test('hides and shows the descriptions by the toggle', () => {
  render(<MoreAbout fromCurrency={pln} toCurrency={jpy} />);

  const toggle = screen.getByRole('button', { name: /PLN\/JPY: about/ });

  fireEvent.click(toggle);

  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(screen.queryByText(pln.description)).not.toBeInTheDocument();

  fireEvent.click(toggle);

  expect(toggle).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByText(pln.description)).toBeInTheDocument();
});
