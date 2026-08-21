import { Button } from '../Button/Button';
import styles from './FilterActions.module.scss';

export const FilterActions = () => {
  return (
    <div className={styles.actions}>
      <Button kind="primary">+ SAVE FILTER</Button>

      <Button kind="danger">CLEAR FILTERS</Button>
    </div>
  );
};
