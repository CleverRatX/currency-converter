import type { CurrencyDto, PriceChangeDto } from './types';
import { toCurrencies, toCurrency, toPriceChange, toPriceChanges } from './mappers';

const currencyDto: CurrencyDto = {
  code: 'PLN',
  name: 'Polish zloty',
  description: 'The official currency of Poland.',
  symbol: 'zł'
};

const priceChangeDto: PriceChangeDto = {
  purchasedCurrencyCode: 'PLN',
  paymentCurrencyCode: 'JPY',
  price: 36.05,
  dateTime: '2026-04-27T09:30:00.000Z'
};

test('maps CurrencyDto to Currency', () => {
  expect(toCurrency(currencyDto)).toEqual({
    code: 'PLN',
    name: 'Polish zloty',
    description: 'The official currency of Poland.',
    symbol: 'zł'
  });
});

test('replaces a missing description with an empty string', () => {
  const dtoWithoutDescription = { ...currencyDto, description: undefined } as unknown as CurrencyDto;

  expect(toCurrency(dtoWithoutDescription).description).toBe('');
});

test('maps PriceChangeDto to PriceChange', () => {
  expect(toPriceChange(priceChangeDto)).toEqual({
    purchasedCurrencyCode: 'PLN',
    paymentCurrencyCode: 'JPY',
    price: 36.05,
    dateTime: new Date('2026-04-27T09:30:00.000Z')
  });
});

test('turns the date of the price change into Date', () => {
  const priceChange = toPriceChange(priceChangeDto);

  expect(priceChange.dateTime).toBeInstanceOf(Date);
  expect(priceChange.dateTime.toISOString()).toBe(priceChangeDto.dateTime);
});

test('maps collections item by item', () => {
  expect(toCurrencies([currencyDto])).toEqual([toCurrency(currencyDto)]);
  expect(toPriceChanges([priceChangeDto])).toEqual([toPriceChange(priceChangeDto)]);
});
