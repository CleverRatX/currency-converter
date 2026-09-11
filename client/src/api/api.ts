import { apiBaseUrl } from '../data/constants';
import type { Currency } from '../types/currency';
import type { PriceChange } from '../types/priceChange';
import { ApiError } from './errors';
import { toCurrencies, toPriceChanges } from './mappers';
import type { CurrencyDto, ErrorResponseDto, PriceChangeDto } from './types';

type GetPriceChangesParams = {
  purchasedCurrency: string;
  paymentCurrency: string;
  fromDateTime: Date;
  toDateTime?: Date;
};

const networkErrorMessage = 'Cannot reach the server. Check that the backend is running and try again.';

const unexpectedResponseMessage = 'The server returned an unexpected response.';

const getErrorMessage = async (response: Response): Promise<string> => {
  const errorDto = (await response.json().catch(() => null)) as ErrorResponseDto | null;

  return errorDto?.message ?? `The server responded with ${response.status}`;
};

const requestArray = async <TDto>(path: string, searchParams?: URLSearchParams): Promise<TDto[]> => {
  const query = searchParams ? `?${searchParams.toString()}` : '';
  let response: Response;

  try {
    response = await fetch(`${apiBaseUrl}${path}${query}`);
  } catch {
    throw new ApiError(networkErrorMessage);
  }

  if (!response.ok) {
    throw new ApiError(await getErrorMessage(response));
  }

  const body = (await response.json().catch(() => null)) as unknown;

  if (!Array.isArray(body)) {
    throw new ApiError(unexpectedResponseMessage);
  }

  return body as TDto[];
};

export const getCurrencies = async (): Promise<Currency[]> => {
  return toCurrencies(await requestArray<CurrencyDto>('/Currency'));
};

export const getPriceChanges = async (params: GetPriceChangesParams): Promise<PriceChange[]> => {
  const searchParams = new URLSearchParams({
    purchasedCurrency: params.purchasedCurrency,
    paymentCurrency: params.paymentCurrency,
    fromDateTime: params.fromDateTime.toISOString()
  });

  if (params.toDateTime) {
    searchParams.set('toDateTime', params.toDateTime.toISOString());
  }

  return toPriceChanges(await requestArray<PriceChangeDto>('/prices', searchParams));
};
