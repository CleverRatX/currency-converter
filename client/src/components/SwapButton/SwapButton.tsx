import { Button } from '../Button/Button';

type SwapButtonProps = {
  onClick: () => void;
};

export const SwapButton = ({ onClick }: SwapButtonProps) => {
  return (
    <Button kind="outlined" size="medium" onClick={onClick}>
      Swap
    </Button>
  );
};
