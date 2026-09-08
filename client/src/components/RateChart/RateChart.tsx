import { Button } from '../Button/Button';
import styles from './RateChart.module.scss';

type RateChartProps = {
  ranges: string[];
  activeRange: string;
  imageSrc: string;
  imageAlt: string;
};

export const RateChart = ({ ranges, activeRange, imageSrc, imageAlt }: RateChartProps) => {
  return (
    <div className={styles.chart}>
      <ul className={styles.ranges}>
        {ranges.map((range) => {
          const isActive = range === activeRange;

          return (
            <li key={range}>
              <Button size="small" kind={isActive ? 'accent' : 'muted'} aria-pressed={isActive}>
                {range}
              </Button>
            </li>
          );
        })}
      </ul>

      <img className={styles.image} src={imageSrc} alt={imageAlt} />
    </div>
  );
};
