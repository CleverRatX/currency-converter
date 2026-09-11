import type { PriceChangeDto } from '../api/types';

const testPrices: Record<string, number> = {
  'PLN/CAD': 0.34,
  'PLN/AUD': 0.38,
  'PLN/JPY': 36.05,
  'PLN/ZAR': 4.69,
  'JPY/PLN': 0.0277,
  'JPY/CAD': 0.0094,
  'CAD/PLN': 2.95,
  'CAD/JPY': 106.4
};

const defaultPrice = 1;

const historyLength = 3;

const historyStepMilliseconds = 10_000;

const getTestPrice = (purchasedCurrency: string, paymentCurrency: string): number => {
  return testPrices[`${purchasedCurrency}/${paymentCurrency}`] ?? defaultPrice;
};

export const createPriceChangeDtos = (purchasedCurrency: string, paymentCurrency: string): PriceChangeDto[] => {
  const price = getTestPrice(purchasedCurrency, paymentCurrency);
  const startTime = Date.parse('2026-04-27T09:00:00.000Z');

  return Array.from({ length: historyLength }, (_, index) => ({
    purchasedCurrencyCode: purchasedCurrency,
    paymentCurrencyCode: paymentCurrency,
    price: index === historyLength - 1 ? price : price / 2,
    dateTime: new Date(startTime + index * historyStepMilliseconds).toISOString()
  }));
};
