const maxFractionDigits = 4;

const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: maxFractionDigits,
  useGrouping: false
});

export const parseNumber = (value: string): number => {
  const parsed = Number(value.replace(',', '.'));

  return Number.isFinite(parsed) ? parsed : 0;
};

export const formatNumber = (value: number): string => {
  return numberFormatter.format(value);
};
