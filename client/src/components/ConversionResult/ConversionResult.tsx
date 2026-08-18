import type { Currency } from '../../types/currency';
import styles from './ConversionResult.module.scss';

type ConversionResultProps = {
  amount: string;
  fromCurrency: Currency;
  convertedAmount: string;
  toCurrency: Currency;
  updatedAt: string;
};

export const ConversionResult = ({
  amount,
  fromCurrency,
  convertedAmount,
  toCurrency,
  updatedAt
}: ConversionResultProps) => {
  return (
    <div className={styles.result}>
      <p className={styles.source}>{`${amount} ${fromCurrency.title} is`}</p>
      <p className={styles.converted}>{`${convertedAmount} ${toCurrency.title}`}</p>
      <p className={styles.updated}>{updatedAt}</p>
    </div>
  );
};
