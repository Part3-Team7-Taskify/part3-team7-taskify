import { FC } from 'react';

type ButtonSize = 'large' | 'small';
type ButtonType = 'primary' | 'outline' | 'disabled';
type ConditionalButtonType<T extends ButtonSize> = {
  size?: T;
  type: T extends 'large' ? Exclude<ButtonType, 'outline'> : ButtonType;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};
type FinalButtonType = ConditionalButtonType<'large'> | ConditionalButtonType<'small'>;

export const Button: FC<FinalButtonType> = ({
  size = 'small',
  type,
  children,
  onClick,
  disabled,
  className,
}) => {
  const baseClasses = 'rounded-sm';
  const sizeClasses = {
    large: 'py-3.5 w-[351px] border-none cursor-pointer lg:w-[520px]',
    small: 'px-7 py-2 cursor-pointer lg:px-5.5 md:px-6',
  };
  const typeClasses = {
    primary: 'bg-violet-500 text-white  cursor-pointer',
    outline: 'bg-white border border-gray-200 text-violet-500 cursor-pointer',
    disabled: 'bg-gray-300 text-white cursor-not-allowed',
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${typeClasses[type]} ${className || ''}`;

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
