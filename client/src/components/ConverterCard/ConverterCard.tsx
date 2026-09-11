import type { ReactNode } from 'react';

import styles from './ConverterCard.module.scss';

type ConverterCardSize = 'large' | 'small';

type ConverterCardProps = {
  children: ReactNode;
  size?: ConverterCardSize;
};

export const ConverterCard = ({ children, size = 'large' }: ConverterCardProps) => {
  return <section className={`${styles.card} ${styles[size]}`}>{children}</section>;
};
