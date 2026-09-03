export type PriceChange = {
  purchasedCurrencyCode: string;
  paymentCurrencyCode: string;
  price: number;
  dateTime: string;
};

export type PriceChanges = Record<string, Record<string, PriceChange>>;
