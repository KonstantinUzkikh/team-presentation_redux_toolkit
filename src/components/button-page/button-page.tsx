import { FC } from 'react';

import pageLayout from '../../pages/page.module.css';
import buttonPageLayout from './button-page.module.css';

const ButtonPage: FC<{
    disabled?: boolean;
    srcIcon?: string;
    onClick?: () => void;
    children?: string
  }> = ({ disabled, srcIcon, onClick, children }) => {

  let isDisabled = false;

  if (disabled !== undefined) isDisabled = disabled || isDisabled;

  return (
    <button
      type={'button'}
      disabled={isDisabled}
      onClick={onClick}
      className={!isDisabled ? buttonPageLayout.button : buttonPageLayout.buttonDisabled}
    >
      <span className={`${pageLayout.h3Style} ${buttonPageLayout.buttonTitle}`}>
        {children !== undefined ? children : 'Показать еще'}
      </span>
      {<img
        src={srcIcon}
        alt="иконка"
        className={!isDisabled ? buttonPageLayout.icon : isDisabled && buttonPageLayout.iconDisabled}
      />}
    </button>
  );
}

export default ButtonPage;
