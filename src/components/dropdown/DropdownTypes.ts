import { UserType } from '@/types/UserTypes';
import { RefObject } from 'react';

export interface IDropdownRef {
  ref: RefObject<HTMLButtonElement | null> | null;
}

export interface DropdownContextType extends IDropdownRef {
  isOpen: boolean;
  selectedItem: string | null;
  className?: string;
  openDropdown: () => void;
  closeDropdown: () => void;
  setSelectedItem: (item: string | null) => void;
}

export interface UserDropdownContextType extends IDropdownRef {
  isOpen: boolean;
  selectedItem: UserType | null;
  openDropdown: () => void;
  closeDropdown: () => void;
  setSelectedItem: (item: UserType | null) => void;
}
