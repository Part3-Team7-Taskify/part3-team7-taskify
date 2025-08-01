'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import ChevronDown from '../../../public/icon/arrow_drop_down_FILL0_wght300_GRAD0_opsz24 2.svg';
import { ColumnChip } from '../chip/ColumnChip';
import { DropdownColumnContextType } from './DropdownTypes';
import { DropdownContext, useDropdownContext } from './DropdownContext';
import { Column } from '@/api/card/getColumns';

const DropdownRoot = ({
  children,
  valueCallback,
}: {
  children: ReactNode;
  valueCallback: (item: Column | null) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Column | null>(null);
  const dropdownRef = useRef<HTMLButtonElement>(null);

  const openDropdown = () => setIsOpen(true);
  const closeDropdown = () => setIsOpen(false);

  useEffect(() => {
    document.addEventListener('click', closeDropdown);

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  const contextValue: DropdownColumnContextType = {
    isOpen,
    selectedItem,
    ref: dropdownRef,
    openDropdown,
    closeDropdown,
    setSelectedItem,
  };

  useEffect(() => {
    valueCallback(selectedItem);
  }, [selectedItem, valueCallback]);

  return (
    <DropdownContext.Provider value={contextValue}>
      <div className='relative'>{children}</div>
    </DropdownContext.Provider>
  );
};

const DropdownTrigger = ({ children }: { children: ReactNode }) => {
  const { isOpen, openDropdown, selectedItem, ref } = useDropdownContext();

  return (
    <button
      ref={ref}
      onClick={openDropdown}
      className='w-100 flex items-center justify-between px-4 py-2 bg-white border border-gray-300 text-black-200 rounded'
    >
      {selectedItem ? <ColumnChip>{selectedItem.title}</ColumnChip> : children}
      <ChevronDown className={`transition-transform ${isOpen && 'rotate-180'}`} />
    </button>
  );
};

const DropdownContent = ({ children }: { children: ReactNode }) => {
  const { isOpen } = useDropdownContext();

  const beforeRenderedClasses = 'mt-0 invisible opacity-0';
  const afterRenderedClasses = 'mt-2 visible opacity-100';

  return (
    <div
      className={`absolute left-0 w-full bg-white border border-gray-300 text-black-200 rounded transition-all duration-200 ease-out ${
        isOpen ? afterRenderedClasses : beforeRenderedClasses
      }`}
    >
      {children}
    </div>
  );
};

const DropdownItem = ({ item }: { item: Column }) => {
  const { closeDropdown, setSelectedItem } = useDropdownContext();

  const handleClick = () => {
    setSelectedItem(item);
    closeDropdown();
  };

  return (
    <button onClick={handleClick} className='w-full px-4 py-2 flex hover:bg-violet-200'>
      <ColumnChip>{item.title}</ColumnChip>
    </button>
  );
};

const ColumnDropdown = {
  Root: DropdownRoot,
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Item: DropdownItem,
};

export default ColumnDropdown;
