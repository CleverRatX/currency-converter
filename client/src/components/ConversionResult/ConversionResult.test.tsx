import { render, screen } from '@testing-library/react';

import { ConversionResult } from './ConversionResult';

test('renders the source amount, the converted amount and the rate timestamp', () => {
  render(
    <ConversionResult
      amount="1"
      fromCurrencyTitle="Polish zloty"
      convertedAmount="0.99"
      toCurrencyTitle="Japanese yen"
      updatedAt={new Date('2026-04-03T10:35:00Z')}
    />
  );

  expect(screen.getByText('1 Polish zloty is')).toBeInTheDocument();
  expect(screen.getByText('0.99 Japanese yen')).toBeInTheDocument();
  expect(screen.getByText('Fri, 03 Apr 2026, 10:35 UTC')).toBeInTheDocument();
});
