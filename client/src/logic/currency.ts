import type { Currency } from '../types/currency';

export const getCurrency = (currencies: Currency[], code: string): Currency => {
  const currency = currencies.find((item) => item.code === code);

  if (!currency) {
    throw new Error(`Неизвестный код валюты: ${code}`);
  }

  return currency;
};
