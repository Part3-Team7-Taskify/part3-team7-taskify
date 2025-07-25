import { FC } from 'react';

type ButtonSize = 'large' | 'small' | 'extraSmall';
type ButtonType = 'primary' | 'outline' | 'disabled' | 'gnb';
type ConditionalButtonType<T extends ButtonSize> = {
  size?: T;
  type: T extends 'large' ? Exclude<ButtonType, 'outline'> : ButtonType;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};
type FinalButtonType =
  | ConditionalButtonType<'large'>
  | ConditionalButtonType<'small'>
  | ConditionalButtonType<'extraSmall'>;

const baseClasses = 'rounded-sm';
const sizeClasses = {
  large: 'py-3.5 w-[351px] border-none cursor-pointer lg:w-[520px]',
  small: 'px-7 py-2 cursor-pointer lg:px-5.5 md:px-6',
  extraSmall: 'px-2 md:px-3 py-1 md:py-2 cursor-pointer',
};
const typeClasses = {
  primary: 'bg-violet-500 text-white border-none cursor-pointer',
  outline: 'bg-white border border-gray-200 text-violet-500 cursor-pointer',
  disabled: 'bg-gray-300 text-white cursor-not-allowed',
  gnb: 'flex items-center gap-2 text-gray-600 bg-white border border-gray-200 rounded-xl',
};

export const Button: FC<FinalButtonType> = ({
  size = 'small',
  type,
  children,
  onClick,
  disabled,
  className,
}) => {
  const classes = `${baseClasses} ${sizeClasses[size]} ${typeClasses[type]} ${className || ''}`;

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
