import { fireEvent, render, screen } from '@testing-library/react';

import { currencies } from '../../mocks/currencies';
import { CurrencyInput } from './CurrencyInput';

test('renders the given amount and the selected currency', () => {
  render(
    <CurrencyInput
      amountLabel="Сколько отдаёте"
      currencyLabel="Валюта, которую отдаёте"
      amount="1"
      currencyCode="PLN"
      currencies={currencies}
      onCurrencyChange={() => {}}
    />
  );

  expect(screen.getByLabelText('Сколько отдаёте')).toHaveValue('1');
  expect(screen.getByLabelText('Валюта, которую отдаёте')).toHaveValue('PLN');
});

test('renders every given currency as an option', () => {
  render(
    <CurrencyInput
      amountLabel="Сколько отдаёте"
      currencyLabel="Валюта, которую отдаёте"
      amount="1"
      currencyCode="PLN"
      currencies={currencies}
      onCurrencyChange={() => {}}
    />
  );

  const options = screen.getAllByRole('option');

  expect(options.map((option) => option.textContent)).toEqual(currencies.map((currency) => currency.code));
});

test('calls onAmountChange when the amount is typed', () => {
  const handleAmountChange = vi.fn();

  render(
    <CurrencyInput
      amountLabel="Сколько отдаёте"
      currencyLabel="Валюта, которую отдаёте"
      amount="1"
      currencyCode="PLN"
      currencies={currencies}
      onCurrencyChange={() => {}}
      onAmountChange={handleAmountChange}
    />
  );

  fireEvent.change(screen.getByLabelText('Сколько отдаёте'), { target: { value: '12' } });

  expect(handleAmountChange).toHaveBeenCalledWith('12');
});

test('calls onCurrencyChange when another currency is selected', () => {
  const handleCurrencyChange = vi.fn();

  render(
    <CurrencyInput
      amountLabel="Сколько отдаёте"
      currencyLabel="Валюта, которую отдаёте"
      amount="1"
      currencyCode="PLN"
      currencies={currencies}
      onCurrencyChange={handleCurrencyChange}
    />
  );

  fireEvent.change(screen.getByLabelText('Валюта, которую отдаёте'), { target: { value: 'CAD' } });

  expect(handleCurrencyChange).toHaveBeenCalledWith('CAD');
});

test('keeps the result field read only', () => {
  render(
    <CurrencyInput
      amountLabel="Сколько получаете"
      currencyLabel="Валюта, которую получаете"
      amount="36.05"
      currencyCode="JPY"
      currencies={currencies}
      onCurrencyChange={() => {}}
    />
  );

  expect(screen.getByLabelText('Сколько получаете')).toHaveAttribute('readonly');
});
