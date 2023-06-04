import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { profileReset } from '../../store/profileSlice';
import { deleteCookies } from '../../utils';

import buttonHeaderLayout from './button-header.module.css';

import exitIcon from '../../images/exit.svg';
import backIcon from '../../images/back.svg';

const ButtonHeader: FC<{ content: 'back' | 'exit' | 'none' }> = ({ content }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onBack = () => navigate(-1);

  const onExit = () => {
    dispatch(profileReset());
    deleteCookies();
    navigate('/');
  };

  let title: string = '';
  let src: string = '';
  let style: string = '';
  let action: any = null;

  switch (content) {
    case "back":
      title = 'Назад';
      src = backIcon;
      action = onBack;
      break;
    case "exit":
      title = 'Выход';
      src = exitIcon;
      action = onExit;
      break;
    default:
      style = `${buttonHeaderLayout.buttonBlank}`;
      break;
  }

  return (
    <button type="button" className={`${buttonHeaderLayout.button} ${style}`} onClick={action} >
      {src === '' ? null : <img src={src} alt="иконка" className={buttonHeaderLayout.icon} />}
      <span className={buttonHeaderLayout.buttonTitle}>
        {title}
      </span>
    </button>
  )
}

export default ButtonHeader;
