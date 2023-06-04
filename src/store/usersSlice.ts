import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { apiFlagUp, apiFlagDown, apiError } from './notifierSlice';
import { getUsers } from '../services/get-data';
import { TUser } from '../services/types-data';
import { createErrMsg } from '../utils';

export const fetchUsers: any = createAsyncThunk(
  'profile/fetchUsers',
  async function (_, { dispatch }) {
    dispatch(apiFlagUp());
    try {
      const response: TUser[] = await getUsers();
      dispatch(apiFlagDown());
      dispatch(getUsersSuccess(response));
    } catch (err) {
      dispatch(apiError(createErrMsg(err)));
    }
  }
);

export type TUsersState = {
  isLoadUsers: boolean;
  currentPage: number;
  users: TUser[];
};

export const initialUsersState: TUsersState = {
  isLoadUsers: false,
  currentPage: 0,
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState: initialUsersState,
  reducers: {
    usersReset(state) {
      Object.assign(state, initialUsersState);
    },
    getUsersSuccess(state, action) {
      state.isLoadUsers = true;
      state.currentPage = 1;
      state.users = action.payload;
    },
    toggleLike(state, action) {
      let switchLike: boolean = false;
      let usersUpgraded = state.users.map((item: TUser) => {
        if (item.id === action.payload) {
          switchLike = !item.like;
          return { ...item, like: switchLike }
        }
        return item;
      }
      );
      state.users = usersUpgraded;
    },
    increasePage(state) {
      state.currentPage++;
    },
    decreasePage(state) {
      state.currentPage--;
    },
  },
});

export const { usersReset, getUsersSuccess, toggleLike, increasePage, decreasePage } = usersSlice.actions;

export default usersSlice.reducer;
