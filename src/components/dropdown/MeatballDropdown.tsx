'use client';

import { useEffect, useRef, useState } from 'react';
import { DropdownContextType } from './DropdownTypes';
import { DropdownContext, useDropdownContext } from './DropdownContext';

const DropdownRoot = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const dropdownRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const openDropdown = () => setIsOpen(true);
  const closeDropdown = () => setIsOpen(false);
  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      closeDropdown();
    }
  };

  const contextValue: DropdownContextType = {
    isOpen,
    selectedItem,
    className,
    ref: dropdownRef,
    openDropdown,
    closeDropdown,
    setSelectedItem,
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <DropdownContext.Provider value={contextValue}>
      <div className='relative h-7'>{children}</div>
    </DropdownContext.Provider>
  );
};

const DropdownTrigger = ({ children }: { children: React.ReactNode }) => {
  const { openDropdown, ref } = useDropdownContext();

  return (
    <button className='cursor-pointer' onClick={openDropdown} ref={ref}>
      {children}
    </button>
  );
};

const DropdownContent = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, className } = useDropdownContext();

  return (
    <div
      className={`absolute bg-white border border-gray-200 text-black rounded shadow-lg transition-all duration-200 ease-out ${className} ${isOpen ? 'mt-2 visible opacity-100' : 'mt-0 invisible opacity-0'}`}
    >
      {children}
    </div>
  );
};

const DropdownItem = ({ children, onClick }: { children: string; onClick: () => void }) => {
  const { closeDropdown, setSelectedItem } = useDropdownContext();

  const handleClick = () => {
    if (!onClick) {
      setSelectedItem(children);
    } else {
      onClick();
    }
    closeDropdown();
  };

  return (
    <button
      onClick={handleClick}
      className='w-full px-4 py-2 flex hover:bg-violet-200 cursor-pointer'
    >
      {children}
    </button>
  );
};

const MeatballDropdown = {
  Root: DropdownRoot,
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Item: DropdownItem,
};

export default MeatballDropdown;
