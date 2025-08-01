import { createContext, useContext } from 'react';
import { DropdownColumnContextType, UserDropdownContextType } from './DropdownTypes';

const DropdownContextDefaultValues: DropdownColumnContextType = {
  isOpen: false,
  selectedItem: null,
  ref: null,
  openDropdown: () => {},
  closeDropdown: () => {},
  setSelectedItem: () => {},
};

const UserDropdownContextDefaultValues: UserDropdownContextType = {
  isOpen: false,
  selectedItem: null,
  ref: null,
  openDropdown: () => {},
  closeDropdown: () => {},
  setSelectedItem: () => {},
};

export const DropdownContext = createContext(DropdownContextDefaultValues);
export const UserDropdownContext = createContext(UserDropdownContextDefaultValues);

export const useDropdownContext = (): DropdownColumnContextType => {
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
