'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import ChevronDown from '../../../public/icon/arrow_drop_down_FILL0_wght300_GRAD0_opsz24 2.svg';
import { UserDropdownContextType } from './DropdownTypes';
import { UserDropdownContext, useUserDropdownContext } from './DropdownContext';
import { UserChip } from '../chip/UserChip';
import { UserType } from '@/types/UserTypes';

const DropdownRoot = ({
  children,
  valueCallback,
}: {
  children: ReactNode;
  valueCallback: (item: UserType | null) => void;
}) => {
  const dropdownRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<UserType | null>(null);

  const openDropdown = () => setIsOpen(true);
  const closeDropdown = () => setIsOpen(false);

  const contextValue: UserDropdownContextType = {
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
    <UserDropdownContext.Provider value={contextValue}>
      <div className='relative'>{children}</div>
    </UserDropdownContext.Provider>
  );
};

const DropdownTrigger = ({ children }: { children: ReactNode }) => {
  const { isOpen, openDropdown, selectedItem, ref } = useUserDropdownContext();

  return (
    <button
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        openDropdown();
      }}
      className='w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 text-black rounded-lg'
    >
      {selectedItem ? <UserChip user={selectedItem} size='small' hideName={false} /> : children}
      <ChevronDown className={`transition-transform ${isOpen && 'rotate-180'}`} />
    </button>
  );
};

const DropdownContent = ({ children }: { children: ReactNode }) => {
  const { isOpen } = useUserDropdownContext();

  const beforeRenderedClasses = 'mt-0 invisible opacity-0';
  const afterRenderedClasses = 'mt-2 visible opacity-100';

  return (
    <div
      className={`absolute left-0 w-full z-[1] bg-white border border-gray-300 text-black rounded-lg transition-all duration-200 ease-out ${isOpen ? afterRenderedClasses : beforeRenderedClasses}`}
    >
      {children}
    </div>
  );
};

const DropdownItem = ({ children }: { children: UserType }) => {
  const { closeDropdown, setSelectedItem } = useUserDropdownContext();

  const handleClick = () => {
    setSelectedItem(children);
    closeDropdown();
  };

  return (
    <button onClick={handleClick} className='w-full px-4 py-2 flex hover:bg-violet-200'>
      <UserChip user={children} size='small' hideName={false} />
    </button>
  );
};

const UserDropdown = {
  Root: DropdownRoot,
  Trigger: DropdownTrigger,
  Content: DropdownContent,
  Item: DropdownItem,
};

export default UserDropdown;
