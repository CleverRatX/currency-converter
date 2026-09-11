import type { Currency } from '../types/currency';

const createUnknownCurrency = (code: string): Currency => {
  return { code, name: code, description: '', symbol: code };
};

export const getCurrency = (currencies: Currency[], code: string): Currency => {
  return currencies.find((currency) => currency.code === code) ?? createUnknownCurrency(code);
};
