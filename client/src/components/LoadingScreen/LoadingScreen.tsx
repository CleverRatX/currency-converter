import styles from './LoadingScreen.module.scss';

export const LoadingScreen = () => {
  return (
    <div className={styles.screen}>
      <p className={styles.text}>
        LOADING
        <span className={styles.slashes} aria-hidden="true">
          <span className={styles.slash}>/</span>
          <span className={styles.slash}>/</span>
          <span className={styles.slash}>/</span>
        </span>
      </p>
    </div>
  );
};
