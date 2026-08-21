import type { ReactNode } from 'react';

import styles from './Chip.module.scss';

type ChipProps = {
  children: ReactNode;
  isActive?: boolean;
};

export const Chip = ({ children, isActive = false }: ChipProps) => {
  return (
    <button type="button" className={isActive ? styles.active : styles.inactive} aria-pressed={isActive}>
      {children}
    </button>
  );
};
