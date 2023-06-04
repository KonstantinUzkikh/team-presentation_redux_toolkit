import { configureStore } from '@reduxjs/toolkit';

import notifierReducer from './notifierSlice';
import usersReducer from './usersSlice';
import profileReducer from './profileSlice';

export default configureStore({
  reducer: {
    notifier: notifierReducer,
    profile: profileReducer,
    users: usersReducer,
  },
});
