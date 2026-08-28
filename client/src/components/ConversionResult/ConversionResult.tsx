import styles from './ConversionResult.module.scss';

type ConversionResultProps = {
  amount: string;
  fromCurrencyTitle: string;
  convertedAmount: string;
  toCurrencyTitle: string;
  updatedAt: Date;
};

const dateTimeFormatter = new Intl.DateTimeFormat('en-GB', {
  weekday: 'short',
  day: '2-digit',
  month: 'short',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
  timeZone: 'UTC',
  timeZoneName: 'short'
});

export const ConversionResult = ({
  amount,
  fromCurrencyTitle,
  convertedAmount,
  toCurrencyTitle,
  updatedAt
}: ConversionResultProps) => {
  return (
    <div className={styles.result}>
      <p className={styles.source}>{`${amount} ${fromCurrencyTitle} is`}</p>
      <p className={styles.converted}>{`${convertedAmount} ${toCurrencyTitle}`}</p>
      <p className={styles.updated}>{dateTimeFormatter.format(updatedAt)}</p>
    </div>
  );
};
