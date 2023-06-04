import { FC } from 'react';

import buttonFormLayout from './button-form.module.css';

const ButtonForm: FC<{
  value?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  onClick?: () => void;
  children?: string
}> = ({ value = '', type = 'submit', disabled = false, onClick, children }) => {

  return (
    <button
      type={type}
      value={value}
      disabled={disabled}
      onClick={onClick}
      className={disabled ? buttonFormLayout.buttonDisabled : buttonFormLayout.button}
    >
      {children && <span>{children}</span>}
    </button>
  );
}

export default ButtonForm;
