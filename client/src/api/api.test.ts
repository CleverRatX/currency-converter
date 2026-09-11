import { getCurrencies, getPriceChanges } from './api';
import { ApiError } from './errors';
import { currencyDtos } from '../mocks/currencies';
import { installApiMock } from '../mocks/apiMock';
import { createPriceChangeDtos } from '../mocks/priceChanges';

afterEach(() => {
  vi.unstubAllGlobals();
});

test('returns the currencies mapped to the client model', async () => {
  installApiMock();

  const currencies = await getCurrencies();

  expect(currencies.map((currency) => currency.code)).toEqual(currencyDtos.map((currency) => currency.code));
});

test('asks the server for the price history of the requested pair', async () => {
  const apiMock = installApiMock();

  const priceChanges = await getPriceChanges({
    purchasedCurrency: 'PLN',
    paymentCurrency: 'JPY',
    fromDateTime: new Date('2026-04-27T09:00:00.000Z')
  });

  const requestedUrl = new URL(apiMock.getRequestedUrls()[0]);

  expect(requestedUrl.pathname).toBe('/prices');
  expect(requestedUrl.searchParams.get('purchasedCurrency')).toBe('PLN');
  expect(requestedUrl.searchParams.get('paymentCurrency')).toBe('JPY');
  expect(requestedUrl.searchParams.get('fromDateTime')).toBe('2026-04-27T09:00:00.000Z');
  expect(priceChanges).toHaveLength(createPriceChangeDtos('PLN', 'JPY').length);
  expect(priceChanges[0].dateTime).toBeInstanceOf(Date);
});

test('sends toDateTime only when it is given', async () => {
  const apiMock = installApiMock();

  await getPriceChanges({
    purchasedCurrency: 'PLN',
    paymentCurrency: 'JPY',
    fromDateTime: new Date('2026-04-27T09:00:00.000Z'),
    toDateTime: new Date('2026-04-27T09:05:00.000Z')
  });

  const requestedUrl = new URL(apiMock.getRequestedUrls()[0]);

  expect(requestedUrl.searchParams.get('toDateTime')).toBe('2026-04-27T09:05:00.000Z');
});

test('turns a server error into ApiError with the message from the response', async () => {
  installApiMock({ arePricesFailing: true });

  const error = await getPriceChanges({
    purchasedCurrency: 'PLN',
    paymentCurrency: 'JPY',
    fromDateTime: new Date()
  }).catch((reason: unknown) => reason);

  expect(error).toBeInstanceOf(ApiError);
  expect((error as ApiError).message).toBe('Unknown currency');
});

test('turns a response that is not an array into ApiError', async () => {
  vi.stubGlobal('fetch', () => Promise.resolve(new Response('{"message":"Unknown currency"}')));

  await expect(getCurrencies()).rejects.toBeInstanceOf(ApiError);
});

test('turns an unreachable server into ApiError', async () => {
  installApiMock({ areCurrenciesFailing: true });

  await expect(getCurrencies()).rejects.toBeInstanceOf(ApiError);
});
