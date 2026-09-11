export const apiBaseUrl: string = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5081';

export const defaultAmount = '1';

export const defaultFromCode = 'PLN';

export const defaultToCode = 'JPY';

export const priceHistoryRangeMinutes = 5;

export const amountDebounceDelay = 400;

export const toastDuration = 5000;

export const savedFilters = ['PLN / CAD', 'PLN / JPY'];

export const activeFilter = 'PLN / JPY';

export const chartRanges = ['1 MIN', '2 MIN', '3 MIN', '4 MIN', '5 MIN'];

export const activeChartRange = '4 MIN';
