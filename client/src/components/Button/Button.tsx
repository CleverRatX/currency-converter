import type { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './Button.module.scss';

type ButtonKind = 'primary' | 'danger' | 'accent' | 'muted' | 'outlined';

type ButtonSize = 'large' | 'medium' | 'small';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  kind?: ButtonKind;
  size?: ButtonSize;
};

export const Button = ({ children, kind = 'primary', size = 'large', className, ...buttonProps }: ButtonProps) => {
  const buttonClassName = [styles.button, styles[size], styles[kind], className].filter(Boolean).join(' ');

  return (
    <button type="button" className={buttonClassName} {...buttonProps}>
      {children}
    </button>
  );
};
