import { API_FLAG_UP, API_FLAG_DOWN, API_ERROR, ERROR, RESET_NOTIFIER, type TNotifierActions } from '../actions';

export type TNotifierState = {
  isAPI: boolean;
  isError: boolean;
  error: string | Event | undefined;
};

export const initialNotifierState: TNotifierState = {
  isAPI: false,
  isError: false,
  error: '',
};

export const notifierReducer = (state = initialNotifierState, action: TNotifierActions): TNotifierState => {
  switch (action.type) {
    case RESET_NOTIFIER: {
      return initialNotifierState;
    }
    case API_FLAG_UP: {
      return {
        ...state,
        isAPI: true,
      };
    }
    case API_FLAG_DOWN: {
      return {
        ...state,
        isAPI: false,
      };
    }
    case API_ERROR: {
      return {
        ...state,
        isAPI: false,
        isError: true,
        error: action.error
      };
    }
    case ERROR:
      return {
        ...state,
        isError: true,
        error: action.error
      };
    default: {
      return state;
    }
  }
};
