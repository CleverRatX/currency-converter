import { useCallback, useEffect, useState } from 'react';

import { getCurrencies, getPriceChanges } from './api/api';
import type { LoadError } from './api/errors';
import chartImage from './assets/chart.png';
import styles from './App.module.scss';
import {
  convertAmount,
  convertAmountBack,
  getAvailableCurrencies,
  getLatestPriceChange,
  getPriceHistoryStart,
  isAmountInputValid
} from './App.logic';
import { ConversionResult } from './components/ConversionResult/ConversionResult';
import { ConverterCard } from './components/ConverterCard/ConverterCard';
import { CurrencyInput } from './components/CurrencyInput/CurrencyInput';
import { ErrorScreen } from './components/ErrorScreen/ErrorScreen';
import { FilterActions } from './components/FilterActions/FilterActions';
import { LoadingScreen } from './components/LoadingScreen/LoadingScreen';
import { MoreAbout } from './components/MoreAbout/MoreAbout';
import { PageLayout } from './components/PageLayout/PageLayout';
import { RateChart } from './components/RateChart/RateChart';
import { SavedFilters } from './components/SavedFilters/SavedFilters';
import { SwapButton } from './components/SwapButton/SwapButton';
import { Toast } from './components/Toast/Toast';
import {
  activeChartRange,
  activeFilter,
  amountDebounceDelay,
  chartRanges,
  defaultAmount,
  defaultFromCode,
  defaultToCode,
  savedFilters
} from './data/constants';
import { useAsyncData } from './hooks/useAsyncData';
import { useDebouncedCallback } from './hooks/useDebouncedCallback';
import { getCurrency } from './logic/currency';
import type { Currency } from './types/currency';
import type { PriceChange } from './types/priceChange';

type EditedField = 'from' | 'to';

const noCurrencies: Currency[] = [];

const noPriceChanges: PriceChange[] = [];

export const App = () => {
  const {
    data: currencies,
    error: currenciesError,
    isLoading: areCurrenciesLoading,
    loadData: loadCurrencies
  } = useAsyncData<Currency[], void>(getCurrencies, noCurrencies);

  const {
    data: priceHistory,
    error: priceError,
    isLoading: isRateLoading,
    loadData: loadPriceChanges
  } = useAsyncData(getPriceChanges, noPriceChanges);

  const [amount, setAmount] = useState(defaultAmount);
  const [editedField, setEditedField] = useState<EditedField>('from');
  const [fromCode, setFromCode] = useState(defaultFromCode);
  const [toCode, setToCode] = useState(defaultToCode);
  const [dismissedError, setDismissedError] = useState<LoadError | null>(null);

  const refreshRate = useCallback(() => {
    loadPriceChanges({
      purchasedCurrency: fromCode,
      paymentCurrency: toCode,
      fromDateTime: getPriceHistoryStart(new Date())
    });
  }, [loadPriceChanges, fromCode, toCode]);

  useEffect(() => {
    loadCurrencies();
  }, [loadCurrencies]);

  useEffect(() => {
    refreshRate();
  }, [refreshRate]);

  const refreshRateDebounced = useDebouncedCallback(refreshRate, amountDebounceDelay);

  const handleToastClose = useCallback(() => {
    setDismissedError(priceError);
  }, [priceError]);

  const changeAmount = (nextAmount: string, nextEditedField: EditedField) => {
    setAmount(nextAmount);
    setEditedField(nextEditedField);
    refreshRateDebounced();
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

  const latestPriceChange = getLatestPriceChange(priceHistory);
  const loadError = currenciesError ?? priceError;
  const isLoading = areCurrenciesLoading || isRateLoading;

  if (currencies.length === 0 || latestPriceChange === null) {
    return (
      <PageLayout>
        <ConverterCard size="small">
          {loadError !== null && !isLoading ? <ErrorScreen /> : <LoadingScreen />}
        </ConverterCard>
      </PageLayout>
    );
  }

  const fromCurrency = getCurrency(currencies, fromCode);
  const toCurrency = getCurrency(currencies, toCode);
  const isFromEdited = editedField === 'from';
  const fromAmount = isFromEdited ? amount : convertAmountBack(amount, latestPriceChange.price);
  const toAmount = isFromEdited ? convertAmount(amount, latestPriceChange.price) : amount;
  const isToastVisible = priceError !== null && priceError !== dismissedError;

  return (
    <PageLayout toast={isToastVisible ? <Toast message={priceError.message} onClose={handleToastClose} /> : null}>
      <ConverterCard>
        <div className={styles.top}>
          <div className={styles.panel}>
            <ConversionResult
              amount={fromAmount}
              fromCurrencyName={fromCurrency.name}
              convertedAmount={toAmount}
              toCurrencyName={toCurrency.name}
              updatedAt={latestPriceChange.dateTime}
            />

            <div className={styles.fields}>
              <CurrencyInput
                amountLabel="Сколько отдаёте"
                currencyLabel="Валюта, которую отдаёте"
                defaultAmount={fromAmount}
                currencyCode={fromCode}
                currencies={getAvailableCurrencies(currencies, toCode)}
                isAmountAllowed={isAmountInputValid}
                onAmountChange={handleFromAmountChange}
                onCurrencyChange={setFromCode}
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
                isAmountAllowed={isAmountInputValid}
                onAmountChange={handleToAmountChange}
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

        {/* Смена пары меняет key, React пересоздаёт MoreAbout, и его open/closed сбрасывается сам */}
        <MoreAbout key={`${fromCode}-${toCode}`} fromCurrency={fromCurrency} toCurrency={toCurrency} />
      </ConverterCard>
    </PageLayout>
  );
};
