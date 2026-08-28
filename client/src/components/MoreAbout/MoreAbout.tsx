import type { Currency } from '../../types/currency';
import { CurrencyDescription } from '../CurrencyDescription/CurrencyDescription';
import styles from './MoreAbout.module.scss';

type MoreAboutProps = {
  fromCurrency: Currency;
  toCurrency: Currency;
};

export const MoreAbout = ({ fromCurrency, toCurrency }: MoreAboutProps) => {
  return (
    <section className={styles.about}>
      <div className={styles.header}>
        <button type="button" className={styles.toggle} aria-expanded="true">
          {`${fromCurrency.code}/${toCurrency.code}: about`}

          <svg className={styles.arrow} viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
            <path
              d="M8 14V3M3 8l5-5 5 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <span className={styles.line} aria-hidden="true" />
      </div>

      <div className={styles.descriptions}>
        <CurrencyDescription currency={fromCurrency} />
        <CurrencyDescription currency={toCurrency} />
      </div>
    </section>
  );
};
