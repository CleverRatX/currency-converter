import { Chip } from '../Chip/Chip';
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
        {ranges.map((range) => (
          <li key={range}>
            <Chip isActive={range === activeRange}>{range}</Chip>
          </li>
        ))}
      </ul>

      <img className={styles.image} src={imageSrc} alt={imageAlt} />
    </div>
  );
};
