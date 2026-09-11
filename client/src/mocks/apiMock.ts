import { currencyDtos } from './currencies';
import { createPriceChangeDtos } from './priceChanges';

type ApiMockOptions = {
  areCurrenciesFailing?: boolean;
  arePricesFailing?: boolean;
};

type ApiMock = {
  options: ApiMockOptions;
  getRequestedUrls: () => string[];
};

const serverErrorStatus = 500;

const jsonResponse = (body: unknown): Response => {
  return new Response(JSON.stringify(body), { status: 200, headers: { 'Content-Type': 'application/json' } });
};

const errorResponse = (message: string): Response => {
  return new Response(JSON.stringify({ message }), {
    status: serverErrorStatus,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const installApiMock = (options: ApiMockOptions = {}): ApiMock => {
  const requestedUrls: string[] = [];

  vi.stubGlobal('fetch', (input: RequestInfo | URL) => {
    const url = new URL(String(input));

    requestedUrls.push(url.toString());

    if (url.pathname === '/Currency') {
      if (options.areCurrenciesFailing) {
        return Promise.reject(new TypeError('Failed to fetch'));
      }

      return Promise.resolve(jsonResponse(currencyDtos));
    }

    if (url.pathname === '/prices') {
      if (options.arePricesFailing) {
        return Promise.resolve(errorResponse('Unknown currency'));
      }

      const purchasedCurrency = url.searchParams.get('purchasedCurrency') ?? '';
      const paymentCurrency = url.searchParams.get('paymentCurrency') ?? '';

      return Promise.resolve(jsonResponse(createPriceChangeDtos(purchasedCurrency, paymentCurrency)));
    }

    return Promise.resolve(errorResponse(`Unexpected request to ${url.pathname}`));
  });

  return { options, getRequestedUrls: () => requestedUrls };
};
