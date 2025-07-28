import { UserType } from '@/types/UserTypes';

export interface DropdownContextType {
  isOpen: boolean;
  selectedItem: string | null;
  toggleDropdown: () => void;
  closeDropdown: () => void;
  setSelectedItem: (item: string | null) => void;
}

export interface UserDropdownContextType {
  isOpen: boolean;
  selectedItem: UserType | null;
  toggleDropdown: () => void;
  closeDropdown: () => void;
  setSelectedItem: (item: UserType | null) => void;
}
