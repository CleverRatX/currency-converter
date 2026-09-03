import { useState } from 'react';

import chartImage from './assets/chart.png';
import styles from './App.module.scss';
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
import { currencies } from './mocks/currencies';
import { priceChanges } from './mocks/priceChanges';
import { convertAmount, isAmountInputValid } from './utils/amount';
import { getAvailableCurrencies, getCurrency, getPriceChange } from './utils/currency';

export const App = () => {
  const [amount, setAmount] = useState(defaultAmount);
  const [fromCode, setFromCode] = useState(defaultFromCode);
  const [toCode, setToCode] = useState(defaultToCode);

  const fromCurrency = getCurrency(currencies, fromCode);
  const toCurrency = getCurrency(currencies, toCode);

  const priceChange = getPriceChange(priceChanges, fromCode, toCode);
  const convertedAmount = convertAmount(amount, priceChange.price);

  const handleAmountChange = (nextAmount: string) => {
    if (isAmountInputValid(nextAmount)) {
      setAmount(nextAmount);
    }
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
              amount={amount}
              fromCurrencyName={fromCurrency.name}
              convertedAmount={convertedAmount}
              toCurrencyName={toCurrency.name}
              updatedAt={priceChange.dateTime}
            />

            <div className={styles.fields}>
              <CurrencyInput
                amountLabel="Сколько отдаёте"
                currencyLabel="Валюта, которую отдаёте"
                amount={amount}
                currencyCode={fromCode}
                currencies={getAvailableCurrencies(currencies, toCode)}
                onCurrencyChange={setFromCode}
                onAmountChange={handleAmountChange}
              />

              <div className={styles.swap}>
                <SwapButton onClick={handleSwap} />
              </div>

              <CurrencyInput
                amountLabel="Сколько получаете"
                currencyLabel="Валюта, которую получаете"
                amount={convertedAmount}
                currencyCode={toCode}
                currencies={getAvailableCurrencies(currencies, fromCode)}
                onCurrencyChange={setToCode}
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
