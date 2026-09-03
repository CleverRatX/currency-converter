import { fireEvent, render, screen, within } from '@testing-library/react';

import { App } from './App';
import { currencies } from './mocks/currencies';
import { getCurrency } from './utils/currency';

const pln = getCurrency(currencies, 'PLN');
const jpy = getCurrency(currencies, 'JPY');

const getFromAmount = () => screen.getByLabelText('Сколько отдаёте');
const getToAmount = () => screen.getByLabelText('Сколько получаете');
const getFromSelect = () => screen.getByLabelText('Валюта, которую отдаёте');
const getToSelect = () => screen.getByLabelText('Валюта, которую получаете');
const getOptionCodes = (select: HTMLElement) =>
  within(select)
    .getAllByRole('option')
    .map((option) => option.textContent);

test('renders the fields and the selects filled with the mocked data', () => {
  render(<App />);

  expect(getFromAmount()).toHaveValue('1');
  expect(getFromSelect()).toHaveValue('PLN');
  expect(getToSelect()).toHaveValue('JPY');
  expect(getToAmount()).toHaveValue('36.05');
  expect(getOptionCodes(getFromSelect())).toEqual(['CAD', 'PLN', 'AUD', 'ZAR']);
});

test('recalculates the result when the amount changes', () => {
  render(<App />);

  fireEvent.change(getFromAmount(), { target: { value: '10' } });

  expect(getFromAmount()).toHaveValue('10');
  expect(getToAmount()).toHaveValue('360.5');
});

test('recalculates the result when the currency pair changes', () => {
  render(<App />);

  fireEvent.change(getToSelect(), { target: { value: 'CAD' } });

  expect(getToAmount()).toHaveValue('0.34');
});

test('does not offer the currency that is already selected in the other select', () => {
  render(<App />);

  expect(getOptionCodes(getFromSelect())).not.toContain('JPY');
  expect(getOptionCodes(getToSelect())).not.toContain('PLN');

  fireEvent.change(getToSelect(), { target: { value: 'CAD' } });

  expect(getOptionCodes(getFromSelect())).not.toContain('CAD');
  expect(getOptionCodes(getToSelect())).not.toContain('PLN');
});

test('swaps the currencies and recalculates the result', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /swap/i }));

  expect(getFromSelect()).toHaveValue('JPY');
  expect(getToSelect()).toHaveValue('PLN');
  expect(getToAmount()).toHaveValue('0.0277');
});

test('resets the open state of the description block when the pair changes', () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /PLN\/JPY: about/ }));

  expect(screen.queryByText(pln.description)).not.toBeInTheDocument();

  fireEvent.change(getToSelect(), { target: { value: 'CAD' } });

  expect(screen.getByRole('button', { name: /PLN\/CAD: about/ })).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByText(pln.description)).toBeInTheDocument();
  expect(screen.queryByText(jpy.description)).not.toBeInTheDocument();
});
