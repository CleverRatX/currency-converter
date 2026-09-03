import type { Currency } from '../types/currency';
import type { PriceChange, PriceChanges } from '../types/priceChange';

export const getCurrency = (currencies: Currency[], code: string): Currency => {
  const currency = currencies.find((item) => item.code === code);

  if (!currency) {
    throw new Error(`Неизвестный код валюты: ${code}`);
  }

  return currency;
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
