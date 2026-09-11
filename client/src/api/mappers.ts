import type { Currency } from '../types/currency';
import type { PriceChange } from '../types/priceChange';
import type { CurrencyDto, PriceChangeDto } from './types';

export const toCurrency = (currencyDto: CurrencyDto): Currency => {
  return {
    code: currencyDto.code,
    name: currencyDto.name,
    description: currencyDto.description ?? '',
    symbol: currencyDto.symbol
  };
};

export const toPriceChange = (priceChangeDto: PriceChangeDto): PriceChange => {
  return {
    purchasedCurrencyCode: priceChangeDto.purchasedCurrencyCode,
    paymentCurrencyCode: priceChangeDto.paymentCurrencyCode,
    price: priceChangeDto.price,
    dateTime: new Date(priceChangeDto.dateTime)
  };
};

export const toCurrencies = (currencyDtos: CurrencyDto[]): Currency[] => {
  return currencyDtos.map(toCurrency);
};

export const toPriceChanges = (priceChangeDtos: PriceChangeDto[]): PriceChange[] => {
  return priceChangeDtos.map(toPriceChange);
};
