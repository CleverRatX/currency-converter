import type { Currency } from '../../types/currency';
import styles from './CurrencyDescription.module.scss';

type CurrencyDescriptionProps = {
  currency: Currency;
};

const DESCRIPTION_FALLBACK = 'There is no description for this currency yet.';

export const CurrencyDescription = ({ currency }: CurrencyDescriptionProps) => {
  return (
    <article className={styles.description}>
      <h2 className={styles.title}>{`${currency.name} - ${currency.code} - ${currency.symbol}`}</h2>
      <p className={styles.text}>{currency.description || DESCRIPTION_FALLBACK}</p>
    </article>
  );
};
