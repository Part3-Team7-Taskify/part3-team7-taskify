import { ComponentPropsWithoutRef, FC } from 'react';

type ButtonSize = 'large' | 'small' | 'extraSmall';
type ButtonType = 'primary' | 'outline' | 'disabled' | 'gnb';
interface ConditionalButtonType<T extends ButtonSize> extends ComponentPropsWithoutRef<'button'> {
  size?: T;
  variant: T extends 'large' ? Exclude<ButtonType, 'outline'> : ButtonType;
}
type FinalButtonType =
  | ConditionalButtonType<'large'>
  | ConditionalButtonType<'small'>
  | ConditionalButtonType<'extraSmall'>;

const baseClasses = 'rounded-lg';
const sizeClasses = {
  large: 'py-3.5 w-[351px] border-none cursor-pointer lg:w-[520px]',
  small: 'px-7 py-2 cursor-pointer lg:px-5.5 md:px-6',
  extraSmall: 'px-2 md:px-3 py-1 md:py-2 cursor-pointer',
};
const variantClasses = {
  primary: 'bg-pri text-white border-none cursor-pointer',
  outline: 'bg-white border border-gray-200 text-pri cursor-pointer',
  disabled: 'disabled:bg-gray-300 disabled:text-white disabled:cursor-not-allowed',
  gnb: 'flex items-center gap-2 text-gray-600 bg-white border border-gray-200 rounded-xl',
};

export const Button: FC<FinalButtonType> = ({
  size = 'small',
  variant,
  children,
  onClick,
  disabled,
  className,
}) => {
  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabled && variantClasses['disabled']} ${className}`;

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
