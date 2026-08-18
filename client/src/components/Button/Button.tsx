import type { ReactNode } from 'react';

import styles from './Button.module.scss';

type ButtonProps = {
  children: ReactNode;
  variant?: 'primary' | 'danger';
};

export const Button = ({ children, variant = 'primary' }: ButtonProps) => {
  return (
    <button type="button" className={styles[variant]}>
      {children}
    </button>
  );
};
