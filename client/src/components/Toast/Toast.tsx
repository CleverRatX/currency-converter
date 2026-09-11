import { useEffect } from 'react';

import { toastDuration } from '../../data/constants';
import styles from './Toast.module.scss';

type ToastProps = {
  message: string;
  onClose: () => void;
};

export const Toast = ({ message, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, toastDuration);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <p className={styles.toast} role="alert">
      {message}
    </p>
  );
};
