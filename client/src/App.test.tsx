import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { App } from './App';
import { currencies } from './mocks/currencies';
import { getCurrency } from './logic/currency';

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

test('recalculates the result when the amount changes', async () => {
  const user = userEvent.setup();

  render(<App />);

  await user.type(getFromAmount(), '0');

  expect(getFromAmount()).toHaveValue('10');
  expect(getToAmount()).toHaveValue('360.5');
});

test('recalculates the source amount when the target amount changes', async () => {
  const user = userEvent.setup();

  render(<App />);

  await user.clear(getToAmount());
  await user.type(getToAmount(), '100');

  expect(getToAmount()).toHaveValue('100');
  expect(getFromAmount()).toHaveValue('2.77');
});

test('recalculates the result when the currency pair changes', async () => {
  const user = userEvent.setup();

  render(<App />);

  await user.selectOptions(getToSelect(), 'CAD');

  expect(getToAmount()).toHaveValue('0.34');
});

test('does not offer the currency that is already selected in the other select', async () => {
  const user = userEvent.setup();

  render(<App />);

  expect(getOptionCodes(getFromSelect())).not.toContain('JPY');
  expect(getOptionCodes(getToSelect())).not.toContain('PLN');

  await user.selectOptions(getToSelect(), 'CAD');

  expect(getOptionCodes(getFromSelect())).not.toContain('CAD');
  expect(getOptionCodes(getToSelect())).not.toContain('PLN');
});

test('swaps the currencies and recalculates the result', async () => {
  const user = userEvent.setup();

  render(<App />);

  await user.click(screen.getByRole('button', { name: /swap/i }));

  expect(getFromSelect()).toHaveValue('JPY');
  expect(getToSelect()).toHaveValue('PLN');
  expect(getToAmount()).toHaveValue('0.0277');
});

test('resets the open state of the description block when the pair changes', async () => {
  const user = userEvent.setup();

  render(<App />);

  await user.click(screen.getByRole('button', { name: /PLN\/JPY: about/ }));

  expect(screen.queryByText(pln.description)).not.toBeInTheDocument();

  await user.selectOptions(getToSelect(), 'CAD');

  expect(screen.getByRole('button', { name: /PLN\/CAD: about/ })).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByText(pln.description)).toBeInTheDocument();
  expect(screen.queryByText(jpy.description)).not.toBeInTheDocument();
});
