import { Button } from '../Button/Button';
import styles from './FilterActions.module.scss';

export const FilterActions = () => {
  return (
    <div className={styles.actions}>
      <Button variant="primary">+ SAVE FILTER</Button>

      <Button variant="danger">CLEAR FILTERS</Button>
    </div>
  );
};
