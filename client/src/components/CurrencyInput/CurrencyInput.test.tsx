import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
      onAmountChange={() => {}}
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
      onAmountChange={() => {}}
    />
  );

  const options = screen.getAllByRole('option');

  expect(options.map((option) => option.textContent)).toEqual(currencies.map((currency) => currency.code));
});

test('calls onAmountChange when the amount is typed', async () => {
  const user = userEvent.setup();
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

  await user.type(screen.getByLabelText('Сколько отдаёте'), '2');

  expect(handleAmountChange).toHaveBeenCalledWith('12');
});

test('calls onCurrencyChange when another currency is selected', async () => {
  const user = userEvent.setup();
  const handleCurrencyChange = vi.fn();

  render(
    <CurrencyInput
      amountLabel="Сколько отдаёте"
      currencyLabel="Валюта, которую отдаёте"
      amount="1"
      currencyCode="PLN"
      currencies={currencies}
      onCurrencyChange={handleCurrencyChange}
      onAmountChange={() => {}}
    />
  );

  await user.selectOptions(screen.getByLabelText('Валюта, которую отдаёте'), 'CAD');

  expect(handleCurrencyChange).toHaveBeenCalledWith('CAD');
});
