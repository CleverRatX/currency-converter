import { priceHistoryRangeMinutes } from './data/constants';
import type { Currency } from './types/currency';
import type { PriceChange } from './types/priceChange';
import { formatNumber, parseNumber } from './utils/formatter';

const amountPattern = /^\d*([.,]\d*)?$/;

const millisecondsInMinute = 60_000;

export const isAmountInputValid = (value: string): boolean => {
  return amountPattern.test(value);
};

export const convertAmount = (amount: string, price: number): string => {
  return formatNumber(parseNumber(amount) * price);
};

export const convertAmountBack = (amount: string, price: number): string => {
  return formatNumber(parseNumber(amount) / price);
};

export const getAvailableCurrencies = (currencies: Currency[], excludedCode: string): Currency[] => {
  return currencies.filter((currency) => currency.code !== excludedCode);
};

export const getLatestPriceChange = (priceChanges: PriceChange[]): PriceChange | null => {
  return priceChanges.reduce<PriceChange | null>((latest, priceChange) => {
    return latest === null || priceChange.dateTime > latest.dateTime ? priceChange : latest;
  }, null);
};

export const getPriceHistoryStart = (now: Date): Date => {
  return new Date(now.getTime() - priceHistoryRangeMinutes * millisecondsInMinute);
};
