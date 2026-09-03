import styles from './SwapButton.module.scss';

type SwapButtonProps = {
  onClick: () => void;
};

export const SwapButton = ({ onClick }: SwapButtonProps) => {
  return (
    <button type="button" className={styles.swap} onClick={onClick}>
      Swap
    </button>
  );
};
