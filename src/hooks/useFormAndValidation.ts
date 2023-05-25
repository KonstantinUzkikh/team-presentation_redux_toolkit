import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from "react";

export type TInputValues = {
  [name: string]: string;
}

export type TUseFormAndValidation = {
  values: TInputValues;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errors: TInputValues;
  isValid: boolean;
  resetForm: () => void;
  setValues: Dispatch<SetStateAction<TInputValues>>;
  setErrors: Dispatch<SetStateAction<TInputValues>>;
  setIsValid: Dispatch<SetStateAction<boolean>>;
}

export const useFormAndValidation = (inputValues: TInputValues = {}): TUseFormAndValidation => {
  const [ values, setValues ] = useState<TInputValues>(inputValues);
  const [ errors, setErrors ] = useState({});
  const [ isValid, setIsValid ] = useState(true);

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

