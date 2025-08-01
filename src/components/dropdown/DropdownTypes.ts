import { Column } from '@/api/card/getColumns';
import { UserType } from '@/types/UserTypes';
import { RefObject } from 'react';

interface IDropdown {
  isOpen: boolean;
  className?: string;
  ref: RefObject<HTMLButtonElement | null> | null;
  openDropdown: () => void;
  closeDropdown: () => void;
}

export interface DropdownColumnContextType extends IDropdown {
  selectedItem: Column | null;
  setSelectedItem: (item: Column | null) => void;
}

export interface DropdownContextType extends IDropdown {
  selectedItem: string;
  setSelectedItem: (item: string | null) => void;
}

export interface UserDropdownContextType extends IDropdown {
  selectedItem: UserType | null;
  setSelectedItem: (item: UserType | null) => void;
}
