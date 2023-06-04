import { createSlice } from '@reduxjs/toolkit';

export type TNotifierState = {
  isAPI: boolean,
  isError: boolean,
  error: string,
};

export const initialNotifierState: TNotifierState = {
  isAPI: false,
  isError: false,
  error: '',
};

const notifierSlice = createSlice({
  name: 'notifier',
  initialState: initialNotifierState,
  reducers: {
    notifierReset(state) {
      Object.assign(state, initialNotifierState);
    },
    apiFlagUp(state) {
      state.isAPI = true;
    },
    apiFlagDown(state) {
      state.isAPI = false;
    },
    apiError(state, action) {
      state.isAPI = false;
      state.isError = true;
      state.error = action.payload;
    },
    sendErrorMsg(state, action) {
      state.isError = true;
      state.error = action.payload;
    },
  },
});

export const { notifierReset, apiFlagUp, apiFlagDown, apiError, sendErrorMsg } = notifierSlice.actions;

export default notifierSlice.reducer;
