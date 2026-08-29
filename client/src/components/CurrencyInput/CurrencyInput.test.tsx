import { render, screen } from '@testing-library/react';

import { currencies } from '../../data/currencies';
import { CurrencyInput } from './CurrencyInput';

test('renders the given amount', () => {
  render(
    <CurrencyInput
      amountLabel="Сколько отдаёте"
      currencyLabel="Валюта, которую отдаёте"
      amount="1"
      currencyCode="PLN"
      currencies={currencies}
    />
  );

  expect(screen.getByLabelText('Сколько отдаёте')).toHaveValue('1');
});

test('renders the selected currency', () => {
  render(
    <CurrencyInput
      amountLabel="Сколько отдаёте"
      currencyLabel="Валюта, которую отдаёте"
      amount="1"
      currencyCode="PLN"
      currencies={currencies}
    />
  );

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
    />
  );

  const options = screen.getAllByRole('option');

  expect(options.map((option) => option.textContent)).toEqual(currencies.map((currency) => currency.code));
});

test('renders different values when different props are given', () => {
  render(
    <CurrencyInput
      amountLabel="Сколько получаете"
      currencyLabel="Валюта, которую получаете"
      amount="0.99"
      currencyCode="JPY"
      currencies={currencies}
    />
  );

  expect(screen.getByLabelText('Сколько получаете')).toHaveValue('0.99');
  expect(screen.getByLabelText('Валюта, которую получаете')).toHaveValue('JPY');
});
