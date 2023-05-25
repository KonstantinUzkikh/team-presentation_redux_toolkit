/* eslint-disable react-hooks/rules-of-hooks */
import { FC, FormEvent, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { initUser, isLogined } from '../utils';
import ButtonForm from '../components/button-form/button-form';
import { useDispatch, useSelector } from '../stor/hooks-store';
import { getLoginThunk } from '../stor/thunks';

import pageLayout from '../pages/page.module.css';
import formLayout from './form.module.css';
import { useFormAndValidation } from '../hooks/useFormAndValidation';

import eyeOff from '../images/Pictogrammers-Material-Light-Eye-off.svg';
import eyeOn from '../images/Pictogrammers-Material-Light-Eye.svg';
import { TUser } from '../services/types-data';

const LoginPage: FC = () => {

  const location = useLocation();
  const from = location.state?.from.pathname || '/team';

  if (isLogined()) return <Navigate to={from} />

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, handleChange, errors, isValid, setIsValid }
    = useFormAndValidation({ email: '', password: '' });

  useEffect(() => setIsValid(false), []); // eslint-disable-line react-hooks/exhaustive-deps

  const { users } = useSelector(state => state.users);

  const onSubmit = (evt: FormEvent) => {
    let user: TUser = initUser;
    user = users.find(it => it.email === values.email) || user;
    evt.preventDefault();
    dispatch(getLoginThunk(values, user, () => navigate('/team')));
  }

  const [visibilityPassword, setVisibilityPassword] = useState(false);

  return (
    <div className={formLayout.formPage}>
      <header className={`${pageLayout.headerStyle} ${formLayout.headerStyle}`}>
        <div className={formLayout.headerContentStyle}>
          <span className={pageLayout.textStyle}>
            Для входа в личный кабинет необходимо использовать моковые данные адресов электронной почты,
            предоставленных сервером. Например:&nbsp;
          </span>
          <h2 className={`${formLayout.email} ${pageLayout.h2Style}`}>
            eve.holt@reqres.in
          </h2>
        </div>
      </header>
      <div className={formLayout.formBox}>
        <form onSubmit={onSubmit} className={formLayout.form}>
          <h3 className={pageLayout.h3Style}>Вход в личный кабинет</h3>
          <div className={formLayout.inputBox}>
            <label htmlFor='email' className={pageLayout.textStyle}>Электронная почта</label>
            <input
              type='email'
              name='email'
              id='email'
              value={values.email}
              onChange={handleChange}
              autoFocus
              required
              className={formLayout.inputStyle}
            />
            <span className={formLayout.errorStyle}>{errors.email}</span>
          </div>
          <div className={formLayout.inputBox}>
            <label htmlFor='password' className={pageLayout.textStyle}>Пароль</label>
            <div className={formLayout.inputGroup}>
              <input
                type={visibilityPassword ? "text" : "password"}
                name='password'
                id='password'
                value={values.password}
                title='Введите пароль длинной от 6 - до 10 символов.'
                onChange={handleChange}
                minLength={6}
                maxLength={12}
                required
                className={`${formLayout.inputStyle} ${formLayout.inputPassStyle}`}
              />
              {visibilityPassword
                ? <img src={eyeOn} onClick={() => setVisibilityPassword(!visibilityPassword)}
                  alt="пароль виден" className={formLayout.icon} />
                : <img src={eyeOff} onClick={() => setVisibilityPassword(!visibilityPassword)}
                  alt="пароль скрыт" className={formLayout.icon} />
              }
            </div>
            <span className={formLayout.errorStyle}>{errors.password}</span>
          </div>
          <ButtonForm disabled={!isValid}>Войти</ButtonForm>
          <div className={formLayout.buttonGroup}>
            <span className={pageLayout.textStyle}>Вы — новый пользователь?</span>
            <ButtonForm onClick={() => navigate('/register')}>Зарегистрироваться</ButtonForm>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
