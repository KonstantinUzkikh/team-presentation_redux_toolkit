import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { apiErrors, endPoints, writePassword, writeToken } from '../utils';
import { createErrMsg } from '../utils';
import { getProfile } from '../services/get-data';
import { TValues } from '../hooks/useFormAndValidation';
import { TLoginResponse, TRegisterResponse, TUser } from '../services/types-data';

import { apiError, apiFlagDown, apiFlagUp } from './notifierSlice';

export type TFetchProfile = {
  userData: TValues;
  user: TUser;
  goPath: () => void
};

export type TProfileState = {
  isLoadProfile: boolean;
  email: string;
  password: string;
  nick_name: string;
  first_name: string;
  last_name: string;
  avatar: string;
  like: boolean;
  id: number;
};

export const initialProfileState: TProfileState = {
  isLoadProfile: false,
  email: '',
  password: '',
  nick_name: '',
  first_name: '',
  last_name: '',
  avatar: '',
  like: false,
  id: 0
};

export const fetchLogin: any = createAsyncThunk(
  'profile/fetchLogin',
  async function (props: TFetchProfile, { dispatch }) {
    dispatch(apiFlagUp());
    const { userData, user, goPath } = props;
    try {
      const response: TLoginResponse = await getProfile(endPoints.login, userData);
      writeToken(response.token);
      writePassword(props.userData.password);
      dispatch(apiFlagDown());
      dispatch(getProfileSuccess({ userData, user }));
      goPath();
    } catch (err) {
      dispatch(apiError(createErrMsg(err, apiErrors)));
    }
  }
);

export const fetchRegister: any = createAsyncThunk(
  'profile/fetchRegister',
  async function (props: TFetchProfile, { dispatch }) {
    dispatch(apiFlagUp());
    const { userData, user, goPath } = props;
    try {
      const response: TRegisterResponse = await getProfile(endPoints.register, userData);
      Object.assign(user.id, response.id);
      writeToken(response.token);
      writePassword(userData.password);
      dispatch(apiFlagDown());
      dispatch(getProfileSuccess({ userData, user }));
      goPath();
    } catch (err) {
      console.log(err)
      dispatch(apiError(createErrMsg(err, apiErrors)));
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: initialProfileState,
  reducers: {
    profileReset(state) {
      Object.assign(state, initialProfileState);
    },
    getProfileSuccess(state, action) {
      state.isLoadProfile = true;
      state.email = action.payload.userData.email;
      state.password = action.payload.userData.password;
      state.nick_name = action.payload.userData?.name || '';
      state.first_name = action.payload.user.first_name;
      state.last_name = action.payload.user.last_name;
      state.avatar = action.payload.user.avatar;
      state.like = action.payload.user.like;
      state.id = action.payload.user.id;
    },
  },
});

export const { profileReset, getProfileSuccess } = profileSlice.actions;

export default profileSlice.reducer;
