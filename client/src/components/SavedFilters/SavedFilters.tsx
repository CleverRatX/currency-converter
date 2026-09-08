import { Button } from '../Button/Button';
import styles from './SavedFilters.module.scss';

type SavedFiltersProps = {
  filters: string[];
  activeFilter?: string;
};

export const SavedFilters = ({ filters, activeFilter }: SavedFiltersProps) => {
  return (
    <ul className={styles.list}>
      {filters.map((filter) => {
        const isActive = filter === activeFilter;

        return (
          <li key={filter}>
            <Button size="small" kind={isActive ? 'accent' : 'muted'} aria-pressed={isActive}>
              {filter}
            </Button>
          </li>
        );
      })}
    </ul>
  );
};
