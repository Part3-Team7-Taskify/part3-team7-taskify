import { FC } from 'react';

type ButtonType = {
  size: 'thick' | 'slim';
  align: 'center' | 'space-between';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export const ColumnButton: FC<ButtonType> = ({
  size,
  align,
  children,
  onClick,
  disabled,
  className,
}) => {
  const baseClasses =
    'w-[284px] md:w-[544px] sm:w-[354px] flex items-center bg-white text-black font-bold text-center border border-gray-200 rounded-lg cursor-pointer';
  const sizeClasses = {
    thick: 'h-16',
    slim: 'h-8',
  };
  const alignClasses = {
    center: 'flex justify-center gap-2',
    'space-between': 'flex justify-between gap-2 px-6',
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${alignClasses[align]} ${className || ''}`;

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
