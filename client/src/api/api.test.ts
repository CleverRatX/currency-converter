import { currencies } from '../mocks/currencies';
import { priceChanges } from '../mocks/priceChanges';
import { getCurrencies, getPriceChanges } from './api';

test('returns every currency', () => {
  expect(getCurrencies().map((currency) => currency.code)).toEqual(currencies.map((currency) => currency.code));
});

test('returns the price of the requested pair', () => {
  expect(getPriceChanges().PLN.JPY.price).toBe(priceChanges.PLN.JPY.price);
});

test('converts the date of the price change to Date', () => {
  const priceChange = getPriceChanges().PLN.JPY;

  expect(priceChange.dateTime).toBeInstanceOf(Date);
  expect(priceChange.dateTime.toISOString()).toBe(priceChanges.PLN.JPY.dateTime);
});
