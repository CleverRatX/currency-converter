const MAX_FRACTION_DIGITS = 4;

const amountFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: MAX_FRACTION_DIGITS,
  useGrouping: false
});

const AMOUNT_PATTERN = /^\d*([.,]\d*)?$/;
export const isAmountInputValid = (value: string): boolean => {
  return AMOUNT_PATTERN.test(value);
};

export const parseAmount = (value: string): number => {
  const parsed = Number(value.replace(',', '.'));

  return Number.isFinite(parsed) ? parsed : 0;
};

export const formatAmount = (value: number): string => {
  return amountFormatter.format(value);
};

export const convertAmount = (amount: string, price: number): string => {
  return formatAmount(parseAmount(amount) * price);
};
