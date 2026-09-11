import styles from './ErrorScreen.module.scss';

const errorMessage = 'COULD NOT GET DATA FROM THE SERVER';

export const ErrorScreen = () => {
  return (
    <div className={styles.screen}>
      <p className={styles.message}>{errorMessage}</p>
    </div>
  );
};
