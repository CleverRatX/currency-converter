import { render, screen } from '@testing-library/react';

import { ConversionResult } from './ConversionResult';

test('renders the source amount, the converted amount and the rate timestamp', () => {
  render(
    <ConversionResult
      amount="1"
      fromCurrencyName="Polish zloty"
      convertedAmount="36.05"
      toCurrencyName="Japanese yen"
      updatedAt={new Date('2026-04-27T09:30:00.000Z')}
    />
  );

  expect(screen.getByText('1 Polish zloty is')).toBeInTheDocument();
  expect(screen.getByText('36.05 Japanese yen')).toBeInTheDocument();
  expect(screen.getByText('Mon, 27 Apr 2026, 09:30 UTC')).toBeInTheDocument();
});
