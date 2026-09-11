import type { ReactNode } from 'react';

import styles from './PageLayout.module.scss';

type PageLayoutProps = {
  toast?: ReactNode;
  children: ReactNode;
};

export const PageLayout = ({ toast, children }: PageLayoutProps) => {
  return (
    <main className={styles.page}>
      <h1 className={styles['visually-hidden']}>Currency converter</h1>

      {toast}

      {children}
    </main>
  );
};
