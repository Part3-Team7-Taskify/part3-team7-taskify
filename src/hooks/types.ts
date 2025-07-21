export type FieldName = string;

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  email?: boolean;
  match?: FieldName;
}

export interface ValidationResult {
  valid: boolean | null;
  message?: string;
}

export interface FieldState {
  value: string;
  valid: boolean | null;
  message: string;
}

export type FormState<T extends FieldName> = Record<T, FieldState>;

export interface UseFormFieldResult<T extends FieldName> {
  value: Record<T, string>;
  valid: Record<T, boolean | null>;
  message: Record<T, string>;
  isSubmitEnable: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}
