import { FC, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from '../stor/hooks-store';
import { error } from '../stor/actions';

const NotFoundPage: FC = () => {

  const dispatch = useDispatch();

  useEffect (() => {
    dispatch(error('Ошибка 404: cтраница не существует'));
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  return <Navigate to="/" replace />

}

export default NotFoundPage;
