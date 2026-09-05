import { currencies } from '../mocks/currencies';
import { priceChanges } from '../mocks/priceChanges';
import type { Currency } from '../types/currency';
import type { PriceChange, PriceChanges } from '../types/priceChange';
import type { PriceChangeDto } from './types';

const toPriceChange = (priceChangeDto: PriceChangeDto): PriceChange => {
  return {
    purchasedCurrencyCode: priceChangeDto.purchasedCurrencyCode,
    paymentCurrencyCode: priceChangeDto.paymentCurrencyCode,
    price: priceChangeDto.price,
    dateTime: new Date(priceChangeDto.dateTime)
  };
};

export const getCurrencies = (): Currency[] => {
  return currencies;
};

export const getPriceChanges = (): PriceChanges => {
  return Object.fromEntries(
    Object.entries(priceChanges).map(([purchasedCurrencyCode, priceChangesDto]) => [
      purchasedCurrencyCode,
      Object.fromEntries(
        Object.entries(priceChangesDto).map(([paymentCurrencyCode, priceChangeDto]) => [
          paymentCurrencyCode,
          toPriceChange(priceChangeDto)
        ])
      )
    ])
  );
};
