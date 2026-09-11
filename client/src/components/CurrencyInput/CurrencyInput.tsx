import { type ChangeEvent, useEffect, useRef } from 'react';

import type { Currency } from '../../types/currency';
import styles from './CurrencyInput.module.scss';

type CurrencyInputProps = {
  amountLabel: string;
  currencyLabel: string;
  currencyCode: string;
  currencies: Currency[];
  amount?: string;
  defaultAmount?: string;
  isAmountAllowed: (amount: string) => boolean;
  onAmountChange: (amount: string) => void;
  onCurrencyChange: (currencyCode: string) => void;
};

export const CurrencyInput = ({
  amountLabel,
  currencyLabel,
  currencyCode,
  currencies,
  amount,
  defaultAmount,
  isAmountAllowed,
  onAmountChange,
  onCurrencyChange
}: CurrencyInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;

    if (input !== null && defaultAmount !== undefined && input.value !== defaultAmount) {
      input.value = defaultAmount;
    }
  }, [defaultAmount]);

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextAmount = event.target.value;

    if (!isAmountAllowed(nextAmount)) {
      if (defaultAmount !== undefined) {
        event.target.value = defaultAmount;
      }

      return;
    }

    onAmountChange(nextAmount);
  };

  const handleCurrencyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onCurrencyChange(event.target.value);
  };

  return (
    <div className={styles.field}>
      <input
        ref={inputRef}
        className={styles.amount}
        type="text"
        inputMode="decimal"
        aria-label={amountLabel}
        value={amount}
        defaultValue={defaultAmount}
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
