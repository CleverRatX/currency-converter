import { useMemo, useState } from 'react';

import { getCurrencies, getPriceChanges } from './api/api';
import chartImage from './assets/chart.png';
import styles from './App.module.scss';
import { convertAmount, getAvailableCurrencies, getPriceChange, isAmountInputValid } from './App.logic';
import { ConversionResult } from './components/ConversionResult/ConversionResult';
import { ConverterCard } from './components/ConverterCard/ConverterCard';
import { CurrencyInput } from './components/CurrencyInput/CurrencyInput';
import { FilterActions } from './components/FilterActions/FilterActions';
import { MoreAbout } from './components/MoreAbout/MoreAbout';
import { RateChart } from './components/RateChart/RateChart';
import { SavedFilters } from './components/SavedFilters/SavedFilters';
import { SwapButton } from './components/SwapButton/SwapButton';
import {
  activeChartRange,
  activeFilter,
  chartRanges,
  defaultAmount,
  defaultFromCode,
  defaultToCode,
  savedFilters
} from './data/constants';
import { getCurrency } from './logic/currency';

type EditedField = 'from' | 'to';

export const App = () => {
  const currencies = useMemo(() => getCurrencies(), []);
  const priceChanges = useMemo(() => getPriceChanges(), []);

  const [amount, setAmount] = useState(defaultAmount);
  const [editedField, setEditedField] = useState<EditedField>('from');
  const [fromCode, setFromCode] = useState(defaultFromCode);
  const [toCode, setToCode] = useState(defaultToCode);

  const fromCurrency = getCurrency(currencies, fromCode);
  const toCurrency = getCurrency(currencies, toCode);

  const priceChange = getPriceChange(priceChanges, fromCode, toCode);
  const reversePriceChange = getPriceChange(priceChanges, toCode, fromCode);

  const isFromEdited = editedField === 'from';
  const fromAmount = isFromEdited ? amount : convertAmount(amount, reversePriceChange.price);
  const toAmount = isFromEdited ? convertAmount(amount, priceChange.price) : amount;

  const changeAmount = (nextAmount: string, nextEditedField: EditedField) => {
    if (isAmountInputValid(nextAmount)) {
      setAmount(nextAmount);
      setEditedField(nextEditedField);
    }
  };

  const handleFromAmountChange = (nextAmount: string) => {
    changeAmount(nextAmount, 'from');
  };

  const handleToAmountChange = (nextAmount: string) => {
    changeAmount(nextAmount, 'to');
  };

  const handleSwap = () => {
    setFromCode(toCode);
    setToCode(fromCode);
  };

  return (
    <main className={styles.page}>
      <h1 className={styles['visually-hidden']}>Currency converter</h1>

      <ConverterCard>
        <div className={styles.top}>
          <div className={styles.panel}>
            <ConversionResult
              amount={fromAmount}
              fromCurrencyName={fromCurrency.name}
              convertedAmount={toAmount}
              toCurrencyName={toCurrency.name}
              updatedAt={priceChange.dateTime}
            />

            <div className={styles.fields}>
              <CurrencyInput
                amountLabel="Сколько отдаёте"
                currencyLabel="Валюта, которую отдаёте"
                amount={fromAmount}
                currencyCode={fromCode}
                currencies={getAvailableCurrencies(currencies, toCode)}
                onCurrencyChange={setFromCode}
                onAmountChange={handleFromAmountChange}
              />

              <div className={styles.swap}>
                <SwapButton onClick={handleSwap} />
              </div>

              <CurrencyInput
                amountLabel="Сколько получаете"
                currencyLabel="Валюта, которую получаете"
                amount={toAmount}
                currencyCode={toCode}
                currencies={getAvailableCurrencies(currencies, fromCode)}
                onCurrencyChange={setToCode}
                onAmountChange={handleToAmountChange}
              />
            </div>

            <FilterActions />

            <SavedFilters filters={savedFilters} activeFilter={activeFilter} />
          </div>

          <RateChart
            ranges={chartRanges}
            activeRange={activeChartRange}
            imageSrc={chartImage}
            imageAlt={`График курса ${fromCode}/${toCode}`}
          />
        </div>

        {/*
          Смена пары меняет key, React пересоздаёт MoreAbout, и его open/closed сбрасывается сам.
          Если делать через состояние в App, то App знать про внутренности блока описания
        */}
        <MoreAbout key={`${fromCode}-${toCode}`} fromCurrency={fromCurrency} toCurrency={toCurrency} />
      </ConverterCard>
    </main>
  );
};
