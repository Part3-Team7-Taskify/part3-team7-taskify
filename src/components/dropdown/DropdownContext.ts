import { createContext, useContext } from 'react';
import { DropdownContextType, IDropdownRef, UserDropdownContextType } from './DropdownTypes';

const DropdownContextDefaultValues: DropdownContextType & IDropdownRef = {
  isOpen: false,
  selectedItem: null,
  ref: null,
  openDropdown: () => {},
  closeDropdown: () => {},
  setSelectedItem: () => {},
};

const UserDropdownContextDefaultValues: UserDropdownContextType & IDropdownRef = {
  isOpen: false,
  selectedItem: null,
  ref: null,
  openDropdown: () => {},
  closeDropdown: () => {},
  setSelectedItem: () => {},
};

export const DropdownContext = createContext(DropdownContextDefaultValues);
export const UserDropdownContext = createContext(UserDropdownContextDefaultValues);

export const useDropdownContext = (): DropdownContextType => {
  const context = useContext(DropdownContext);
  if (context === undefined) {
    console.error('Dropdown Context는 Dropdown.Root안에서 사용해주세요!');
  }
  return context;
};

export const useUserDropdownContext = (): UserDropdownContextType => {
  const context = useContext(UserDropdownContext);
  if (context === undefined) {
    console.error('Dropdown Context는 Dropdown.Root안에서 사용해주세요!');
  }
  return context;
};
