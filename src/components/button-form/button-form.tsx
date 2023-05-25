import { FC } from 'react';

import buttonFormLayout from './button-form.module.css';

const ButtonForm: FC<{
  value?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  onClick?: () => void;
  children?: string
}> = ({ value, type, disabled, onClick, children }) => {

  let isDisabled = false;

  if (disabled !== undefined) isDisabled = disabled || isDisabled;

  return (
    <button
      type={type || 'submit'}
      value={value || ''}
      disabled={isDisabled}
      onClick={onClick}
      className={!disabled ? buttonFormLayout.button : buttonFormLayout.buttonDisabled}
    >
      {children !== undefined && <span>{children}</span>}
    </button>
  );
}

export default ButtonForm;
