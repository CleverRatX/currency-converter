import { render, screen } from '@testing-library/react';

import { getCurrency } from '../../data/currencies';
import { MoreAbout } from './MoreAbout';

const pln = getCurrency('PLN');
const jpy = getCurrency('JPY');
const usd = getCurrency('USD');
const eur = getCurrency('EUR');

test('показывает кнопку с выбранной валютной парой', () => {
  render(<MoreAbout currencies={[pln, jpy]} />);

  expect(screen.getByRole('button', { name: /PLN\/JPY: about/ })).toBeInTheDocument();
});

test('показывает название, код и символ каждой валюты пары', () => {
  render(<MoreAbout currencies={[pln, jpy]} />);

  expect(screen.getByRole('heading', { name: 'Polish zloty - PLN - zł' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'Japanese yen - JPY - ¥' })).toBeInTheDocument();
});

test('показывает описание каждой валюты пары', () => {
  render(<MoreAbout currencies={[pln, jpy]} />);

  expect(screen.getByText(pln.description)).toBeInTheDocument();
  expect(screen.getByText(jpy.description)).toBeInTheDocument();
});

test('для другой пары показывает описания этой пары', () => {
  render(<MoreAbout currencies={[usd, eur]} />);

  expect(screen.getByRole('button', { name: /USD\/EUR: about/ })).toBeInTheDocument();
  expect(screen.getByText(usd.description)).toBeInTheDocument();
  expect(screen.getByText(eur.description)).toBeInTheDocument();
  expect(screen.queryByText(pln.description)).not.toBeInTheDocument();
});
