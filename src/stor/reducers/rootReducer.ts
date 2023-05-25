import { combineReducers } from 'redux';

import { usersReducer, profileReducer, notifierReducer } from './';

export const rootReducer = combineReducers({
  users: usersReducer,
  profile: profileReducer,
  notifier: notifierReducer
})
