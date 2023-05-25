import { FC, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
//import React from 'react';

import { useDispatch } from '../../stor/hooks-store';
import { getUsersThunk } from '../../stor/thunks';
import ProfilePage from '../../pages/profile';
import TeamPage from '../../pages/team';
import RegisterPage from '../../pages/register';
import NotFoundPage from '../../pages/not-found';
import LoginPage from '../../pages/login';
import Notifier from '../notifier/notifier';

const App: FC = () => {

  const dispatch = useDispatch();

  useEffect(() => dispatch(getUsersThunk()), []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Routes >
        <Route index path="/" element={<LoginPage />} />
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
