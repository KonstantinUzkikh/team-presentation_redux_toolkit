/* eslint-disable react-hooks/rules-of-hooks */
import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { initUser, isLogined } from '../utils';
import { useFormAndValidation } from '../hooks/useFormAndValidation';
import ButtonForm from '../components/button-form/button-form';
import { useDispatch, useSelector } from '../stor/hooks-store';
import { getRegisterThunk } from '../stor/thunks';

import pageLayout from '../pages/page.module.css';
import formLayout from './form.module.css';

import eyeOff from '../images/Pictogrammers-Material-Light-Eye-off.svg';
import eyeOn from '../images/Pictogrammers-Material-Light-Eye.svg';
import { TUser } from '../services/types-data';

const RegisterPage: FC = () => {

  const location = useLocation();
  const from = location.state?.from.pathname || '/team';

  if (isLogined()) return <Navigate to={from} />

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const refPassword = useRef<HTMLInputElement>(null);
  const refErrorPassword = useRef<any>(null);
  const refRePassword = useRef<HTMLInputElement>(null);
  const refErrorRePassword = useRef<any>(null);

  const { values, handleChange, errors, isValid, setErrors, setIsValid } =
    useFormAndValidation({ name: '', email: '', password: '', rePassword: '' });

  useEffect(() => {
    setIsValid(false);
    setErrors({ name: '', email: '', password: '', rePassword: '' })
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { users } = useSelector(state => state.users);

  const onSubmit = (evt: FormEvent) => {
    let user: TUser = initUser;
    user = users.find(it => it.email === values.email) || user;
    evt.preventDefault();
    dispatch(getRegisterThunk(values, user, () => navigate('/team')));
  }

  const [visibilityPassword, setVisibilityPassword] = useState(false);
  const [visibilityRePassword, setVisibilityRePassword] = useState(false);

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {

    event.target.setCustomValidity('');
    refRePassword.current?.setCustomValidity('');
    if (refErrorPassword.current !== null) refErrorPassword.current.textContent = '';
    if (refErrorRePassword.current !== null) refErrorRePassword.current.textContent = '';
    if (event.target.value !== values.rePassword && event.target.checkValidity()) {
      event.target.setCustomValidity('Пароли не совпадают.');
      if (refErrorRePassword.current !== null) refErrorRePassword.current.textContent = 'Пароли не совпадают.';
    }
    handleChange(event);
  }

  const handleChangeRePassword = (event: ChangeEvent<HTMLInputElement>): void => {

    event.target.setCustomValidity('');
    refPassword.current?.setCustomValidity('');
    if (refErrorRePassword.current !== null) refErrorRePassword.current.textContent = '';
    if (refErrorPassword.current !== null) refErrorPassword.current.textContent = '';
    if (values.password !== event.target.value && event.target.checkValidity()) {
      event.target.setCustomValidity('Пароли не совпадают.');
      if (refErrorPassword.current !== null) refErrorPassword.current.textContent = 'Пароли не совпадают.';
    }
    handleChange(event);
  }

  useEffect(() => { }, [errors])

  return (
    <div className={formLayout.formPage}>
      <header className={`${pageLayout.headerStyle} ${formLayout.headerStyle}`}>
        <div className={formLayout.headerContentStyle}>
          <span className={pageLayout.textStyle}>
            Для регистрации необходимо использовать моковые данные адресов электронной почты,
            предоставленных сервером. Например:&nbsp;
          </span>
          <h2 className={`${formLayout.email} ${pageLayout.h2Style}`}>
            eve.holt@reqres.in
          </h2>
        </div>
      </header>
      <div className={formLayout.formBox}>
        <form onSubmit={onSubmit} className={formLayout.form}>
          <h3 className={pageLayout.h3Style}>Регистрация</h3>
          <div className={formLayout.inputBox}>
            <label htmlFor='name' className={pageLayout.textStyle}>Имя</label>
            <input
              name='name'
              id='name'
              value={values.name}
              onChange={handleChange}
              autoFocus
              className={formLayout.inputStyle}
            />
            <span className={formLayout.errorStyle} id='nameError'></span>
          </div>
          <div className={formLayout.inputBox}>
            <label htmlFor='email' className={pageLayout.textStyle}>Электронная почта</label>
            <input
              type='email'
              name='email'
              id='email'
              value={values.email}
              onChange={handleChange}
              required
              className={formLayout.inputStyle}
            />
            <span className={formLayout.errorStyle}>{errors.email}</span>
          </div>
          <div className={formLayout.inputBox}>
            <label htmlFor='password' className={pageLayout.textStyle}>Пароль</label>
            <div className={formLayout.inputGroup}>
              <input
                ref={refPassword}
                type={visibilityPassword ? "text" : "password"}
                name='password'
                id='password'
                value={values.password}
                title='Введите пароль длинной от 6 - до 10 символов.'
                onChange={handleChangePassword}
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
            <span ref={refErrorPassword} className={formLayout.errorStyle}>{(!isValid && `${errors.password}`) || ''}</span>
          </div>
          <div className={formLayout.inputBox}>
            <label htmlFor='rePassword' className={pageLayout.textStyle}>Подтвердите пароль</label>
            <div className={formLayout.inputGroup}>
              <input
                ref={refRePassword}
                type={visibilityRePassword ? "text" : "password"}
                name='rePassword'
                id='rePassword'
                value={values.rePassword}
                title='Введите пароль длинной от 6 - до 10 символов.'
                onChange={handleChangeRePassword}
                minLength={6}
                maxLength={12}
                required
                className={formLayout.inputStyle}
              />
              {visibilityRePassword
                ? <img src={eyeOn} onClick={() => setVisibilityRePassword(!visibilityRePassword)}
                  alt="пароль виден" className={formLayout.icon} />
                : <img src={eyeOff} onClick={() => setVisibilityRePassword(!visibilityRePassword)}
                  alt="пароль скрыт" className={formLayout.icon} />
              }
            </div>
            <span ref={refErrorRePassword} className={formLayout.errorStyle}>{(!isValid && `${errors.rePassword}`) || ''}</span>
          </div>
          <ButtonForm disabled={!isValid}>Зарегистрироваться</ButtonForm>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
