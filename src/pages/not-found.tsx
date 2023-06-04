import { FC, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { sendErrorMsg } from '../store/notifierSlice';

const NotFoundPage: FC = () => {

  const dispatch = useDispatch();

  useEffect (() => {
    dispatch(sendErrorMsg('Ошибка 404: cтраница не существует'));
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  return <Navigate to="/" replace />

}

export default NotFoundPage;
