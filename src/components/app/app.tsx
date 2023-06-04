import { FC, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchUsers } from '../../store/usersSlice';
import ProfilePage from '../../pages/profile';
import TeamPage from '../../pages/team';
import RegisterPage from '../../pages/register';
import NotFoundPage from '../../pages/not-found';
import LoginPage from '../../pages/login';
import Notifier from '../notifier/notifier';

const App: FC = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const getUsers = async () => {
      dispatch(fetchUsers())
    }
    getUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Routes >
        <Route index path="/" element={<Navigate to={'/login'} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/team/:id" element={<ProfilePage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>

      <Notifier />
    </>
  );
}

export default App;
