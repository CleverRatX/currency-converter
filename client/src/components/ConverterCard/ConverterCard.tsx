import type { ReactNode } from 'react';

import styles from './ConverterCard.module.scss';

type ConverterCardProps = {
  children: ReactNode;
};

export const ConverterCard = ({ children }: ConverterCardProps) => {
  return <section className={styles.card}>{children}</section>;
};
