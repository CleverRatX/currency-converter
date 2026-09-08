import type { Currency } from './types/currency';
import type { PriceChange, PriceChanges } from './types/priceChange';
import { formatNumber, parseNumber } from './utils/formatter';

const amountPattern = /^\d*([.,]\d*)?$/;

export const isAmountInputValid = (value: string): boolean => {
  return amountPattern.test(value);
};

export const convertAmount = (amount: string, price: number): string => {
  return formatNumber(parseNumber(amount) * price);
};

export const getPriceChange = (priceChanges: PriceChanges, fromCode: string, toCode: string): PriceChange => {
  const priceChange = priceChanges[fromCode]?.[toCode];

  if (!priceChange) {
    throw new Error(`Нет курса для пары: ${fromCode}/${toCode}`);
  }

  return priceChange;
};

export const getAvailableCurrencies = (currencies: Currency[], excludedCode: string): Currency[] => {
  return currencies.filter((currency) => currency.code !== excludedCode);
};
