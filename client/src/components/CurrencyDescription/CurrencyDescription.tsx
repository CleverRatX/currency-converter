import type { Currency } from '../../types/currency';
import styles from './CurrencyDescription.module.scss';

type CurrencyDescriptionProps = {
  currency: Currency;
};

export const CurrencyDescription = ({ currency }: CurrencyDescriptionProps) => {
  return (
    <article className={styles.description}>
      <h2 className={styles.title}>{`${currency.title} - ${currency.code} - ${currency.symbol}`}</h2>
      <p className={styles.text}>{currency.description}</p>
    </article>
  );
};
