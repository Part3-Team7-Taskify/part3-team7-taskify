// import { useState, useCallback } from 'react';
// import {
//   FieldName,
//   ValidationRules,
//   ValidationResult,
//   FormState,
//   UseFormFieldResult,
// } from '@/hooks/types';

// const fieldNames: FieldName[] = ['password', 'passwordVerify', 'email', 'nickName'];

// const validationRules: { [key: string]: ValidationRules } = {
//   password: {
//     required: true,
//     minLength: 8,
//   },
//   passwordVerify: {
//     required: true,
//     match: 'password',
//   },
//   nickName: {
//     required: true,
//     minLength: 2,
//   },
//   email: {
//     required: true,
//     email: true,
//   },
// };

// const useFormField = <T extends FieldName>(initialFields: T[]): UseFormFieldResult<T> => {
//   const initialFieldStates = initialFields.reduce((acc, name) => {
//     acc[name] = { value: '', valid: null, message: '' };
//     return acc;
//   }, {} as FormState<T>);

//   const [fieldStates, setFieldStates] = useState<FormState<T>>(initialFieldStates);

//   const validateField = useCallback(
//     (name: T, value: string): ValidationResult => {
//       const rules = validationRules[name];
//       if (!rules) return { valid: null, message: '' };

//       if (rules.required && !value) {
//         return { valid: false, message: '필수 입력 항목입니다.' };
//       }
//       if (rules.minLength && value.length < (rules.minLength as number)) {
//         return { valid: false, message: `${rules.minLength}}자 이상이어야 합니다.` };
//       }

//       if (rules.match && value !== fieldStates[rules.match].value) {
//         return { valid: false, message: `${name}이(가) 일치하지 않습니다.` };
//       }

//       if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//         return { valid: false, message: '올바른 이메일 형식이 아닙니다.' };
//       }

//       return { valid: true, message: '' };
//     },
//     [fieldStates],
//   );

//   const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     const fieldName = name as T;

//     setFieldStates((prevFieldStates) => ({
//       ...prevFieldStates,
//       [fieldName]: { ...prevFieldStates[fieldName], value: value },
//     }));
//   }, []);

//   const values: Recort<T, string> = Object.fromEntries(
//     Object.entries(fieldStates).map(([key, value]) => [key, value.value]),
//   ) as Record<T, string>;

//   const valids: Record<T, boolean | null> = Object.fromEntries(
//     Object.entries(fieldStates).map(([key, value]) => [key, value.valid]),
//   ) as Record<T, boolean | null>;

//   const message: Record<T, string> = Object.fromEntries(
//     Object,
//     entries(fieldStates).map(([key, value]) => [key, value.message]),
//   ) as Record<T, string>;

//   const isSubmitEnable = Object.values(fieldStates).every(
//     (fieldState) => fieldState.valid === true,
//   );

//   const handleBlur = useCallback(
//     (e: React.FocusEvent<HTMLInputElement>) => {
//       const { id, value } = e.target;
//       const fieldName = id as T;
//       const validationResult = validateField(fieldName, value);

//       setFieldStates((prevFieldStates) => ({
//         ...prevFieldStates,
//         [fieldName]: {
//           ...prevFieldStates[fieldName],
//           valid: validationResult.valid,
//           message: validationResult.message,
//         },
//       }));
//     },
//     [validateField],
//   );

//   return {
//     value: validationRules,
//     valids: validationRules,
//     message: message,
//     isSubmitEnable,
//     handleChange,
//     handleBlur,
//   };
// };

// export default useFormField;
