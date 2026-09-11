import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { isAmountInputValid } from '../../App.logic';
import { currencies } from '../../mocks/currencies';
import { CurrencyInput } from './CurrencyInput';

const amountLabel = 'Сколько отдаёте';
const currencyLabel = 'Валюта, которую отдаёте';

type RenderOptions = {
  amount?: string;
  defaultAmount?: string;
  onAmountChange?: (amount: string) => void;
  onCurrencyChange?: (currencyCode: string) => void;
};

const renderInput = ({ amount, defaultAmount, onAmountChange, onCurrencyChange }: RenderOptions) =>
  render(
    <CurrencyInput
      amountLabel={amountLabel}
      currencyLabel={currencyLabel}
      currencyCode="PLN"
      currencies={currencies}
      amount={amount}
      defaultAmount={defaultAmount}
      isAmountAllowed={isAmountInputValid}
      onAmountChange={onAmountChange ?? (() => {})}
      onCurrencyChange={onCurrencyChange ?? (() => {})}
    />
  );

test('renders the given amount and the selected currency', () => {
  renderInput({ amount: '1' });

  expect(screen.getByLabelText(amountLabel)).toHaveValue('1');
  expect(screen.getByLabelText(currencyLabel)).toHaveValue('PLN');
});

test('renders every given currency as an option', () => {
  renderInput({ amount: '1' });

  const options = screen.getAllByRole('option');

  expect(options.map((option) => option.textContent)).toEqual(currencies.map((currency) => currency.code));
});

test('the controlled field keeps the value from the props', async () => {
  const user = userEvent.setup();
  const handleAmountChange = vi.fn();

  renderInput({ amount: '1', onAmountChange: handleAmountChange });

  await user.type(screen.getByLabelText(amountLabel), '2');

  expect(handleAmountChange).toHaveBeenCalledWith('12');
  expect(screen.getByLabelText(amountLabel)).toHaveValue('1');
});

test('the uncontrolled field keeps the typed value in the DOM', async () => {
  const user = userEvent.setup();
  const handleAmountChange = vi.fn();

  renderInput({ defaultAmount: '1', onAmountChange: handleAmountChange });

  await user.type(screen.getByLabelText(amountLabel), '2');

  expect(handleAmountChange).toHaveBeenCalledWith('12');
  expect(screen.getByLabelText(amountLabel)).toHaveValue('12');
});

test('the uncontrolled field takes a value changed from the outside', () => {
  const { rerender } = renderInput({ defaultAmount: '1' });

  rerender(
    <CurrencyInput
      amountLabel={amountLabel}
      currencyLabel={currencyLabel}
      currencyCode="PLN"
      currencies={currencies}
      defaultAmount="2.7739"
      isAmountAllowed={isAmountInputValid}
      onAmountChange={() => {}}
      onCurrencyChange={() => {}}
    />
  );

  expect(screen.getByLabelText(amountLabel)).toHaveValue('2.7739');
});

test('the uncontrolled field rolls back a value that is not a number', async () => {
  const user = userEvent.setup();
  const handleAmountChange = vi.fn();

  renderInput({ defaultAmount: '1', onAmountChange: handleAmountChange });

  await user.type(screen.getByLabelText(amountLabel), 'x');

  expect(handleAmountChange).not.toHaveBeenCalled();
  expect(screen.getByLabelText(amountLabel)).toHaveValue('1');
});

test('calls onCurrencyChange when another currency is selected', async () => {
  const user = userEvent.setup();
  const handleCurrencyChange = vi.fn();

  renderInput({ amount: '1', onCurrencyChange: handleCurrencyChange });

  await user.selectOptions(screen.getByLabelText(currencyLabel), 'CAD');

  expect(handleCurrencyChange).toHaveBeenCalledWith('CAD');
});
