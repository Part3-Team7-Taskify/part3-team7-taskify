import { createContext, useContext } from 'react';
import {
  DropdownColumnContextType,
  DropdownContextType,
  UserDropdownContextType,
} from './DropdownTypes';

const DropdownContextDefaultValues: DropdownContextType = {
  isOpen: false,
  selectedItem: null,
  ref: null,
  openDropdown: () => {},
  closeDropdown: () => {},
  setSelectedItem: () => {},
};

const DropdownColumnContextDefaultValues: DropdownColumnContextType = {
  isOpen: false,
  selectedItem: null,
  ref: null,
  hydrateValue: undefined,
  openDropdown: () => {},
  closeDropdown: () => {},
  setSelectedItem: () => {},
};

const UserDropdownContextDefaultValues: UserDropdownContextType = {
  isOpen: false,
  selectedItem: null,
  ref: null,
  hydrateValue: undefined,
  openDropdown: () => {},
  closeDropdown: () => {},
  setSelectedItem: () => {},
};

export const DropdownContext = createContext(DropdownContextDefaultValues);
export const ColumnDropdownContext = createContext(DropdownColumnContextDefaultValues);
export const UserDropdownContext = createContext(UserDropdownContextDefaultValues);

export const useDropdownContext = () => {
  const context = useContext(DropdownContext);
  if (context === undefined) {
    console.error('Dropdown Context는 Dropdown.Root안에서 사용해주세요!');
  }
  return context;
};

export const useColumnDropdownContext = () => {
  const context = useContext(ColumnDropdownContext);
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
