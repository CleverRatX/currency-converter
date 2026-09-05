export type PriceChange = {
  purchasedCurrencyCode: string;
  paymentCurrencyCode: string;
  price: number;
  dateTime: Date;
};

export type PriceChanges = Record<string, Record<string, PriceChange>>;
