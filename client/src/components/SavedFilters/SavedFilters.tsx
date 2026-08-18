import { Chip } from '../Chip/Chip';
import styles from './SavedFilters.module.scss';

type SavedFiltersProps = {
  filters: string[];
  activeFilter?: string;
};

export const SavedFilters = ({ filters, activeFilter }: SavedFiltersProps) => {
  return (
    <ul className={styles.list}>
      {filters.map((filter) => (
        <li key={filter}>
          <Chip isActive={filter === activeFilter}>{filter}</Chip>
        </li>
      ))}
    </ul>
  );
};
