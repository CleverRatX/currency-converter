import type { ReactNode } from 'react';

import styles from './Button.module.scss';

type ButtonProps = {
  children: ReactNode;
  kind?: 'primary' | 'danger';
};

export const Button = ({ children, kind = 'primary' }: ButtonProps) => {
  return (
    <button type="button" className={styles[kind]}>
      {children}
    </button>
  );
};
