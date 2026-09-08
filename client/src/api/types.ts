export type CurrencyDto = {
  code: string;
  name: string;
  description: string;
  symbol: string;
};

export type PriceChangeDto = {
  purchasedCurrencyCode: string;
  paymentCurrencyCode: string;
  price: number;
  dateTime: string;
};

export type PriceChangesDto = Record<string, Record<string, PriceChangeDto>>;
