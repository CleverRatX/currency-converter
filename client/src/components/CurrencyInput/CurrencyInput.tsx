import type { ChangeEvent } from 'react';

import type { Currency } from '../../types/currency';
import styles from './CurrencyInput.module.scss';

type CurrencyInputProps = {
  amountLabel: string;
  currencyLabel: string;
  amount: string;
  currencyCode: string;
  currencies: Currency[];
  onCurrencyChange: (currencyCode: string) => void;
  onAmountChange: (amount: string) => void;
};

export const CurrencyInput = ({
  amountLabel,
  currencyLabel,
  amount,
  currencyCode,
  currencies,
  onCurrencyChange,
  onAmountChange
}: CurrencyInputProps) => {
  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    onAmountChange(event.target.value);
  };

  const handleCurrencyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onCurrencyChange(event.target.value);
  };

  return (
    <div className={styles.field}>
      <input
        className={styles.amount}
        type="text"
        inputMode="decimal"
        aria-label={amountLabel}
        value={amount}
        onChange={handleAmountChange}
      />

      <select
        className={styles.currency}
        aria-label={currencyLabel}
        value={currencyCode}
        onChange={handleCurrencyChange}
      >
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.code}
          </option>
        ))}
      </select>
    </div>
  );
};
