import { Column } from '@/api/card/getColumns';
import { UserType } from '@/types/UserTypes';

export interface DropdownContextType {
  isOpen: boolean;
  selectedItem: Column | null;
  toggleDropdown: () => void;
  closeDropdown: () => void;
  setSelectedItem: (item: Column | null) => void;
}

export interface UserDropdownContextType {
  isOpen: boolean;
  selectedItem: UserType | null;
  toggleDropdown: () => void;
  closeDropdown: () => void;
  setSelectedItem: (item: UserType | null) => void;
}
