import chartImage from './assets/chart.png';
import styles from './App.module.scss';
import { ConversionResult } from './components/ConversionResult/ConversionResult';
import { ConverterCard } from './components/ConverterCard/ConverterCard';
import { CurrencyInput } from './components/CurrencyInput/CurrencyInput';
import { FilterActions } from './components/FilterActions/FilterActions';
import { MoreAbout } from './components/MoreAbout/MoreAbout';
import { RateChart } from './components/RateChart/RateChart';
import { SavedFilters } from './components/SavedFilters/SavedFilters';
import { activeChartRange, activeFilter, chartRanges, conversion, savedFilters } from './data/constants';
import { currencies, getCurrency } from './data/currencies';

export const App = () => {
  const fromCurrency = getCurrency(conversion.fromCode);
  const toCurrency = getCurrency(conversion.toCode);

  return (
    <main className={styles.page}>
      <h1 className={styles['visually-hidden']}>Currency converter</h1>

      <ConverterCard>
        <div className={styles.top}>
          <div className={styles.panel}>
            <ConversionResult
              amount={conversion.amount}
              fromCurrencyTitle={fromCurrency.title}
              convertedAmount={conversion.convertedAmount}
              toCurrencyTitle={toCurrency.title}
              updatedAt={conversion.updatedAt}
            />

            <div className={styles.fields}>
              <CurrencyInput
                amountLabel="Сколько отдаёте"
                currencyLabel="Валюта, которую отдаёте"
                amount={conversion.amount}
                currencyCode={fromCurrency.code}
                currencies={currencies}
              />

              <CurrencyInput
                amountLabel="Сколько получаете"
                currencyLabel="Валюта, которую получаете"
                amount={conversion.convertedAmount}
                currencyCode={toCurrency.code}
                currencies={currencies}
              />
            </div>

            <FilterActions />

            <SavedFilters filters={savedFilters} activeFilter={activeFilter} />
          </div>

          <RateChart
            ranges={chartRanges}
            activeRange={activeChartRange}
            imageSrc={chartImage}
            imageAlt={`График курса ${fromCurrency.code}/${toCurrency.code}`}
          />
        </div>

        <MoreAbout fromCurrency={fromCurrency} toCurrency={toCurrency} />
      </ConverterCard>
    </main>
  );
};
