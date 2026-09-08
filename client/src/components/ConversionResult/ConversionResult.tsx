import styles from './ConversionResult.module.scss';

type ConversionResultProps = {
  amount: string;
  fromCurrencyName: string;
  convertedAmount: string;
  toCurrencyName: string;
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
  fromCurrencyName,
  convertedAmount,
  toCurrencyName,
  updatedAt
}: ConversionResultProps) => {
  return (
    <div className={styles.result}>
      <p className={styles.source}>{`${amount} ${fromCurrencyName} is`}</p>
      <p className={styles.converted}>{`${convertedAmount} ${toCurrencyName}`}</p>
      <p className={styles.updated}>{dateTimeFormatter.format(updatedAt)}</p>
    </div>
  );
};
