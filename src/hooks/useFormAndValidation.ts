import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from "react";

export type TValues = {
  [name: string]: string;
}

export type TUseFormAndValidation = {
  values: TValues;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errors: TValues;
  isValid: boolean;
  resetForm: () => void;
  setValues: Dispatch<SetStateAction<TValues>>;
  setErrors: Dispatch<SetStateAction<TValues>>;
  setIsValid: Dispatch<SetStateAction<boolean>>;
}

export const useFormAndValidation = (inputValues: TValues = {}): TUseFormAndValidation => {
  const [ values, setValues ] = useState<TValues>(inputValues);
  const [ errors, setErrors ] = useState<TValues>({});
  const [ isValid, setIsValid ] = useState<boolean>(true);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const {name, value} = event.target;
    const ancestor = event.target.closest('form')
    setValues({...values, [name]: value });
    setErrors({...errors, [name]: event.target.validationMessage});
    (ancestor !== null) && setIsValid(ancestor.checkValidity());
  };

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid = false): void => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, handleChange, errors, isValid, resetForm, setValues, setErrors, setIsValid };
}

