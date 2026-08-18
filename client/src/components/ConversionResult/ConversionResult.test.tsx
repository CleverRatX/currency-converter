import { render, screen } from '@testing-library/react';

import { getCurrency } from '../../data/currencies';
import { ConversionResult } from './ConversionResult';

test('показывает исходную сумму, результат и время курса', () => {
  render(
    <ConversionResult
      amount="1"
      fromCurrency={getCurrency('PLN')}
      convertedAmount="0.99"
      toCurrency={getCurrency('JPY')}
      updatedAt="Fri, 05 Apr 2026 10:35 UTC"
    />
  );

  expect(screen.getByText('1 Polish zloty is')).toBeInTheDocument();
  expect(screen.getByText('0.99 Japanese yen')).toBeInTheDocument();
  expect(screen.getByText('Fri, 05 Apr 2026 10:35 UTC')).toBeInTheDocument();
});
