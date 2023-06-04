import { FC } from 'react';

import pageLayout from '../../pages/page.module.css';
import buttonPageLayout from './button-page.module.css';

const ButtonPage: FC<{
    disabled?: boolean;
    srcIcon?: string;
    onClick?: () => void;
    children?: string
  }> = ({ disabled = false, srcIcon, onClick, children }) => {

  return (
    <button
      type={'button'}
      disabled={disabled}
      onClick={onClick}
      className={disabled ? buttonPageLayout.buttonDisabled : buttonPageLayout.button}
    >
      <span className={`${pageLayout.h3Style} ${buttonPageLayout.buttonTitle}`}>
        {children !== undefined ? children : 'Показать еще'}
      </span>
      {<img
        src={srcIcon}
        alt="иконка"
        className={disabled ? buttonPageLayout.iconDisabled : buttonPageLayout.icon}
      />}
    </button>
  );
}

export default ButtonPage;
