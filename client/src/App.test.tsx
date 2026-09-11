import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { App } from './App';
import { installApiMock } from './mocks/apiMock';
import { currencies } from './mocks/currencies';
import { getCurrency } from './logic/currency';

const pln = getCurrency(currencies, 'PLN');
const jpy = getCurrency(currencies, 'JPY');

const debounceTimeout = 2000;

const serverErrorText = 'COULD NOT GET DATA FROM THE SERVER';

const getFromAmount = () => screen.getByLabelText('Сколько отдаёте');
const getToAmount = () => screen.getByLabelText('Сколько получаете');
const getFromSelect = () => screen.getByLabelText('Валюта, которую отдаёте');
const getToSelect = () => screen.getByLabelText('Валюта, которую получаете');
const getOptionCodes = (select: HTMLElement) =>
  within(select)
    .getAllByRole('option')
    .map((option) => option.textContent);

const renderApp = async () => {
  render(<App />);

  await screen.findByLabelText('Сколько отдаёте');
};

afterEach(() => {
  vi.unstubAllGlobals();
});

test('shows the loading screen and then the data from the API', async () => {
  installApiMock();

  render(<App />);

  expect(screen.getByText(/LOADING/)).toBeInTheDocument();

  expect(await screen.findByLabelText('Сколько отдаёте')).toHaveValue('1');
  expect(getFromSelect()).toHaveValue('PLN');
  expect(getToSelect()).toHaveValue('JPY');
  expect(getToAmount()).toHaveValue('36.05');
  expect(getOptionCodes(getFromSelect())).toEqual(['CAD', 'PLN', 'AUD', 'ZAR']);
  expect(screen.queryByText(/LOADING/)).not.toBeInTheDocument();
});

test('asks the server for the currencies and for the history of the selected pair', async () => {
  const apiMock = installApiMock();

  await renderApp();

  const requestedUrls = apiMock.getRequestedUrls().map((url) => new URL(url));
  const pricesUrl = requestedUrls.find((url) => url.pathname === '/prices');

  expect(requestedUrls.some((url) => url.pathname === '/Currency')).toBe(true);
  expect(pricesUrl?.searchParams.get('purchasedCurrency')).toBe('PLN');
  expect(pricesUrl?.searchParams.get('paymentCurrency')).toBe('JPY');
  expect(pricesUrl?.searchParams.get('fromDateTime')).toBeTruthy();
});

test('shows the server error screen when the currencies cannot be loaded', async () => {
  installApiMock({ areCurrenciesFailing: true });

  render(<App />);

  expect(await screen.findByText(serverErrorText)).toBeInTheDocument();
  expect(screen.queryByLabelText('Сколько отдаёте')).not.toBeInTheDocument();
});

test('shows the server error screen when the rate cannot be loaded', async () => {
  installApiMock({ arePricesFailing: true });

  render(<App />);

  expect(await screen.findByText(serverErrorText)).toBeInTheDocument();
});

test('shows a toast and keeps the last rate when the server fails while typing', async () => {
  const user = userEvent.setup();
  const apiMock = installApiMock();

  await renderApp();

  apiMock.options.arePricesFailing = true;

  await user.type(getFromAmount(), '0');

  const toast = await screen.findByRole('alert', undefined, { timeout: debounceTimeout });

  expect(toast).toHaveTextContent('Unknown currency');
  expect(screen.queryByText(serverErrorText)).not.toBeInTheDocument();
  expect(getFromAmount()).toHaveValue('10');
  expect(getToAmount()).toHaveValue('360.5');
});

test('recalculates the result while the user is typing', async () => {
  const user = userEvent.setup();

  installApiMock();

  await renderApp();

  await user.type(getFromAmount(), '0');

  expect(getFromAmount()).toHaveValue('10');
  expect(getToAmount()).toHaveValue('360.5');
});

test('recalculates the source amount when the target amount is typed', async () => {
  const user = userEvent.setup();

  installApiMock();

  await renderApp();

  await user.clear(getToAmount());
  await user.type(getToAmount(), '100');

  expect(getToAmount()).toHaveValue('100');
  expect(getFromAmount()).toHaveValue('2.7739');
});

test('keeps typing in the source field after the target field was edited', async () => {
  const user = userEvent.setup();

  installApiMock();

  await renderApp();

  await user.clear(getToAmount());
  await user.type(getToAmount(), '100');

  await user.clear(getFromAmount());
  await user.type(getFromAmount(), '2');

  expect(getFromAmount()).toHaveValue('2');
  expect(getToAmount()).toHaveValue('72.1');
});

test('loads the rate of the new pair when the currency changes', async () => {
  const user = userEvent.setup();

  installApiMock();

  await renderApp();

  await user.selectOptions(getToSelect(), 'CAD');

  await waitFor(() => expect(getToAmount()).toHaveValue('0.34'));
});

test('does not offer the currency that is already selected in the other select', async () => {
  const user = userEvent.setup();

  installApiMock();

  await renderApp();

  expect(getOptionCodes(getFromSelect())).not.toContain('JPY');
  expect(getOptionCodes(getToSelect())).not.toContain('PLN');

  await user.selectOptions(getToSelect(), 'CAD');

  expect(getOptionCodes(getFromSelect())).not.toContain('CAD');
  expect(getOptionCodes(getToSelect())).not.toContain('PLN');
});

test('swaps the currencies and loads the rate of the reversed pair', async () => {
  const user = userEvent.setup();

  installApiMock();

  await renderApp();

  await user.click(screen.getByRole('button', { name: /swap/i }));

  expect(getFromSelect()).toHaveValue('JPY');
  expect(getToSelect()).toHaveValue('PLN');
  await waitFor(() => expect(getToAmount()).toHaveValue('0.0277'));
});

test('resets the open state of the description block when the pair changes', async () => {
  const user = userEvent.setup();

  installApiMock();

  await renderApp();

  await user.click(screen.getByRole('button', { name: /PLN\/JPY: about/ }));

  expect(screen.queryByText(pln.description)).not.toBeInTheDocument();

  await user.selectOptions(getToSelect(), 'CAD');

  expect(screen.getByRole('button', { name: /PLN\/CAD: about/ })).toHaveAttribute('aria-expanded', 'true');
  expect(screen.getByText(pln.description)).toBeInTheDocument();
  expect(screen.queryByText(jpy.description)).not.toBeInTheDocument();
});
